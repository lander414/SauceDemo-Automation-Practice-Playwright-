# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Functional Testing\Checkout\Verify_Checkout_Page_Requirement.spec.ts >> Verify Checkout Page Requirements
- Location: tests\Functional Testing\Checkout\Verify_Checkout_Page_Requirement.spec.ts:5:5

# Error details

```
Error: page.waitForLoadState: Target page, context or browser has been closed
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { login } from '../../../utils/helpers';
  3  | 
  4  | 
  5  | test('Verify Checkout Page Requirements', async ({ page }) => {
  6  |   await login(page);
> 7  |   await page.waitForLoadState('networkidle');
     |              ^ Error: page.waitForLoadState: Target page, context or browser has been closed
  8  |   await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  9  |   await page.locator('[data-test="shopping-cart-link"]').click();
  10 |   await page.locator('[data-test="checkout"]').click();
  11 |   await page.waitForLoadState('networkidle');
  12 |   await expect(page).toHaveURL(/checkout-step-one/);
  13 |   await expect(page.getByText('Checkout: Your Information')).toBeVisible();
  14 |   await page.locator('[data-test="firstName"]').click();
  15 |   await expect(page.locator('[data-test="lastName"]')).toBeVisible();
  16 |   await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
  17 |   await expect(page.locator('[data-test="cancel"]')).toBeVisible();
  18 |   await expect(page.locator('[data-test="continue"]')).toBeVisible();
  19 | });
  20 | 
  21 | 
```