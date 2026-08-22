import { test, expect } from '../../../fixtures/baseTest';

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
  test(`Verify complete checkout workflow for ${scenario.firstName} ${scenario.lastName}`, async ({ page, inventoryPage, cartPage, checkoutPage }) => {

    await inventoryPage.addProduct(scenario.productId);
    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.checkoutButton).toBeVisible();
    await cartPage.checkout();

    await expect(page).toHaveURL(/checkout-step-one/);
    await checkoutPage.completeInformation(scenario.firstName, scenario.lastName, scenario.postalCode);

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


