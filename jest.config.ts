import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': './src/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
};

export default createJestConfig(customJestConfig);
