import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import type { AppEnv } from '@backend/lib/types';
import { ApiResponse, calcPagination } from '@backend/lib/response';
import { AppError } from '@backend/lib/errors';
import { competitionService } from '../services/competition.service';
import { competitionQuerySchema } from '../schemas/competition.schemas';

export const competitionRoutes = new Hono<AppEnv>();

/**
 * GET /api/competitions
 * Retrieve a paginated list of active competitions (OPEN or CLOSED).
 */
competitionRoutes.get(
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
      isAdminQuery: false, // Ensure public filter rules apply
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
 * GET /api/competitions/:slug
 * Retrieve detailed information about a specific competition.
 */
competitionRoutes.get('/:slug', async (c) => {
  const slug = c.req.param('slug');
  
  const competition = await competitionService.getCompetitionBySlug(slug, false);
  
  return c.json(ApiResponse.success(competition));
});
