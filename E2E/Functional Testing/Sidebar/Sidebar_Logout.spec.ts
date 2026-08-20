import 'dotenv/config';
import { test, expect } from '@playwright/test';


test('Sidebar Logout Functionality', async ({ page }) => {
  const username = process.env.SAUCEDEMO_USERNAME ?? '';
  const password = process.env.SAUCEDEMO_PASSWORD ?? '';

  await page.goto('/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/inventory/);
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});