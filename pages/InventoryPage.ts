import type { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly products: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.products = page.locator('.inventory_item');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addProduct(productId: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}