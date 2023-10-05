/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/server/src/tests/jest.setup.ts'],
  testMatch: ['**/**/*.test.ts'],
  forceExit: true,
};