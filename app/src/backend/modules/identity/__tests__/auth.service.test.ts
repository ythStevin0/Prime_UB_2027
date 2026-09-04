/**
 * Auth Service Unit Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../services/auth.service';
import { userRepository } from '../repository/user.repository';
import { passwordService } from '../services/password.service';
import { AppError } from '@backend/lib/errors';
import { mockUser } from '@backend/__tests__/helpers';

// Mock dependencies
vi.mock('../repository/user.repository');
vi.mock('../services/password.service');

describe('Auth Service', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('register()', () => {
    const input = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      phone: '08123456789',
      institution: 'UB',
    };

    it('creates a user when email is unique', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(null);
      vi.mocked(passwordService.hash).mockResolvedValue('hashed_password');
      
      const mockCreatedUser = mockUser({ email: input.email });
      vi.mocked(userRepository.create).mockResolvedValue(mockCreatedUser);

      const result = await authService.register(input);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
      expect(passwordService.hash).toHaveBeenCalledWith(input.password);
      expect(userRepository.create).toHaveBeenCalledWith({
        name: input.name,
        email: input.email,
        passwordHash: 'hashed_password',
        role: 'USER',
        phone: input.phone,
        institution: input.institution,
        image: null,
      });
      expect(result).toEqual(mockCreatedUser);
    });

    it('throws AppError.conflict if email already exists', async () => {
      const existingUser = mockUser({ email: input.email, passwordHash: 'old_hash' });
      vi.mocked(userRepository.findByEmail).mockResolvedValue(existingUser);

      await expect(authService.register(input)).rejects.toThrow(AppError);
      
      try {
        await authService.register(input);
      } catch (error) {
        expect((error as AppError).code).toBe('CONFLICT');
      }

      expect(passwordService.hash).not.toHaveBeenCalled();
      expect(userRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('getProfile()', () => {
    it('returns user if found', async () => {
      const user = mockUser();
      vi.mocked(userRepository.findById).mockResolvedValue(user);

      const result = await authService.getProfile(user.id);
      expect(result).toEqual(user);
    });

    it('throws AppError.notFound if user does not exist', async () => {
      vi.mocked(userRepository.findById).mockResolvedValue(null);

      await expect(authService.getProfile('invalid_id')).rejects.toThrow(AppError);
    });
  });
});
