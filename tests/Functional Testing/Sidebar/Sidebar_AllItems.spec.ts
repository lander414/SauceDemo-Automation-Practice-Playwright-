import { test, expect } from '@playwright/test';
import { login } from '../../../utils/helpers';

test('Sidebar All item Button Functionality', async ({ page }) => {
  await login(page);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/inventory/);
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="inventory-sidebar-link"]').click();


  await expect(page).toHaveURL(/inventory/);
  const productCards = page.locator('.inventory_item');
  const productCount = await productCards.count();

  expect(productCount).toBeGreaterThan(0);
  for (let index = 0; index < productCount; index++) {
    await expect(productCards.nth(index)).toBeVisible();
    await expect(productCards.nth(index).locator('.inventory_item_name')).not.toBeEmpty();
  }
});