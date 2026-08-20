// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const PORT = 4173;

// Conservative by default: workers=1, no fully-parallel execution. Given
// the machine-instability incident this harness's development ran into,
// and that 15 tests finish in ~15-20s serially anyway, there's negligible
// time benefit to parallelising the normal local run -- so the default
// stays single-worker/sequential. Parallel execution is available only as
// an explicit opt-in stress mode (`STRESS=1 npx playwright test`), for
// deliberately re-testing stability under real concurrent load, not as
// the everyday default.
const STRESS = !!process.env.STRESS;

module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: STRESS,
  workers: process.env.CI ? undefined : STRESS ? undefined : 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: `node scripts/dev-server.js ${PORT}`,
    url: `http://localhost:${PORT}/index.html`,
    reuseExistingServer: !process.env.CI,
    timeout: 10_000,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] }, testIgnore: /mobile\.spec\.js/ },
    { name: 'mobile', use: { ...devices['iPhone 13'] }, testMatch: /mobile\.spec\.js/ },
  ],
});
