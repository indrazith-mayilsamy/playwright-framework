import { defineConfig, devices } from "@playwright/test";

const isHeaded = process.argv.includes("--headed");
const isParallel = process.argv.includes("--parallel");

export default defineConfig({
  timeout: 90000,
  tsconfig: "tsconfig.json",
  testDir: "./test-order",
  testMatch: ["**/*.list.ts", "**/*.test.ts", "**/*.spec.ts"],
  fullyParallel: isParallel,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    headless: !isHeaded,
    trace: "on-first-retry",
    screenshot: "on-first-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
