import { test, expect } from '@playwright/test';
import { login } from '../../../utils/helpers';


test('Checking if the header and footer are visible', async ({ page }) => {
  await login(page);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('[data-test="footer"]')).toBeVisible();
});