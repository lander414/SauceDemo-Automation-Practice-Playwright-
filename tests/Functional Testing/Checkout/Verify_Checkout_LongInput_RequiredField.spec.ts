import { test, expect } from '@playwright/test';
import { login } from '../../../utils/helpers';


test('Verify Checkout Excessive Input in Required Fields', async ({ page }) => {
  await login(page);
  await page.waitForLoadState('networkidle');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/checkout-step-one/);
  await page.locator('[data-test="firstName"]').dblclick();
  await page.locator('[data-test="firstName"]').fill('Johnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
  await page.locator('[data-test="lastName"]').dblclick();
  await page.locator('[data-test="lastName"]').fill('Doeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('200900000000000000000000000000000000000000000000');
  await page.locator('[data-test="continue"]').click();
  await expect(page).not.toHaveURL(/checkout-step-two/);
  await expect(page).toHaveURL(/checkout-step-one/);
});


