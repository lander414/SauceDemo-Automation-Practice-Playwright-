import { test, expect } from '@playwright/test';
import { login } from '../../../utils/helpers';


test('Sidebar Reset App Functionality', async ({ page }) => {
  await login(page);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/inventory/);
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="continue-shopping"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="reset-sidebar-link"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="cart-list"] [data-test="inventory-item"]')).toHaveCount(0);
});