/**
 * Identity Domain Entities
 *
 * Defines the core types and structures for the Identity module,
 * completely independent of the database schema or HTTP framework.
 */

export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string | null;
  institution: string | null;
  image: string | null;
  emailVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithPassword extends User {
  passwordHash: string | null;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expiresAt: Date;
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
}
