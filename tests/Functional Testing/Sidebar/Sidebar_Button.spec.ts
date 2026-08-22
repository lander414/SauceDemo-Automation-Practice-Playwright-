import { test, expect } from '@playwright/test';
import { login } from '../../../utils/helpers';


test('Sidebar button functionality', async ({ page }) => {
  await login(page);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/inventory/);
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await expect(page.locator('[data-test="inventory-sidebar-link"]')).toBeVisible();
  await expect(page.locator('[data-test="about-sidebar-link"]')).toBeVisible();
  await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();
  await expect(page.locator('[data-test="reset-sidebar-link"]')).toBeVisible();
});