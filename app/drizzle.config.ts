import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Load the local environment variables for the CLI
dotenv.config({ path: '.env.local' });

export default defineConfig({
  schema: './src/backend/lib/db/schema.ts',
  out: './src/backend/lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});
