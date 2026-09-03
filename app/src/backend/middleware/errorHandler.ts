/**
 * Global Error Handler Middleware for Hono
 *
 * Responsibilities:
 * 1. Catch all unhandled errors from route handlers
 * 2. If error is AppError → return structured JSON with correct status code
 * 3. If error is unknown → return generic 500, log full details server-side
 * 4. NEVER expose stack traces, DB details, or secrets to the client
 *
 * Per AGENTS.md Section 13 (Error Handling):
 * - Errors must be predictable, observable, safe, user-appropriate
 * - Never expose stack traces, database details, secrets, internal topology
 */

import type { ErrorHandler } from 'hono';
import { AppError } from '../lib/errors';
import { logger } from '../lib/logger';

export const errorHandler: ErrorHandler = (err, c) => {
  const requestId = c.get('requestId') as string | undefined;
  const reqLogger = requestId ? logger.child({ requestId }) : logger;

  // ─── Known operational errors (AppError) ────────────────
  if (err instanceof AppError) {
    // Log operational errors at warn level (expected, but worth tracking)
    reqLogger.warn(`AppError: ${err.message}`, {
      code: err.code,
      statusCode: err.statusCode,
      ...(err.details && { details: err.details }),
    });

    return c.json(err.toJSON(), err.statusCode as 400);
  }

  // ─── Unknown/unexpected errors ──────────────────────────
  // These are programming errors — log everything server-side
  reqLogger.error('Unhandled error', {
    error: err.message,
    name: err.name,
    stack: err.stack,
  });

  // Return a safe generic response to the client
  const safeResponse = {
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Terjadi kesalahan pada server',
      statusCode: 500,
    },
  };

  return c.json(safeResponse, 500);
};
