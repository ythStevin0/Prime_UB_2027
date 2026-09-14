import { Hono } from 'hono';
import { db } from '@backend/lib/db';
import { submissions, registrations, users } from '@backend/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { AppError } from '@backend/lib/errors';
import { requireAuth } from '@backend/middleware/authGuard';
import { requireRole } from '@backend/middleware/roleGuard';
import type { AppEnv } from '@backend/lib/types';

export const adminSubmissionRoutes = new Hono<AppEnv>();

// ─── MIDDLEWARE ───────────────────────────────────────────────
// Require ADMIN role for all admin endpoints
adminSubmissionRoutes.use('*', requireAuth, requireRole(['ADMIN']));

// ─── GET /api/admin/submissions ───────────────────────────────
adminSubmissionRoutes.get('/', async (c) => {
  const reqLogger = c.get('logger');

  try {
    // Fetch all submissions with related user and competition info
    const submissionsList = await db
      .select({
        id: submissions.id,
        title: submissions.title,
        fileName: submissions.fileName,
        fileSize: submissions.fileSize,
        fileUrl: submissions.fileUrl,
        status: submissions.status,
        submittedAt: submissions.submittedAt,
        registrationId: registrations.id,
        teamName: registrations.teamName,
        userName: users.name,
        userEmail: users.email,
        competitionId: registrations.competitionId,
      })
      .from(submissions)
      .innerJoin(registrations, eq(submissions.registrationId, registrations.id))
      .innerJoin(users, eq(registrations.userId, users.id))
      .orderBy(desc(submissions.submittedAt));

    return c.json({
      success: true,
      data: submissionsList,
    });
  } catch (error) {
    reqLogger.error('Failed to fetch submissions for admin', { error });
    throw AppError.internal('Gagal mengambil data submissions');
  }
});
