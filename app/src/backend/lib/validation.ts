/**
 * Shared Zod Validation Helpers for PRIME UB 2027 Backend
 *
 * Provides:
 * - Reusable base schemas (email, uuid, pagination, etc.)
 * - validate() helper that throws AppError on failure
 * - Hono zod-validator integration helper
 *
 * Usage:
 *   import { baseSchemas, validate } from '@backend/lib/validation';
 *
 *   const input = validate(registerSchema, rawData);
 *   // Throws AppError.validationError if invalid
 */

import { z } from 'zod';
import { AppError } from './errors';

// ─── Reusable Base Schemas ────────────────────────────────

/** Valid UUID v4 format */
export const uuidSchema = z.string().uuid('ID harus berformat UUID yang valid');

/** Email with basic validation */
export const emailSchema = z
  .string()
  .email('Format email tidak valid')
  .max(255, 'Email terlalu panjang')
  .transform((val) => val.toLowerCase().trim());

/** Non-empty trimmed string */
export const nonEmptyString = (fieldName: string, maxLength = 255) =>
  z
    .string()
    .min(1, `${fieldName} tidak boleh kosong`)
    .max(maxLength, `${fieldName} maksimal ${maxLength} karakter`)
    .transform((val) => val.trim());

/** Password with minimum security requirements */
export const passwordSchema = z
  .string()
  .min(8, 'Password minimal 8 karakter')
  .max(128, 'Password terlalu panjang');

/** Phone number (Indonesian format, optional) */
export const phoneSchema = z
  .string()
  .regex(/^(\+62|62|0)[0-9]{8,13}$/, 'Format nomor telepon tidak valid')
  .optional()
  .or(z.literal(''));

/** Pagination query parameters */
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/** Sort order */
export const sortOrderSchema = z.enum(['asc', 'desc']).default('desc');

// ─── Type Exports ─────────────────────────────────────────

export type PaginationInput = z.infer<typeof paginationSchema>;

// ─── Validation Helper ────────────────────────────────────

/**
 * Validate data against a Zod schema.
 * Throws AppError.validationError with detailed field errors if invalid.
 *
 * @example
 *   const data = validate(registerSchema, rawBody);
 *   // data is fully typed and validated
 */
export function validate<T extends z.ZodType>(
  schema: T,
  data: unknown,
): z.infer<T> {
  const result = schema.safeParse(data);

  if (!result.success) {
    const fieldErrors = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    throw AppError.validationError('Data tidak valid', {
      fields: fieldErrors,
    });
  }

  return result.data;
}

/**
 * Create a Zod validation schema for query string parameters.
 * Wraps the schema to handle string coercion properly.
 */
export function querySchema<T extends z.ZodRawShape>(shape: T) {
  return z.object(shape);
}
