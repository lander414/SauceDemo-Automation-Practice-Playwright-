import { test, expect } from '@playwright/test';
import { login } from '../../../utils/helpers';


test('Verify Checkout Failed - Zipcode Name Missing', async ({ page }) => {
  await login(page);
  await page.waitForLoadState('networkidle');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/checkout-step-one/);
  await page.locator('[data-test="firstName"]').dblclick();
  await page.locator('[data-test="firstName"]').fill('John');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});


