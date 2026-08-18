import 'dotenv/config';
import { test, expect } from '@playwright/test';


test('Test the product filter A to Z', async ({ page }) => {
  const username = process.env.SAUCEDEMO_USERNAME ?? '';
  const password = process.env.SAUCEDEMO_PASSWORD ?? '';

  await page.goto('/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/inventory/);

  await page.locator('[data-test="product-sort-container"]').selectOption('az');
  await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('az');

  const productNames = await page.locator('.inventory_item_name').allTextContents();
  const sortedProductNames = [...productNames].sort((a, b) => a.localeCompare(b));

  expect(productNames).toEqual(sortedProductNames);
});