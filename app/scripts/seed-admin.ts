import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { db } from '../src/backend/lib/db';
import { users } from '../src/backend/lib/db/schema';
import { passwordService } from '../src/backend/modules/identity/services/password.service';
import crypto from 'crypto';

async function seedAdmin() {
  console.log('Seeding admin user...');
  const email = 'admin@prime.com';
  const password = 'password';
  
  const hashedPassword = await passwordService.hash(password);
  
  try {
    await db.insert(users).values({
      id: crypto.randomUUID(),
      name: 'Super Admin',
      email: email,
      passwordHash: hashedPassword,
      role: 'ADMIN',
    });
    console.log(`Admin created successfully!`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && err.code === '23505') { // Postgres unique_violation
      console.log('Admin already exists.');
    } else {
      console.error('Error seeding admin:', err);
    }
  }
  process.exit(0);
}

seedAdmin();
