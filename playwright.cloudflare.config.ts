import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './cloudflare_tests',
    testMatch: '**/assets.test.ts',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    reporter: 'list',
    use: { baseURL: 'http://127.0.0.1:8788' },
    webServer: {
        command: 'yarn preview:cloudflare --port 8788',
        url: 'http://127.0.0.1:8788',
        reuseExistingServer: false,
        timeout: 180000,
        env: { WRANGLER_SEND_METRICS: 'false' },
    },
});
