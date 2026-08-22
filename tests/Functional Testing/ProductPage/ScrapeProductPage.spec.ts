import { test, expect } from '@playwright/test';
import { login } from '../../../utils/helpers';


test('Scrape Product Page to Show What are the Products Listed for Sale', async ({ page }) => {
  await login(page);
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