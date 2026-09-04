/**
 * Password Service
 *
 * Handles hashing and verification of passwords using bcryptjs.
 */

import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export const passwordService = {
  /**
   * Hash a plain text password.
   */
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(password, salt);
  },

  /**
   * Verify a plain text password against a hash.
   */
  async verify(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  },
};
