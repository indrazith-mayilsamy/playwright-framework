import { defineConfig, PlaywrightTestConfig } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

import dotenv from 'dotenv';
import path from 'path';
import { Configuration } from './utils/services/configuration';
dotenv.config();

const isHeaded = process.argv.includes('--headed')
const browsers: string[] = process.env.BROWSER ? [process.env.BROWSER] : ["chromium", "firefox", "webkit"];

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 150000,
  testDir: path.join(process.cwd(), 'tests/testsOrder'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: Configuration.get('URL'),
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    headless: isHeaded,
    storageState: path.join(process.cwd(), "state.json")
  },

  /* Configure projects for major browsers */
  projects: [
    ...browsers.map((browser) => ({
      name: "SAT",
      use: { browserName: browser },
      testMatch: "sat.list.ts"
    })),
    ...browsers.map((browser) => ({
      name: "UAT",
      use: { browserName: browser },
      testMatch: "uat.list.ts"
    }))
  ] as PlaywrightTestConfig['projects'],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
