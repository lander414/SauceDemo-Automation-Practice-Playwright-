import { test, expect } from '@playwright/test';
import { environment } from '../../../config/env';

test.describe('SauceDemo responsive behavior', () => {
  test('login page remains usable at mobile and desktop widths', async ({ browser }) => {
    for (const viewport of [
      { width: 375, height: 667 },
      { width: 1440, height: 900 },
    ]) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();

      await page.goto(environment.baseUrl, { waitUntil: 'domcontentloaded' });
      await expect(page.getByPlaceholder('Username')).toBeVisible();
      await expect(page.getByPlaceholder('Password')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

      const documentWidth = await page.evaluate(() => {
        const browserGlobal = globalThis as unknown as {
          document: { documentElement: { scrollWidth: number } };
        };
        return browserGlobal.document.documentElement.scrollWidth;
      });
      expect(documentWidth).toBeLessThanOrEqual(viewport.width);

      await context.close();
    }
  });
});