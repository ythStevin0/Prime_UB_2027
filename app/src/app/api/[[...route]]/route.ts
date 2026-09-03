import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { requestLogger } from '../../../backend/middleware/requestLogger';
import { errorHandler } from '../../../backend/middleware/errorHandler';
import type { AppEnv } from '../../../backend/lib/types';
import apiRoutes from '../../../backend/routes';

// Define base path for Hono to match Next.js API route path
const app = new Hono<AppEnv>().basePath('/api');

// ─── Global Middleware ────────────────────────────────────
app.use('*', requestLogger());

// ─── Global Error Handler ─────────────────────────────────
app.onError(errorHandler);

// ─── Mount Routes ─────────────────────────────────────────
app.route('/', apiRoutes);

// Export standard HTTP methods for Next.js App Router
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);

