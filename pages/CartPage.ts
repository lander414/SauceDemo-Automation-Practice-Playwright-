import type { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.items = page.locator('[data-test="cart-list"] [data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  itemByName(name: string): Locator {
    return this.items.getByText(name, { exact: true });
  }
}