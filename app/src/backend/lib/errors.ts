/**
 * Structured Error Classes for PRIME UB 2027 Backend
 *
 * AppError provides:
 * - HTTP status code mapping
 * - Stable error codes (for client-side handling)
 * - User-safe messages (never expose internals)
 * - Optional details (logged server-side only)
 *
 * Usage:
 *   throw AppError.badRequest('Email tidak valid');
 *   throw AppError.notFound('Kompetisi tidak ditemukan');
 *   throw AppError.validationError('Data tidak lengkap', { fields: ['name', 'email'] });
 */

/** Stable error codes for client-side handling */
export type ErrorCode =
  | 'BAD_REQUEST'
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR'
  | 'DB_ERROR'
  | 'EXTERNAL_SERVICE_ERROR';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly details?: Record<string, unknown>;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    code: ErrorCode,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    // Operational errors are expected (bad input, not found, etc.)
    // vs programming errors (null reference, type errors, etc.)
    this.isOperational = true;

    // Maintains proper stack trace in V8
    Error.captureStackTrace(this, this.constructor);
  }

  // ─── Factory Methods ───────────────────────────────────────

  /** 400 — Client sent invalid data */
  static badRequest(message = 'Permintaan tidak valid', details?: Record<string, unknown>): AppError {
    return new AppError(message, 400, 'BAD_REQUEST', details);
  }

  /** 422 — Validation failed (more specific than 400) */
  static validationError(message = 'Data tidak valid', details?: Record<string, unknown>): AppError {
    return new AppError(message, 422, 'VALIDATION_ERROR', details);
  }

  /** 401 — Not authenticated */
  static unauthorized(message = 'Silakan login terlebih dahulu'): AppError {
    return new AppError(message, 401, 'UNAUTHORIZED');
  }

  /** 403 — Authenticated but not allowed */
  static forbidden(message = 'Anda tidak memiliki akses untuk melakukan ini'): AppError {
    return new AppError(message, 403, 'FORBIDDEN');
  }

  /** 404 — Resource not found */
  static notFound(message = 'Data tidak ditemukan'): AppError {
    return new AppError(message, 404, 'NOT_FOUND');
  }

  /** 409 — Conflict (duplicate email, already registered, etc.) */
  static conflict(message = 'Data sudah ada', details?: Record<string, unknown>): AppError {
    return new AppError(message, 409, 'CONFLICT', details);
  }

  /** 429 — Too many requests */
  static rateLimited(message = 'Terlalu banyak permintaan, coba lagi nanti'): AppError {
    return new AppError(message, 429, 'RATE_LIMITED');
  }

  /** 500 — Internal server error (generic, safe message for user) */
  static internal(message = 'Terjadi kesalahan pada server', details?: Record<string, unknown>): AppError {
    return new AppError(message, 500, 'INTERNAL_ERROR', details);
  }

  /** 500 — Database-specific error (safe message for user, details logged) */
  static database(message = 'Terjadi kesalahan pada database', details?: Record<string, unknown>): AppError {
    return new AppError(message, 500, 'DB_ERROR', details);
  }

  /** 502 — External service error (payment gateway, email, etc.) */
  static externalService(
    message = 'Layanan eksternal sedang bermasalah',
    details?: Record<string, unknown>,
  ): AppError {
    return new AppError(message, 502, 'EXTERNAL_SERVICE_ERROR', details);
  }

  /** Convert to a safe JSON response (never includes stack trace or internal details) */
  toJSON(): Record<string, unknown> {
    return {
      success: false,
      error: {
        code: this.code,
        message: this.message,
        statusCode: this.statusCode,
      },
    };
  }
}
