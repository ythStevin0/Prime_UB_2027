/**
 * Test Helpers for PRIME UB 2027 Backend
 *
 * Provides utilities for creating test fixtures, mock data,
 * and test setup/teardown helpers.
 */

import { Hono } from 'hono';
import type { AppEnv } from '@backend/lib/types';

/**
 * Create a test Hono app with the standard AppEnv type.
 * Useful for testing route handlers in isolation.
 *
 * @example
 *   const app = createTestApp();
 *   app.get('/test', (c) => c.json({ ok: true }));
 *   const res = await app.request('/test');
 */
export function createTestApp() {
  return new Hono<AppEnv>();
}

/**
 * Generate a mock UUID for testing.
 * Uses a deterministic format for predictable test assertions.
 */
export function mockUUID(index = 1): string {
  return `00000000-0000-4000-8000-${String(index).padStart(12, '0')}`;
}

/**
 * Generate mock user data for testing.
 */
export function mockUser(overrides: Record<string, unknown> = {}) {
  return {
    id: mockUUID(1),
    name: 'Test User',
    email: 'test@example.com',
    role: 'USER' as const,
    phone: null,
    institution: 'Universitas Brawijaya',
    image: null,
    passwordHash: null,
    emailVerifiedAt: null,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
    ...overrides,
  };
}

/**
 * Generate mock competition data for testing.
 */
export function mockCompetition(overrides: Record<string, unknown> = {}) {
  return {
    id: mockUUID(100),
    slug: 'test-competition',
    title: 'Test Competition',
    type: 'TEAM' as const,
    description: 'A test competition',
    rules: null,
    eligibility: null,
    price: 50000,
    maxTeamSize: 3,
    minTeamSize: 1,
    registrationStartDate: new Date('2026-09-01'),
    registrationEndDate: new Date('2026-10-01'),
    submissionStartDate: new Date('2026-10-01'),
    submissionEndDate: new Date('2026-11-01'),
    status: 'OPEN' as const,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
    ...overrides,
  };
}

/**
 * Parse JSON response from a Hono test request.
 */
export async function parseResponse<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}
