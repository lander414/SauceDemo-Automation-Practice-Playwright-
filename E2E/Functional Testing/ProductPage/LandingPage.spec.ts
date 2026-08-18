import 'dotenv/config';
import { test, expect } from '@playwright/test';


test('After Login the user is redirected to the inventory page', async ({ page }) => {
  const username = process.env.SAUCEDEMO_USERNAME ?? '';
  const password = process.env.SAUCEDEMO_PASSWORD ?? '';

  await page.goto('/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText('Swag Labs')).toBeVisible();
});