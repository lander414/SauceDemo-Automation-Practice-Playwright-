# Traceability Matrix

This matrix links business requirements to the test-case catalog and the current automated coverage. Status describes repository implementation, not the result of a particular execution.

| Requirement | Business Requirement | Manual Test Case | Automated Test | Status |
| --- | --- | --- | --- | --- |
| R-001 | User must be able to log in with valid credentials | TC-001 | Login test suite | Implemented |
| R-002 | User must receive an error message for invalid login | TC-002 | Login negative test | Implemented |
| R-003 | User must be able to view available products | TC-003 | `LandingPage`, `ScrapeProductPage` | Implemented |
| R-004 | User must be able to sort products | TC-004 | `Product_Filter/*` | Implemented |
| R-005 | User must be able to add products to the cart | TC-005 | `Add_to_Cart`, `Remove_Add_to_Cart` | Implemented |
| R-006 | User must be able to remove and review cart items | TC-006 | `Remove_to_Cart`, `Redirect_to_Cart` | Implemented |
| R-007 | User must be able to start checkout | TC-007 | `Redirection_to_Checkout_Page` | Implemented |
| R-008 | User must receive checkout validation feedback | TC-008, TC-009 | `Verify_Checkout_Failed_*`, `Verify_Checkout_Invalid_*` | Implemented |
| R-009 | User must be able to complete checkout | TC-010 | `Verify_Checkout_Workflow` | Implemented |
| R-010 | User must be able to use sidebar actions | TC-011 | `Sidebar_*.spec.ts` | Implemented |
| R-011 | User must be able to log out | TC-012 | `Sidebar_Logout` | Implemented |
| R-012 | Login page must remain usable on target viewports | TC-013 | `Responsive_LoginPage` | Implemented |
| R-013 | Login page must meet the performance budget | TC-014 | `Page_Load_Performance` | Implemented |
