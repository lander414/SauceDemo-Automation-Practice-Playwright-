# SauceDemo Automation Practice

## Project Overview
This repository contains a Playwright-based automation framework for the SauceDemo application. It is designed to demonstrate professional QA automation practices, including end-to-end testing, maintainable test structure, and portfolio-ready documentation.

## Features
- Playwright with TypeScript
- End-to-end test coverage for core SauceDemo user flows
- Page Object Model (POM) structure
- HTML reporting
- Screenshot and trace capture support
- QA documentation for test planning, execution, and defect management

## Folder Structure
```text
E2E/                  # Test suite files
  Test_e2e/           # End-to-end test cases by feature
docs/                 # QA documentation set
playwright-report/    # HTML test reports
test-results/         # Test execution artifacts
```

## Installation
Install dependencies with:

```bash
npm install
```

## Running Tests
Run the test suite with:

```bash
npx playwright test
```

## Running Headed Mode
Run tests in headed mode for visual validation:

```bash
npx playwright test --headed
```

## Running Specific Tests
Run a specific test file:

```bash
npx playwright test E2E/Test_e2e/login/login.spec.ts
```

## Generating HTML Reports
HTML reports are configured by default. To generate them:

```bash
npx playwright test --reporter=html
```

## Viewing Reports
Open the generated report locally:

```bash
npx playwright show-report
```

## Screenshots
Screenshots are captured automatically for failed or relevant test steps and can be reviewed in the test results directory.

## Trace Viewer
Use Playwright Trace Viewer to inspect executions:

```bash
npx playwright show-trace test-results/<trace-file>/trace.zip
```

## CI/CD Integration
This project is structured to support CI/CD workflows such as GitHub Actions. The test suite can be executed in a pipeline with report generation and artifact retention.

## Documentation Links
- [docs/Test Plan.md](docs/Test%20Plan.md)
- [docs/Test Cases.md](docs/Test%20Cases.md)
- [docs/Traceability Matrix.md](docs/Traceability%20Matrix.md)
- [docs/Test Execution Report.md](docs/Test%20Execution%20Report.md)
- [docs/Bug Report.md](docs/Bug%20Report.md)
- [docs/Test Strategy.md](docs/Test%20Strategy.md)

## Future Improvements
- Expand cross-browser coverage
- Add API testing for backend validation
- Introduce data-driven testing
- Integrate with GitHub Actions
- Improve POM coverage and locator stability
