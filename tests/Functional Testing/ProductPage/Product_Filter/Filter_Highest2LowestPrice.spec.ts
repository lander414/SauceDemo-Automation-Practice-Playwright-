import { test, expect } from '@playwright/test';
import { login } from '../../../../utils/helpers';


test('Test the product filter from highest to lowest price', async ({ page }) => {
  await login(page);
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/inventory/);

  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
  await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');

  const productPrices = await page.locator('[data-test="inventory-item-price"]').allInnerTexts();
  const parsedPrices = productPrices.map((priceText) => {
    const numericValue = Number.parseFloat(priceText.replace(/[$,]/g, ''));
    return Number.isNaN(numericValue) ? 0 : numericValue;
  });

  const expectedDescendingPrices = [...parsedPrices].sort((a, b) => b - a);

  expect(parsedPrices).toEqual(expectedDescendingPrices);
});