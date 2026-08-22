import { test, expect } from '@playwright/test';
import { login } from '../../../utils/helpers';


test('After Login the user is redirected to the inventory page', async ({ page }) => {
  await login(page);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText('Swag Labs')).toBeVisible();
});