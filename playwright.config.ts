import { defineConfig, devices } from "@playwright/test";

// A fixed port keeps the check apart from a `vp run dev` server on 4302.
const DOCS_E2E_PORT = 14_302;

export default defineConfig({
  forbidOnly: Boolean(process.env.CI),
  outputDir: "test-results",
  reporter: "list",
  retries: process.env.CI ? 1 : 0,
  testDir: "./e2e",
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `vp dev --host 127.0.0.1 --port ${DOCS_E2E_PORT} --strictPort`,
    gracefulShutdown: { signal: "SIGTERM", timeout: 10_000 },
    reuseExistingServer: false,
    timeout: 120_000,
    url: `http://127.0.0.1:${DOCS_E2E_PORT}/sitemap.xml`,
  },
});
