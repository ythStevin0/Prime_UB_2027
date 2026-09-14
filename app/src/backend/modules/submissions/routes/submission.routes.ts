import { Hono } from 'hono';
import { db } from '@backend/lib/db';
import { submissions, registrations } from '@backend/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { AppError } from '@backend/lib/errors';
import { requireAuth } from '@backend/middleware/authGuard';
import type { AppEnv } from '@backend/lib/types';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const submissionRoutes = new Hono<AppEnv>();

// ─── MIDDLEWARE ───────────────────────────────────────────────
// Require authentication for all submission endpoints
submissionRoutes.use('*', requireAuth);

// ─── POST /api/submissions ────────────────────────────────────
submissionRoutes.post('/', async (c) => {
  const reqLogger = c.get('logger');
  const session = c.get('session');
  const user = session!.user;

  try {
    const formData = await c.req.formData();
    const file = formData.get('file');
    const registrationId = formData.get('registrationId');
    const title = formData.get('title') || 'Submission';

    if (!file || !(file instanceof File)) {
      throw AppError.badRequest('File is required');
    }

    if (!registrationId || typeof registrationId !== 'string') {
      throw AppError.badRequest('Registration ID is required');
    }

    // 1. Check if registration exists and belongs to the user
    const [registration] = await db
      .select()
      .from(registrations)
      .where(
        and(
          eq(registrations.id, registrationId),
          eq(registrations.userId, user.id)
        )
      );

    if (!registration) {
      throw AppError.notFound('Registration not found or you are not authorized');
    }

    if (registration.status !== 'APPROVED') {
      throw AppError.badRequest('Registration must be APPROVED before submitting');
    }

    // 1.5 Check if already submitted
    const [existingSubmission] = await db
      .select()
      .from(submissions)
      .where(eq(submissions.registrationId, registrationId));

    if (existingSubmission) {
      throw AppError.badRequest('You have already submitted a file for this competition/event.');
    }

    // 2. Save the file to public/uploads/submissions
    const timestamp = Date.now();
    const safeFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${registrationId}-${timestamp}-${safeFilename}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'submissions');
    
    // Ensure directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch {
      // Ignore if exists
    }

    const filePath = path.join(uploadDir, filename);
    const fileBuffer = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(fileBuffer));

    const fileUrl = `/uploads/submissions/${filename}`;

    // 3. Save to database
    const [submission] = await db
      .insert(submissions)
      .values({
        registrationId,
        title: title.toString(),
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type || 'application/octet-stream',
        status: 'SUBMITTED',
        submittedAt: new Date(),
      })
      .returning();

    reqLogger.info(`File submitted successfully for registration ${registrationId}`);

    return c.json({
      success: true,
      data: submission,
      message: 'Karya berhasil dikirimkan',
    });
  } catch (error) {
    reqLogger.error('Failed to submit file', { error });
    if (error instanceof AppError) {
      throw error;
    }
    throw AppError.internal('Terjadi kesalahan saat menyimpan file');
  }
});
