import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import type { AppEnv } from '@backend/lib/types';
import { ApiResponse } from '@backend/lib/response';
import { AppError } from '@backend/lib/errors';
import { requireAuth } from '@backend/middleware/authGuard';
import { requireRole } from '@backend/middleware/roleGuard';
import { registrationService } from '../services/registration.service';
import { updateRegistrationStatusSchema, registrationQuerySchema } from '../schemas/registration.schemas';

export const adminRegistrationRoutes = new Hono<AppEnv>();

// All routes in this file require ADMIN role
adminRegistrationRoutes.use('*', requireAuth, requireRole(['ADMIN']));

/**
 * GET /api/admin/registrations
 * Retrieve a paginated list of all registrations.
 */
adminRegistrationRoutes.get(
  '/',
  zValidator('query', registrationQuerySchema, (result) => {
    if (!result.success) {
      throw AppError.validationError('Invalid query parameters', { issues: result.error.issues });
    }
  }),
  async (c) => {
    const query = c.req.valid('query');
    
    const result = await registrationService.getAdminRegistrations({
      search: query.search,
      status: query.status,
      competitionId: query.competitionId,
    }, query.page, query.limit);
    
    return c.json(
      ApiResponse.paginated(
        result.data,
        {
          total: result.total,
          page: result.page,
          limit: result.limit
        }
      )
    );
  }
);

/**
 * PATCH /api/admin/registrations/:id/status
 * Approve or Reject a registration.
 */
adminRegistrationRoutes.patch(
  '/:id/status',
  zValidator('json', updateRegistrationStatusSchema, (result) => {
    if (!result.success) {
      throw AppError.validationError('Invalid status data', { issues: result.error.issues });
    }
  }),
  async (c) => {
    const id = c.req.param('id');
    const { status } = c.req.valid('json');
    
    const updatedRegistration = await registrationService.updateRegistrationStatus(id, status);
    
    return c.json(ApiResponse.success(updatedRegistration));
  }
);
