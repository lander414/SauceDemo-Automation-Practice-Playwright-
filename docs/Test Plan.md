# Test Plan

## 1. Document Information
- Project Name: SauceDemo Automation Practice
- Application Under Test: SauceDemo
- URL: https://www.saucedemo.com/
- Document Owner: QA Automation Team
- Version: 1.0
- Date: 2026-08-06
- Review Status: Draft for Portfolio/Team Review

## 2. Objective
The purpose of this test plan is to define the scope, approach, environment, and deliverables for validating the key business flows of the SauceDemo application using Playwright and TypeScript. The plan supports both manual validation and automated regression coverage.

## 3. Scope
### In Scope
- User login with valid and invalid credentials
- Product listing and filtering
- Add to cart and remove from cart
- Shopping cart validation
- Checkout flow
- Logout functionality
- Basic UI and navigation checks

### Out of Scope
- Performance testing
- Security penetration testing
- Cross-browser compatibility beyond the targeted browser strategy
- Payment gateway integration testing
- Database-level validation

## 4. Test Environment
- Application URL: https://www.saucedemo.com/
- OS: Windows 11
- Browser: Chromium (Playwright)
- Automation Tool: Playwright 1.61.x
- Language: TypeScript
- Test Runner: Playwright Test
- Test Data: Standard SauceDemo demo users

## 5. Test Strategy
The test strategy focuses on functional correctness, regression prevention, and maintainability. Core scenarios will be automated using Playwright with a Page Object Model (POM) structure to improve scalability and readability. Manual test cases will be used to complement automation where exploratory or usability validation is beneficial.

## 6. Test Approach
- Requirements-based testing for critical user journeys
- Positive and negative testing for login and checkout flows
- Regression testing for core workflows after changes
- Automation-first approach for repetitive and high-value scenarios
- Exploratory testing for edge cases and UI behavior

## 7. Test Deliverables
- Test Plan
- Manual Test Cases
- Traceability Matrix
- Test Execution Report
- Bug Report Template
- Automation Test Suite Documentation

## 8. Entry Criteria
- Application under test is accessible
- Test environment is configured
- Required test data is available
- Automation framework dependencies are installed
- Test cases and scenarios are reviewed

## 9. Exit Criteria
- All planned high-priority test cases are executed
- Critical defects are either fixed or accepted with documented risk
- Test execution report is completed
- Regression suite is executed successfully or with known issues documented

## 10. Risks and Mitigation
| Risk | Impact | Mitigation |
| --- | --- | --- |
| Application UI changes may break selectors | High | Use stable locators and maintain POM classes |
| Test data inconsistency | Medium | Use standard test users and validate data before execution |
| Environment instability | Medium | Run tests against a known stable environment and capture screenshots |
| Limited browser coverage | Medium | Prioritize Chromium for initial automation and expand later |

## 11. Test Schedule
- Planning and documentation: Week 1
- Test case authoring: Week 1
- Automation implementation: Week 2
- Execution and reporting: Week 2
- Review and portfolio refinement: Week 2

## 12. Approval
- Prepared By: Lander Patrick Nathan S. Agustin
- Status: Approved for Documentation and Portfolio Use
