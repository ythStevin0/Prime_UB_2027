/**
 * User Repository
 *
 * Abstracts database access for the User entity.
 */

import { eq } from 'drizzle-orm';
import { db } from '@backend/lib/db';
import { users } from '@backend/lib/db/schema';
import type { User, UserWithPassword } from '../domain/entities';

type CreateUserDTO = Omit<UserWithPassword, 'id' | 'createdAt' | 'updatedAt' | 'emailVerifiedAt'>;
type UpdateUserDTO = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'email' | 'role' | 'passwordHash'>>;

export const userRepository = {
  /**
   * Find a user by their email address.
   */
  async findByEmail(email: string): Promise<UserWithPassword | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result[0] || null;
  },

  /**
   * Find a user by their ID.
   */
  async findById(id: string): Promise<User | null> {
    const result = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        phone: users.phone,
        institution: users.institution,
        image: users.image,
        emailVerifiedAt: users.emailVerifiedAt,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0] || null;
  },

  /**
   * Create a new user in the database.
   */
  async create(data: CreateUserDTO): Promise<User> {
    const result = await db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
        role: data.role,
        phone: data.phone,
        institution: data.institution,
        image: data.image,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        phone: users.phone,
        institution: users.institution,
        image: users.image,
        emailVerifiedAt: users.emailVerifiedAt,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });

    return result[0];
  },

  /**
   * Update an existing user's profile.
   */
  async update(id: string, data: UpdateUserDTO): Promise<User> {
    const result = await db
      .update(users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        phone: users.phone,
        institution: users.institution,
        image: users.image,
        emailVerifiedAt: users.emailVerifiedAt,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });

    return result[0];
  },
};
