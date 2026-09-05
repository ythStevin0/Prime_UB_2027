import { Hono } from 'hono';
import { db } from '@backend/lib/db';
import { users, competitions } from '@backend/lib/db/schema';
import { AppError } from '@backend/lib/errors';
import type { AppEnv } from '@backend/lib/types';

import { identityRoutes } from '@backend/modules/identity/routes/identity.routes';
import { competitionRoutes } from '@backend/modules/competitions/routes/competition.routes';
import { adminCompetitionRoutes } from '@backend/modules/competitions/routes/admin.competition.routes';
import { registrationRoutes } from '@backend/modules/registrations/routes/registration.routes';
import { adminRegistrationRoutes } from '@backend/modules/registrations/routes/admin.registration.routes';

const api = new Hono<AppEnv>();

// ─── Module Routes ─────────────────────────────────────────
api.route('/auth', identityRoutes);
api.route('/competitions', competitionRoutes);
api.route('/admin/competitions', adminCompetitionRoutes);
api.route('/registrations', registrationRoutes);
api.route('/admin/registrations', adminRegistrationRoutes);

// ─── Health Check ─────────────────────────────────────────
api.get('/health', (c) => {
  return c.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'PRIME UB 2027 Hono API is running smoothly 🚀',
    },
  });
});

// ─── Database Connection Test ─────────────────────────────
api.get('/db-test', async (c) => {
  const reqLogger = c.get('logger');

  reqLogger.debug('Testing database connection...');

  const testUsers = await db.select().from(users).limit(1);
  const testCompetitions = await db.select().from(competitions).limit(1);

  reqLogger.info('Database connection verified', {
    usersFound: testUsers.length,
    competitionsFound: testCompetitions.length,
  });

  return c.json({
    success: true,
    data: {
      status: 'ok',
      message: 'Database connection successful',
      usersCount: testUsers.length,
      competitionsCount: testCompetitions.length,
    },
  });
});

// ─── 404 Fallback (for unmatched API routes) ──────────────
api.all('/*', (c) => {
  throw AppError.notFound(`Route ${c.req.method} ${c.req.path} tidak ditemukan`);
});

export default api;

