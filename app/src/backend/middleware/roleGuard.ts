/**
 * Role-Based Access Control (RBAC) Guard Middleware for Hono
 *
 * Verifies that the authenticated user has the required role.
 * MUST be used AFTER requireAuth middleware.
 * Throws 403 Forbidden if not authorized.
 */

import { createMiddleware } from 'hono/factory';
import { AppError } from '@backend/lib/errors';
import type { AppEnv } from '@backend/lib/types';
import type { UserRole } from '@backend/modules/identity/domain/entities';

export const requireRole = (allowedRoles: UserRole[]) => {
  return createMiddleware<AppEnv>(async (c, next) => {
    const session = c.get('session');
    
    // Safety check: ensure requireAuth was called first
    if (!session || !session.user) {
      throw AppError.internal('requireRole must be used after requireAuth');
    }
    
    const userRole = session.user.role as UserRole;
    
    if (!allowedRoles.includes(userRole)) {
      const reqLogger = c.get('logger');
      reqLogger.warn(`Forbidden access attempt. User role: ${userRole}, Required roles: ${allowedRoles.join(', ')}`);
      
      throw AppError.forbidden();
    }
    
    await next();
  });
};

/** Shortcut for Admin-only routes */
export const requireAdmin = requireRole(['ADMIN']);
