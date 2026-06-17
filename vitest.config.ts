import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    include: [
      'src/app/core/**/*.spec.ts',
      'src/app/features/**/*.spec.ts',
      'src/app/shared/**/*.spec.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/app/core/**/*.ts', 'src/app/features/**/*.ts'],
      exclude: ['**/*.spec.ts', '**/index.ts', '**/*.types.ts'],
    },
  },
});
