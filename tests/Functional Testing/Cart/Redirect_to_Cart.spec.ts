import { test, expect } from '@playwright/test';
import { login } from '../../../utils/helpers';


test('Checking if the cart is accessible', async ({ page }) => {
  await login(page);
  await page.waitForLoadState('networkidle');
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page).toHaveURL(/cart/);
});