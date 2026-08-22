
import { test, expect } from '@playwright/test';
import { login } from '../../../utils/helpers';

test('Add products to cart, verify cart, remove one from inventory page, and verify remaining cart item', async ({ page }) => {
  await login(page);
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/inventory/);

  // Step 1: add two items to cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  // Step 2: go to cart and assert both products are visible
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart/);
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();

  // Step 3: return to products and remove one product from inventory page
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await expect(page).toHaveURL(/inventory/);
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

  // Step 4: verify the remove button is no longer visible and the add button is back
  await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toHaveCount(0);
  await expect(page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')).toBeVisible();

  // Step 5: check the cart again and confirm only the one remaining product is present
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart/);

  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(page.getByText('Sauce Labs Bike Light')).toHaveCount(0);
});
