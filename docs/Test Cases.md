# Test Cases

The following manual test cases provide a structured validation set for the core business processes of SauceDemo.

| Test Case ID | Feature | Title | Preconditions | Test Steps | Test Data | Expected Result | Priority | Automation Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Login | Login with valid credentials | User is on the SauceDemo login page | 1. Open the application URL. 2. Enter a valid username. 3. Enter the corresponding password. 4. Click the Login button. | Username: standard_user Password: secret_sauce | User is successfully logged in and redirected to the inventory page. | High | Automated |
| TC-002 | Login | Login with invalid credentials | User is on the SauceDemo login page | 1. Open the application URL. 2. Enter an invalid username. 3. Enter an incorrect password. 4. Click the Login button. | Username: invalid_user Password: wrong_password | Error message is displayed and user remains on the login page. | High | Automated |
| TC-003 | Product Listing | View product inventory | User is logged in successfully | 1. Navigate to the inventory page. 2. Observe the list of products. | Standard user account | Product cards are displayed with image, name, description, and price. | Medium | Automated |
| TC-004 | Cart | Add a product to cart | User is logged in successfully | 1. Open the inventory page. 2. Click Add to Cart on a product. 3. Observe the cart badge. | Any available product | Product is added to the cart and the cart count increases. | High | Automated |
| TC-005 | Cart | Remove a product from cart | A product has already been added to the cart | 1. Open the cart page. 2. Click Remove on the selected product. | Product added to cart | Product is removed from the cart and the cart count decreases. | High | Automated |
| TC-006 | Cart | Validate shopping cart contents | One or more products are added to the cart | 1. Add products to the cart. 2. Open the cart page. 3. Review the items. | Two products | Selected products appear in the cart with correct details. | High | Automated |
| TC-007 | Checkout | Complete checkout process | User has items in the cart | 1. Open the cart. 2. Click Checkout. 3. Enter checkout information. 4. Continue to review. 5. Finish the order. | First Name: Jane Last Name: Doe ZIP: 10001 | Order completion confirmation is displayed. | High | Automated |
| TC-008 | Logout | Logout from the application | User is logged in successfully | 1. Open the menu. 2. Click Logout. | Standard user account | User is logged out and returned to the login page. | Medium | Automated |
