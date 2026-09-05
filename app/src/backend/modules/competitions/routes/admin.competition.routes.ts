import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import type { AppEnv } from '@backend/lib/types';
import { ApiResponse } from '@backend/lib/response';
import { AppError } from '@backend/lib/errors';
import { requireAuth } from '@backend/middleware/authGuard';
import { requireRole } from '@backend/middleware/roleGuard';
import { competitionService } from '../services/competition.service';
import { 
  createCompetitionSchema, 
  updateCompetitionSchema, 
  competitionQuerySchema 
} from '../schemas/competition.schemas';

export const adminCompetitionRoutes = new Hono<AppEnv>();

// All routes in this file require ADMIN role
adminCompetitionRoutes.use('*', requireAuth, requireRole(['ADMIN']));

/**
 * GET /api/admin/competitions
 * Retrieve a paginated list of all competitions including DRAFT and ARCHIVED.
 */
adminCompetitionRoutes.get(
  '/',
  zValidator('query', competitionQuerySchema, (result) => {
    if (!result.success) {
      throw AppError.validationError('Invalid query parameters', { issues: result.error.issues });
    }
  }),
  async (c) => {
    const query = c.req.valid('query');
    
    const result = await competitionService.getCompetitions({
      page: query.page,
      limit: query.limit,
      search: query.search,
      status: query.status,
      type: query.type,
      isAdminQuery: true, // Allow fetching ALL statuses
    });
    
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
 * GET /api/admin/competitions/:slug
 * Retrieve detailed information about a specific competition (any status).
 */
adminCompetitionRoutes.get('/:slug', async (c) => {
  const slug = c.req.param('slug');
  const competition = await competitionService.getCompetitionBySlug(slug, true);
  
  return c.json(ApiResponse.success(competition));
});

/**
 * POST /api/admin/competitions
 * Create a new competition.
 */
adminCompetitionRoutes.post(
  '/',
  zValidator('json', createCompetitionSchema, (result) => {
    if (!result.success) {
      throw AppError.validationError('Invalid competition data', { issues: result.error.issues });
    }
  }),
  async (c) => {
    const data = c.req.valid('json');
    const newCompetition = await competitionService.createCompetition(data);
    
    return c.json(ApiResponse.success(newCompetition), 201);
  }
);

/**
 * PATCH /api/admin/competitions/:id
 * Update an existing competition.
 */
adminCompetitionRoutes.patch(
  '/:id',
  zValidator('json', updateCompetitionSchema, (result) => {
    if (!result.success) {
      throw AppError.validationError('Invalid competition update data', { issues: result.error.issues });
    }
  }),
  async (c) => {
    const id = c.req.param('id');
    const data = c.req.valid('json');
    
    if (Object.keys(data).length === 0) {
      throw AppError.badRequest('No data provided for update');
    }
    
    const updatedCompetition = await competitionService.updateCompetition(id, data);
    
    return c.json(ApiResponse.success(updatedCompetition));
  }
);
