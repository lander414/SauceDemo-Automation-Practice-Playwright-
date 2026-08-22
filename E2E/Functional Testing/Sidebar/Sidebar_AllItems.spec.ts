import 'dotenv/config';
import { test, expect } from '@playwright/test';


test('Sidebar All item Button Functionality', async ({ page }) => {
  const username = process.env.SAUCEDEMO_USERNAME ?? '';
  const password = process.env.SAUCEDEMO_PASSWORD ?? '';

  await page.goto('/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/inventory/);
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="inventory-sidebar-link"]').click();


  await expect(page).toHaveURL(/inventory/);
  const productCards = page.locator('.inventory_item');
  const productCount = await productCards.count();

  expect(productCount).toBeGreaterThan(0);
  for (let index = 0; index < productCount; index++) {
    await expect(productCards.nth(index)).toBeVisible();
    await expect(productCards.nth(index).locator('.inventory_item_name')).not.toBeEmpty();
  }
});