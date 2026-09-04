/**
 * Identity Domain Rules
 *
 * Defines business logic and authorization invariants.
 */

import type { UserRole, User } from './entities';

/**
 * Check if a role has admin privileges.
 */
export function canAccessAdmin(role: UserRole): boolean {
  return role === 'ADMIN';
}

/**
 * Check if the user is verified.
 * Verification logic could be based on email verification or other factors.
 */
export function isVerifiedUser(user: User): boolean {
  return user.emailVerifiedAt !== null;
}
