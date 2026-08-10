import 'dotenv/config';
import { test, expect } from '@playwright/test';

const productsToAdd = [
  {
    slug: 'sauce-labs-backpack',
    name: 'Sauce Labs Backpack',
  },
  {
    slug: 'sauce-labs-bike-light',
    name: 'Sauce Labs Bike Light',
  },
  {
    slug: 'sauce-labs-bolt-t-shirt',
    name: 'Sauce Labs Bolt T-Shirt',
  },
  {
    slug: 'sauce-labs-fleece-jacket',
    name: 'Sauce Labs Fleece Jacket',
  },
];

test('Checking Add to Cart functionality', async ({ page }) => {
  const username = process.env.SAUCEDEMO_USERNAME ?? '';
  const password = process.env.SAUCEDEMO_PASSWORD ?? '';

  await page.goto('/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');

  for (const product of productsToAdd) {
    await page.locator(`[data-test="add-to-cart-${product.slug}"]`).click();
  }

  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart/);

  for (const product of productsToAdd) {
    await expect(page.getByText(product.name)).toBeVisible();
  }
});
