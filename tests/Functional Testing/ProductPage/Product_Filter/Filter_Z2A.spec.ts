import { test, expect } from '@playwright/test';
import { login } from '../../../../utils/helpers';


test('Test the product filter Z to A', async ({ page }) => {
  await login(page);
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/inventory/);

  await page.locator('[data-test="product-sort-container"]').selectOption('za');
  await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('za');

  const productNames = await page.locator('.inventory_item_name').allTextContents();
  const sortedProductNames = [...productNames].sort((a, b) => b.localeCompare(a));

  expect(productNames).toEqual(sortedProductNames);
});