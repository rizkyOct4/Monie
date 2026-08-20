import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  coverageDirectory: "<rootDir>/coverage",
  testEnvironment: "jsdom",
  modulePaths: ["<rootDir>/app"],
  collectCoverage: false,
  verbose: true,
  coverageThreshold: {
    global: {
      statements: 40,
      branches: 70,
      functions: 50,
      lines: 40,
    },
  },
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "!app/**/*.d.ts",
    "!<rootDir>/types/**",
    "!app/**/*.type.ts",
    "!app/**/*.lazy.tsx",
    "!<rootDir>/.next/**",
    "!<rootDir>/coverage/**",
    "!<rootDir>/node_modules/**",
    "!<rootDir>/proxy.ts",
    "!<rootDir>/auth.ts",
    "!<rootDir>/*.config.ts",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
