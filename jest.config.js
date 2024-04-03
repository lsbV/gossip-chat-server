/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    // moduleNameMapper: {
    //     '^@/(.*)$': '<rootDir>/src/$1',
    // },
    // collectCoverage: true,
    // collectCoverageFrom: ['src/**/*.ts'],
    // coverageDirectory: 'coverage',
    // coverageReporters: ['text', 'lcov', 'clover'],
    // globals: {
    //     'ts-jest': {
    //         tsconfig: 'tsconfig.json',
    //     },
    // },
    // setupFilesAfterEnv: ['jest-extended'],
    // verbose: true,
    // transform: {
    //     '^.+\\.ts$': 'ts-jest',
    // },
    // testTimeout: 30000,

};