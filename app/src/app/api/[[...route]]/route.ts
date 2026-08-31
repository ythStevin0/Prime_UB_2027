import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import apiRoutes from '../../../backend/routes';

// Define base path for Hono to match Next.js API route path
const app = new Hono().basePath('/api');

// Mount our backend routes
app.route('/', apiRoutes);

// Export standard HTTP methods for Next.js App Router
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
