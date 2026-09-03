/**
 * Smoke Tests — Phase 0 Foundation
 *
 * Verifies that validation helpers, response builders,
 * and error classes work correctly.
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { validate, emailSchema, paginationSchema } from '@backend/lib/validation';
import { ApiResponse, calcPagination } from '@backend/lib/response';
import { AppError } from '@backend/lib/errors';

// ─── Validation Helpers ───────────────────────────────────

describe('validate()', () => {
  const testSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
  });

  it('returns parsed data for valid input', () => {
    const result = validate(testSchema, {
      name: 'John',
      email: 'john@example.com',
    });

    expect(result).toEqual({
      name: 'John',
      email: 'john@example.com',
    });
  });

  it('throws AppError.validationError for invalid input', () => {
    expect(() => validate(testSchema, { name: '', email: 'invalid' })).toThrow(
      AppError,
    );

    try {
      validate(testSchema, { name: '', email: 'invalid' });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      const appError = error as AppError;
      expect(appError.statusCode).toBe(422);
      expect(appError.code).toBe('VALIDATION_ERROR');
      expect(appError.details?.fields).toBeDefined();
      expect(Array.isArray(appError.details?.fields)).toBe(true);
    }
  });
});

describe('emailSchema', () => {
  it('accepts valid emails and lowercases them', () => {
    const result = emailSchema.parse('Test@Example.COM');
    expect(result).toBe('test@example.com');
  });

  it('rejects invalid emails', () => {
    expect(() => emailSchema.parse('not-an-email')).toThrow();
  });
});

describe('paginationSchema', () => {
  it('applies defaults when no input given', () => {
    const result = paginationSchema.parse({});
    expect(result).toEqual({ page: 1, limit: 20 });
  });

  it('coerces string numbers (from query params)', () => {
    const result = paginationSchema.parse({ page: '3', limit: '50' });
    expect(result).toEqual({ page: 3, limit: 50 });
  });

  it('clamps limit to max 100', () => {
    expect(() => paginationSchema.parse({ limit: 999 })).toThrow();
  });
});

// ─── Response Helpers ─────────────────────────────────────

describe('ApiResponse.success()', () => {
  it('wraps data in success envelope', () => {
    const result = ApiResponse.success({ user: { id: '123' } });

    expect(result).toEqual({
      success: true,
      data: { user: { id: '123' } },
    });
  });
});

describe('ApiResponse.paginated()', () => {
  it('includes pagination meta', () => {
    const result = ApiResponse.paginated(['item1', 'item2'], {
      page: 2,
      limit: 10,
      total: 25,
    });

    expect(result.success).toBe(true);
    expect(result.meta?.pagination).toEqual({
      page: 2,
      limit: 10,
      total: 25,
      totalPages: 3,
    });
  });

  it('calculates totalPages correctly for exact division', () => {
    const result = ApiResponse.paginated([], {
      page: 1,
      limit: 10,
      total: 30,
    });

    expect(result.meta?.pagination?.totalPages).toBe(3);
  });

  it('calculates totalPages correctly for zero total', () => {
    const result = ApiResponse.paginated([], {
      page: 1,
      limit: 10,
      total: 0,
    });

    expect(result.meta?.pagination?.totalPages).toBe(0);
  });
});

describe('calcPagination()', () => {
  it('calculates offset from page and limit', () => {
    expect(calcPagination({ page: 1, limit: 20 })).toEqual({
      offset: 0,
      limit: 20,
    });
    expect(calcPagination({ page: 3, limit: 10 })).toEqual({
      offset: 20,
      limit: 10,
    });
  });
});

// ─── AppError ─────────────────────────────────────────────

describe('AppError', () => {
  it('creates error with correct properties', () => {
    const error = AppError.notFound('Kompetisi tidak ditemukan');

    expect(error).toBeInstanceOf(AppError);
    expect(error).toBeInstanceOf(Error);
    expect(error.statusCode).toBe(404);
    expect(error.code).toBe('NOT_FOUND');
    expect(error.message).toBe('Kompetisi tidak ditemukan');
    expect(error.isOperational).toBe(true);
  });

  it('toJSON() returns safe response without stack trace', () => {
    const error = AppError.internal('Server error');
    const json = error.toJSON();

    expect(json).toEqual({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Server error',
        statusCode: 500,
      },
    });
    expect(json).not.toHaveProperty('stack');
    expect(json).not.toHaveProperty('details');
  });

  it('factory methods create correct status codes', () => {
    expect(AppError.badRequest().statusCode).toBe(400);
    expect(AppError.validationError().statusCode).toBe(422);
    expect(AppError.unauthorized().statusCode).toBe(401);
    expect(AppError.forbidden().statusCode).toBe(403);
    expect(AppError.notFound().statusCode).toBe(404);
    expect(AppError.conflict().statusCode).toBe(409);
    expect(AppError.rateLimited().statusCode).toBe(429);
    expect(AppError.internal().statusCode).toBe(500);
    expect(AppError.database().statusCode).toBe(500);
    expect(AppError.externalService().statusCode).toBe(502);
  });
});
