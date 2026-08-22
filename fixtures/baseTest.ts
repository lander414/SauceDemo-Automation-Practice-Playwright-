import { test as base } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from '../utils/testData';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(credentials.username, credentials.password);
    await use(loginPage);
  },
  inventoryPage: async ({ page, loginPage }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page, loginPage }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page, loginPage }, use) => use(new CheckoutPage(page)),
});

export { expect } from '@playwright/test';