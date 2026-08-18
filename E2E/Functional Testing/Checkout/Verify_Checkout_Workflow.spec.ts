import 'dotenv/config';
import { test, expect, type Page } from '@playwright/test';

const username = process.env.SAUCEDEMO_USERNAME ?? '';
const password = process.env.SAUCEDEMO_PASSWORD ?? '';

async function login(page: Page) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory/);
}

const checkoutScenarios = [
  {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '2009',
    productId: 'sauce-labs-backpack',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    postalCode: '10001',
    productId: 'sauce-labs-bolt-t-shirt',
  },
  {
    firstName: 'Alex',
    lastName: 'Johnson',
    postalCode: '60601',
    productId: 'sauce-labs-bike-light',
  },
];

for (const scenario of checkoutScenarios) {
  test(`Verify complete checkout workflow for ${scenario.firstName} ${scenario.lastName}`, async ({ page }) => {
    await login(page);

    await page.locator(`[data-test="add-to-cart-${scenario.productId}"]`).click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
    await page.locator('[data-test="checkout"]').click();

    await expect(page).toHaveURL(/checkout-step-one/);
    await page.locator('[data-test="firstName"]').fill(scenario.firstName);
    await page.locator('[data-test="lastName"]').fill(scenario.lastName);
    await page.locator('[data-test="postalCode"]').fill(scenario.postalCode);
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Overview');
    await expect(page.locator('[data-test="subtotal-label"]')).toBeVisible();
    await expect(page.locator('[data-test="tax-label"]')).toBeVisible();
    await expect(page.locator('[data-test="total-label"]')).toBeVisible();
    await expect(page.locator('[data-test="finish"]')).toBeVisible();

    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.locator('[data-test="pony-express"]')).toBeVisible();
    await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
    await expect(page.locator('[data-test="complete-text"]')).toBeVisible();

    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(/inventory/);
  });
}


