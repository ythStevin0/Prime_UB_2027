/**
 * Authentication Guard Middleware for Hono
 *
 * Verifies that the request contains a valid Auth.js session.
 * Injects the authenticated user into the Hono context.
 * Throws 401 Unauthorized if not authenticated.
 */

import { createMiddleware } from 'hono/factory';
import { auth } from '@backend/lib/auth';
import { AppError } from '@backend/lib/errors';
import type { AppEnv } from '@backend/lib/types';



export const requireAuth = createMiddleware<AppEnv>(async (c, next) => {
  const reqLogger = c.get('logger');
  
  // Get session from NextAuth (works for both Edge and Node runtimes)
  // Since Hono routes are mounted inside Next.js API router, NextAuth can read the cookies
  // Note: auth() might need req/res in some contexts, but usually reads from headers in Next.js App Router
  // However, auth() is typically called server-side. In a route handler context, it's safer to just call it.
  
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      reqLogger.warn('Unauthorized access attempt');
      throw AppError.unauthorized();
    }
    
    // Inject session into context
    c.set('session', session);
    
    await next();
  } catch (error) {
    if (error instanceof AppError) throw error;
    
    reqLogger.error('Error during authentication check', { error });
    throw AppError.unauthorized();
  }
});
