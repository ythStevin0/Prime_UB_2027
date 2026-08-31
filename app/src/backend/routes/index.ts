import { Hono } from 'hono';
import { db } from '../lib/db';
import { users, competitions } from '../lib/db/schema';

const api = new Hono();

// Health Check Route
api.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'PRIME UB 2027 Hono API is running smoothly 🚀',
  });
});

// Test Database Connection Route
api.get('/db-test', async (c) => {
  try {
    // Simple query to test the connection
    const testUsers = await db.select().from(users).limit(1);
    const testCompetitions = await db.select().from(competitions).limit(1);
    
    return c.json({
      status: 'ok',
      message: 'Database connection successful',
      data: {
        usersCount: testUsers.length,
        competitionsCount: testCompetitions.length,
      }
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return c.json({
      status: 'error',
      message: 'Failed to connect to database',
      error: (error as Error).message,
    }, 500);
  }
});

export default api;
