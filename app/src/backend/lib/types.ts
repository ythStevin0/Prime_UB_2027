/**
 * Shared Hono type definitions for PRIME UB 2027 Backend
 *
 * AppEnv defines the context variables available in all Hono handlers.
 * Import this in route files and middleware to get type-safe access to
 * requestId, logger, and other shared context.
 */

import type { Logger } from './logger';

/** Hono environment type with custom context variables */
export type AppEnv = {
  Variables: {
    /** Unique ID generated per request for tracing */
    requestId: string;
    /** Request-scoped logger (child of global logger with requestId) */
    logger: Logger;
  };
};
