export const routes = {
  login: '/',
  inventory: /inventory/,
  cart: /cart/,
  checkoutInformation: /checkout-step-one/,
} as const;

export const productIds = {
  backpack: 'sauce-labs-backpack',
  bikeLight: 'sauce-labs-bike-light',
  boltTShirt: 'sauce-labs-bolt-t-shirt',
  fleeceJacket: 'sauce-labs-fleece-jacket',
} as const;