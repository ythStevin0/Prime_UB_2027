/**
 * Identity Zod Schemas
 *
 * Validation schemas for Identity module inputs.
 */

import { z } from 'zod';
import { emailSchema, passwordSchema, nonEmptyString, phoneSchema } from '@backend/lib/validation';

export const registerSchema = z.object({
  name: nonEmptyString('Nama', 100),
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema,
  institution: nonEmptyString('Asal Institusi/Sekolah', 255).optional().or(z.literal('')),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password tidak boleh kosong'),
});

export const updateProfileSchema = z.object({
  name: nonEmptyString('Nama', 100).optional(),
  phone: phoneSchema,
  institution: nonEmptyString('Asal Institusi/Sekolah', 255).optional().or(z.literal('')),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
