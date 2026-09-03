import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    // Use the Node.js environment for backend tests
    environment: 'node',

    // Test file patterns
    include: ['src/**/__tests__/**/*.test.ts'],

    // Global test timeout (ms)
    testTimeout: 10000,

    // Reporter
    reporters: ['verbose'],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@frontend': path.resolve(__dirname, './src/frontend'),
      '@backend': path.resolve(__dirname, './src/backend'),
    },
  },
});
