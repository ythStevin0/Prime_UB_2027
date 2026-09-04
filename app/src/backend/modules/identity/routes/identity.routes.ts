/**
 * Identity API Routes
 *
 * Exposes identity operations via Hono router.
 */

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { AppError } from '@backend/lib/errors';
import { ApiResponse } from '@backend/lib/response';
import { authService } from '../services/auth.service';
import { registerSchema, updateProfileSchema } from '../schemas/identity.schemas';
import { requireAuth } from '@backend/middleware/authGuard';
import type { AppEnv } from '@backend/lib/types';

const identityRoutes = new Hono<AppEnv>();

/**
 * POST /api/auth/register
 * Register a new user.
 */
identityRoutes.post(
  '/register',
  zValidator('json', registerSchema, (result) => {
    if (!result.success) {
      // Pass Zod validation errors to our AppError handler
      const fieldErrors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      throw AppError.validationError('Data registrasi tidak valid', { fields: fieldErrors });
    }
  }),
  async (c) => {
    const input = c.req.valid('json');
    const reqLogger = c.get('logger');
    
    reqLogger.info('Registration attempt', { email: input.email });
    
    const newUser = await authService.register(input);
    
    reqLogger.info('Registration successful', { userId: newUser.id, email: newUser.email });
    
    // Do not return password hash
    return c.json(
      ApiResponse.success({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      }),
      201 // Created
    );
  }
);

/**
 * GET /api/auth/me
 * Get current authenticated user profile.
 */
identityRoutes.get('/me', requireAuth, async (c) => {
  const session = c.get('session');
  
  // We know session and session.user exist because requireAuth passed
  if (!session || !session.user) {
    throw AppError.unauthorized();
  }
  
  const user = await authService.getProfile(session.user.id);
  
  // Ensure we don't leak password hash
  return c.json(ApiResponse.success({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    institution: user.institution,
    image: user.image,
    emailVerifiedAt: user.emailVerifiedAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));
});

/**
 * PATCH /api/auth/me
 * Update current authenticated user profile.
 */
identityRoutes.patch(
  '/me',
  requireAuth,
  zValidator('json', updateProfileSchema, (result) => {
    if (!result.success) {
      const fieldErrors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      throw AppError.validationError('Data profil tidak valid', { fields: fieldErrors });
    }
  }),
  async (c) => {
    const session = c.get('session');
    
    if (!session || !session.user) {
      throw AppError.unauthorized();
    }
    
    const input = c.req.valid('json');
    const reqLogger = c.get('logger');
    
    reqLogger.info('Profile update attempt', { userId: session.user.id });
    
    const updatedUser = await authService.updateProfile(session.user.id, input);
    
    reqLogger.info('Profile update successful', { userId: session.user.id });
    
    return c.json(ApiResponse.success({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      institution: updatedUser.institution,
      image: updatedUser.image,
      emailVerifiedAt: updatedUser.emailVerifiedAt,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    }));
  }
);

export { identityRoutes };
