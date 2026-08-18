import 'dotenv/config';
import { test, expect } from '@playwright/test';


test('Scrape Product Page to Show What are the Products Listed for Sale', async ({ page }) => {
  const username = process.env.SAUCEDEMO_USERNAME ?? '';
  const password = process.env.SAUCEDEMO_PASSWORD ?? '';

  await page.goto('/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/inventory/);

  const productCards = page.locator('.inventory_item');
  await expect(productCards.first()).toBeVisible();

  const productCount = await productCards.count();
  expect(productCount).toBeGreaterThan(0);

  const products: Array<{ name: string; price: string; description: string }> = [];

  for (let i = 0; i < productCount; i++) {
    const card = productCards.nth(i);
    const name = (await card.locator('.inventory_item_name').textContent())?.trim() ?? '';
    const price = (await card.locator('.inventory_item_price').textContent())?.trim() ?? '';
    const description = (await card.locator('.inventory_item_desc').textContent())?.trim() ?? '';

    products.push({ name, price, description });
  }

  console.log('Scraped products:', products);
  expect(products.length).toBe(productCount);
});