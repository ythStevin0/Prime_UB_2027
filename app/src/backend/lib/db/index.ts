import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@backend/lib/db/schema';

// Create a singleton instance to prevent multiple connections in dev mode
const queryClient = postgres(process.env.DATABASE_URL as string);

export const db = drizzle(queryClient, { schema });
