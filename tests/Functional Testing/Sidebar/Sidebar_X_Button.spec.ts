import { test, expect } from '@playwright/test';
import { login } from '../../../utils/helpers';


test('Sidebar "X" button functionality', async ({ page }) => {
  await login(page);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/inventory/);
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('button', { name: 'Close Menu' }).click();
  await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
});