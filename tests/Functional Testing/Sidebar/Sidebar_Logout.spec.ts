import { test, expect } from '@playwright/test';
import { login } from '../../../utils/helpers';


test('Sidebar Logout Functionality', async ({ page }) => {
  await login(page);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/inventory/);
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});