import { test, expect } from '@playwright/test';
import { login } from '../../../utils/helpers';


test('Sidebar About Me Button Functionality', async ({ page }) => {
  await login(page);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/inventory/);
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="about-sidebar-link"]').click();
  await page.locator('.relative').first().click();
  await expect(page).toHaveURL('https://saucelabs.com/');
});