/**
 * Request Logger Middleware for Hono
 *
 * Responsibilities:
 * 1. Generate a unique Request ID (crypto.randomUUID) per request
 * 2. Store request ID in Hono context (accessible via c.get('requestId'))
 * 3. Set X-Request-Id response header
 * 4. Log incoming request: → GET /api/health
 * 5. Log completed request: ← 200 GET /api/health (12ms)
 */

import type { MiddlewareHandler } from 'hono';
import { logger } from '../lib/logger';

/**
 * Variable key for storing request ID in Hono context.
 * Access in route handlers via: c.get('requestId')
 */
export const REQUEST_ID_KEY = 'requestId';

export const requestLogger = (): MiddlewareHandler => {
  return async (c, next) => {
    const requestId = crypto.randomUUID();
    const start = Date.now();

    // Store request ID in Hono context for downstream use
    c.set(REQUEST_ID_KEY, requestId);

    // Create a child logger scoped to this request
    const reqLogger = logger.child({ requestId });

    // Store scoped logger in context for route handlers
    c.set('logger', reqLogger);

    const method = c.req.method;
    const path = c.req.path;

    // Log incoming request
    reqLogger.info(`→ ${method} ${path}`);

    // Set response header
    c.header('X-Request-Id', requestId);

    await next();

    // Log completed request with duration
    const duration = Date.now() - start;
    const status = c.res.status;

    const logContext = { status, duration: `${duration}ms` };

    if (status >= 500) {
      reqLogger.error(`← ${status} ${method} ${path} (${duration}ms)`, logContext);
    } else if (status >= 400) {
      reqLogger.warn(`← ${status} ${method} ${path} (${duration}ms)`, logContext);
    } else {
      reqLogger.info(`← ${status} ${method} ${path} (${duration}ms)`, logContext);
    }
  };
};
