import 'dotenv/config';
import { test, expect } from '@playwright/test';


test('Verify Checkout Last Name Field Special Characters', async ({ page }) => {
  const username = process.env.SAUCEDEMO_USERNAME ?? '';
  const password = process.env.SAUCEDEMO_PASSWORD ?? '';

  await page.goto('/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/checkout-step-one/);
  await page.locator('[data-test="firstName"]').dblclick();
  await page.locator('[data-test="firstName"]').fill('John@#$%');
  await page.locator('[data-test="lastName"]').dblclick();
  await page.locator('[data-test="lastName"]').fill('Doe@#$%');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('2009');
  await page.locator('[data-test="continue"]').click();
  await expect(page).toHaveURL(/checkout-step-two/);
});


