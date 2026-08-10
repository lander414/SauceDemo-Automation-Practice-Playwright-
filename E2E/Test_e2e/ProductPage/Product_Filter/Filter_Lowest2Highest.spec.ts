import 'dotenv/config';
import { test, expect } from '@playwright/test';


test('Test the product filter from lowest to highest price', async ({ page }) => {
  const username = process.env.SAUCEDEMO_USERNAME ?? '';
  const password = process.env.SAUCEDEMO_PASSWORD ?? '';

  await page.goto('/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/inventory/);

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('lohi');

  const productPrices = await page.locator('[data-test="inventory-item-price"]').allInnerTexts();
  const parsedPrices = productPrices.map((priceText) => {
    const numericValue = Number.parseFloat(priceText.replace(/[$,]/g, ''));
    return Number.isNaN(numericValue) ? 0 : numericValue;
  });

  const expectedAscendingPrices = [...parsedPrices].sort((a, b) => a - b);

  expect(parsedPrices).toEqual(expectedAscendingPrices);
});