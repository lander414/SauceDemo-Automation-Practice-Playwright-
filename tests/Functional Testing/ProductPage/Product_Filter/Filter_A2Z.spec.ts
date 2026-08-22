import { test, expect } from '@playwright/test';
import { login } from '../../../../utils/helpers';


test('Test the product filter A to Z', async ({ page }) => {
  await login(page);
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/inventory/);

  await page.locator('[data-test="product-sort-container"]').selectOption('az');
  await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('az');

  const productNames = await page.locator('.inventory_item_name').allTextContents();
  const sortedProductNames = [...productNames].sort((a, b) => a.localeCompare(b));

  expect(productNames).toEqual(sortedProductNames);
});