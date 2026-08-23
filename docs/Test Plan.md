# Test Plan

## 1. Document Information
- Project Name: SauceDemo Automation Practice
- Application Under Test: SauceDemo
- URL: https://www.saucedemo.com/
- Document Owner: QA Automation Team
- Version: 1.1
- Date: 2026-08-23
- Review Status: Active working document

## 2. Objective
This plan defines the scope, approach, environment, and deliverables for validating SauceDemo with Playwright and TypeScript. It describes the repository's automated coverage and identifies manual or future checks separately.

## 3. Scope
### In Scope
- User login with valid and invalid credentials
- Product listing, product details, and filtering
- Add to cart and remove from cart
- Shopping cart validation
- Checkout flow
- Logout functionality
- Sidebar navigation, reset, and logout
- Responsive layout and page-load performance checks

### Out of Scope
- Security penetration testing
- Cross-browser compatibility beyond the targeted browser strategy
- Payment processing and external integrations
- Source-code unit testing and database-level validation

## 4. Test Environment
- Application URL: https://www.saucedemo.com/
- OS: Windows (local development baseline)
- Browser: Chromium (Playwright)
- Automation Tool: Playwright 1.61.1
- Language: TypeScript
- Test Runner: Playwright Test
- Test Data: SauceDemo demo users and deterministic checkout data

## 5. Test Strategy
The strategy focuses on functional correctness, regression prevention, and maintainability. Tests use Playwright with Page Object Model classes, shared fixtures, and centralized helpers. Manual exploratory checks remain complementary and are not counted as automated coverage.

## 6. Test Approach
- Requirements-based testing for critical user journeys
- Positive and negative testing for login and checkout flows
- Regression testing for core workflows after changes
- Automation-first approach for repetitive and high-value scenarios
- Exploratory testing for edge cases and UI behavior when time and environment permit

## 7. Test Deliverables
- Test Plan
- Manual Test Cases
- Traceability Matrix
- Test Execution Report
- Bug Report Template
- Automation repository and generated test artifacts

## 8. Entry Criteria
- Application under test is accessible
- Test environment is configured
- Required test data is available
- Automation framework dependencies are installed
- Scope and test data are reviewed

## 9. Exit Criteria
- All planned high-priority test cases are executed
- Critical defects are either fixed or accepted with documented risk
- Test execution report is completed
- Results, defects, skips, and environment limitations are documented

## 10. Risks and Mitigation
| Risk | Impact | Mitigation |
| --- | --- | --- |
| Application UI changes may break selectors | High | Use stable locators and maintain POM classes |
| Demo-site availability or behavior changes | High | Record the base URL and rerun the smoke subset before regression |
| Test data inconsistency | Medium | Use standard users and deterministic checkout data |
| Limited browser coverage | Medium | Treat Chromium as the baseline and track Firefox/WebKit as future coverage |

## 11. Test Schedule
- Planning and documentation: Week 1
- Test case authoring: Week 1
- Automation implementation: Week 2
- Execution and reporting: Week 2
- Review and portfolio refinement: Week 2

## 12. Approval
- Prepared By: Lander Patrick Nathan S. Agustin
- Status: Maintained for documentation and portfolio use
