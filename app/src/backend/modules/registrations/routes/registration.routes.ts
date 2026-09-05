import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import type { AppEnv } from '@backend/lib/types';
import { ApiResponse } from '@backend/lib/response';
import { AppError } from '@backend/lib/errors';
import { requireAuth } from '@backend/middleware/authGuard';
import { registrationService } from '../services/registration.service';
import { createRegistrationSchema } from '../schemas/registration.schemas';

export const registrationRoutes = new Hono<AppEnv>();

// All routes require authentication
registrationRoutes.use('*', requireAuth);

/**
 * POST /api/registrations
 * Register for a competition
 */
registrationRoutes.post(
  '/',
  zValidator('json', createRegistrationSchema, (result) => {
    if (!result.success) {
      throw AppError.validationError('Invalid registration data', { issues: result.error.issues });
    }
  }),
  async (c) => {
    const session = c.get('session');
    const data = c.req.valid('json');
    
    // session.user is guaranteed by requireAuth
    const registration = await registrationService.registerToCompetition(session!.user.id, data);
    
    return c.json(ApiResponse.success(registration), 201);
  }
);

/**
 * GET /api/registrations
 * Get my registrations
 */
registrationRoutes.get('/', async (c) => {
  const session = c.get('session');
  
  const registrations = await registrationService.getMyRegistrations(session!.user.id);
  
  return c.json(ApiResponse.success(registrations));
});

/**
 * GET /api/registrations/:id
 * Get detail of a specific registration
 */
registrationRoutes.get('/:id', async (c) => {
  const session = c.get('session');
  const id = c.req.param('id');
  
  const registration = await registrationService.getRegistrationDetail(id, session!.user.id, session!.user.role === 'ADMIN');
  
  return c.json(ApiResponse.success(registration));
});
