import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { userRepository } from './src/backend/modules/identity/repository/user.repository';
import { passwordService } from './src/backend/modules/identity/services/password.service';

async function testLogin() {
  const email = 'admin@prime.com';
  const password = 'password';

  console.log('Testing login for:', email);
  
  const user = await userRepository.findByEmail(email);
  if (!user) {
    console.log('User not found in DB!');
    process.exit(1);
  }
  
  console.log('User found:', user.id, user.name, user.role);
  
  const isValid = await passwordService.verify(password, user.passwordHash as string);
  console.log('Password valid?', isValid);
  process.exit(0);
}

testLogin();
