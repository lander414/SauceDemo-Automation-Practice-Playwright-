# Bug Report

## 1. Bug Summary
This document provides a reusable defect template and clearly labeled example records for the SauceDemo automation project. Replace example values with evidence from an actual run before treating a record as an open defect.

## 2. Bug Report Template
| Field | Details |
| --- | --- |
| Bug ID | BUG-XXX |
| Title | Application does not display error message for invalid login |
| Description | When a user enters invalid credentials, the expected validation message is not shown consistently. |
| Severity | Major |
| Priority | High |
| Environment | OS / Chromium version / base URL |
| Preconditions | User is on the SauceDemo login page. |
| Steps to Reproduce | 1. Open the login page. 2. Enter invalid credentials. 3. Click Login. |
| Expected Result | A clear error message should appear and the user should remain on the login page. |
| Actual Result | The error message appears intermittently or not at all. |
| Attachments | Screenshot, console log, Playwright trace |
| Status | New |
| Assigned To | Unassigned |

## 3. Example Bug Reports

The following examples are illustrative and are not confirmed defects.

### Bug 1
- Bug ID: BUG-001
- Title: Invalid login credentials do not consistently show validation message
- Severity: Major
- Priority: High
- Description: The login form does not always display the expected error feedback when invalid credentials are entered.

### Bug 2
- Bug ID: BUG-002
- Title: Product quantity badge does not update correctly after removing items
- Severity: Medium
- Priority: Medium
- Description: The cart badge sometimes displays an incorrect count after an item is removed from the cart.

### Bug 3
- Bug ID: BUG-003
- Title: Checkout button is not accessible on small screen widths
- Severity: Medium
- Priority: Medium
- Description: On narrower viewports, the checkout button becomes partially hidden and difficult to click.
