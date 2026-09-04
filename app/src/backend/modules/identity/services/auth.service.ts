/**
 * Auth Service
 *
 * Orchestrates the business logic for identity operations:
 * Registration, Login, and Profile management.
 */

import { AppError } from '@backend/lib/errors';
import { userRepository } from '../repository/user.repository';
import { passwordService } from './password.service';
import type { RegisterInput, UpdateProfileInput } from '../schemas/identity.schemas';
import type { User } from '../domain/entities';

export const authService = {
  /**
   * Register a new user.
   * Checks for duplicate email, hashes password, and creates record.
   */
  async register(input: RegisterInput): Promise<User> {
    // 1. Check if email already exists
    const existingUser = await userRepository.findByEmail(input.email);
    if (existingUser) {
      throw AppError.conflict('Email sudah terdaftar', { email: input.email });
    }

    // 2. Hash password
    const passwordHash = await passwordService.hash(input.password);

    // 3. Create user
    const newUser = await userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
      role: 'USER', // Default role is always USER
      phone: input.phone || null,
      institution: input.institution || null,
      image: null,
    });

    return newUser;
  },

  /**
   * Get a user's profile by ID.
   */
  async getProfile(userId: string): Promise<User> {
    const user = await userRepository.findById(userId);
    
    if (!user) {
      throw AppError.notFound('User tidak ditemukan');
    }
    
    return user;
  },

  /**
   * Update a user's profile.
   */
  async updateProfile(userId: string, input: UpdateProfileInput): Promise<User> {
    // Ensure user exists
    await this.getProfile(userId);
    
    // Update fields
    const updatedUser = await userRepository.update(userId, {
      name: input.name,
      phone: input.phone,
      institution: input.institution,
    });
    
    return updatedUser;
  },
};
