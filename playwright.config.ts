import { defineConfig } from '@playwright/test';
import { environment } from './config/env';

export default defineConfig({
  testDir: './tests',
  reporter: [['html', { outputFolder: 'reports', open: 'never' }]],
  use: {
    baseURL: environment.baseUrl,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
});