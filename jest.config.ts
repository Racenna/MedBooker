import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

// ------------------
// * variant 1 - able to test client and server features

const clientTestConfig: Config = {
  displayName: 'client',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/__tests__/client/**/*.test.tsx'],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
    '<rootDir>/__mocks__/index.ts',
  ],
};

const serverTestConfig: Config = {
  displayName: 'server',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/server/**/*.test.ts'],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
    '<rootDir>/__mocks__/index.ts',
  ],
};

async function getJestConfig(): Promise<Config> {
  return {
    coverageProvider: 'v8',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testPathIgnorePatterns: ['<rootDir>/(node_modules|.next)/'],
    projects: [
      await createJestConfig(clientTestConfig)(),
      await createJestConfig(serverTestConfig)(),
    ],
  };
}

export default getJestConfig();

// ------------------------------

// * variant 2 - no projects (initial)

// const config: Config = {
//   coverageProvider: 'v8',
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/$1',
//   },
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
//   testPathIgnorePatterns: ['<rootDir>/(node_modules|.next)/'],
// };

// export default createJestConfig(config);

// --------------------------------
