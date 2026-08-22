import { test, expect } from '../../../fixtures/baseTest';

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

test('Checking Add to Cart functionality', async ({ inventoryPage, cartPage }) => {

  for (const product of productsToAdd) {
    await inventoryPage.addProduct(product.slug);
  }

  await inventoryPage.openCart();
  await expect(cartPage.items).toHaveCount(productsToAdd.length);

  for (const product of productsToAdd) {
    await expect(cartPage.itemByName(product.name)).toBeVisible();
  }
});
