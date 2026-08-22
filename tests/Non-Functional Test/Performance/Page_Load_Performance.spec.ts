import { test, expect } from '@playwright/test';
import { environment } from '../../../config/env';

test('login page reaches DOM content loaded within the performance budget', async ({ page }) => {
  const response = await page.goto(environment.baseUrl, { waitUntil: 'domcontentloaded' });
  const domContentLoaded = await page.evaluate(() => {
    const browserGlobal = globalThis as unknown as {
      performance: {
        getEntriesByType(type: string): Array<{ domContentLoadedEventEnd: number }>;
      };
    };
    const navigation = browserGlobal.performance.getEntriesByType('navigation')[0];
    return navigation.domContentLoadedEventEnd;
  });

  expect(response?.ok()).toBeTruthy();
  expect(domContentLoaded).toBeLessThan(10000);
});