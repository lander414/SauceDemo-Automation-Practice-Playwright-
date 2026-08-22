import { test, expect } from '@playwright/test';
import { login } from '../../../utils/helpers';


test('Redirection to Checkout Page', async ({ page }) => {
  await login(page);
  await page.waitForLoadState('networkidle');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/checkout-step-one/);
  await expect(page.getByText('Checkout: Your Information')).toBeVisible();
});
