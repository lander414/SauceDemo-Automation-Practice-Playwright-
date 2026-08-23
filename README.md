# SauceDemo Automation Practice

Playwright and TypeScript tests for the [SauceDemo](https://www.saucedemo.com/) demo store. The project uses page objects, shared fixtures, environment variables, and Playwright reports to exercise functional and selected non-functional user journeys.

## Coverage
- Login and negative login validation
- Product inventory, product filtering, and cart operations
- Checkout navigation, validation, and completion
- Sidebar navigation, reset, and logout
- Login-page responsive behavior
- Login-page DOM-content-loaded performance budget

The current suite contains 41 discovered tests in 34 spec files. Confirm the inventory locally with `npx playwright test --list`; the count can change as tests are added.

## Project Layout
```text
tests/                # Test specs organized by feature and test type
  Functional Testing/
    LoginPage/
    ProductPage/
    Cart/
    Checkout/
    Sidebar/
  Non-Functional Test/   # Non-functional tests by concern
    Responsive/
    Performance/
pages/                # Page Object Model classes and actions
fixtures/             # Reusable Playwright fixtures
utils/                # Shared helpers, constants, and test data
locators/             # Centralized element locator definitions
config/               # Environment-specific configuration
test-data/            # External JSON/CSV test data
reports/              # Generated HTML and JSON reports
test-results/         # Failure context and trace artifacts
docs/                 # QA documentation set
playwright.config.ts  # Playwright runner configuration
```

## Prerequisites
- Node.js 20 or newer recommended
- npm
- Access to the SauceDemo URL, or a compatible `BASE_URL`

## Installation
Install dependencies and browser binaries:

```bash
npm install
npx playwright install chromium
```

## Configuration
The default base URL is `https://www.saucedemo.com/`. Override it with a `.env` file or an environment variable:

```text
BASE_URL=https://www.saucedemo.com/
SAUCEDEMO_USERNAME=standard_user
SAUCEDEMO_PASSWORD=secret_sauce
```

Credentials are read by `config/env.ts`; do not commit real credentials or secrets.

## Running Tests
Run all tests:

```bash
npx playwright test
```

Run a feature or file:

```bash
npm test -- "tests/Functional Testing/Checkout"
npx playwright test "tests/Functional Testing/LoginPage/login.spec.ts"
```

Run with the browser visible:

```bash
npx playwright test --headed
```

List discovered tests without executing them:

```bash
npx playwright test --list
```

## Reports and Artifacts
The configured reporters write an HTML report to `reports/` and machine-readable results to `reports/test-results.json`. Screenshots are captured only on failure, and traces are captured on the first retry.

```bash
npx playwright show-report reports
```

For a specific trace:

```bash
npx playwright show-trace test-results/<test-directory>/trace.zip
```

## Run Intelligence Dashboard
The dashboard is a persistent local view over the latest Playwright artifacts. Start it once:

```bash
npm run dashboard
```

Then open http://localhost:4173. Run tests in another terminal as usual:

```bash
npm test
```

`npm test` also opens the dashboard automatically when the run finishes. A folder or individual test can be passed through the same command:

```bash
npm test -- "tests/Functional Testing/Checkout"
npm test -- "tests/Functional Testing/Checkout/Verify_Checkout_Workflow.spec.ts"
```

The dashboard server is started automatically if it is not already running. You can also start it independently with `npm run dashboard` and leave it open while running tests.

Playwright writes machine-readable results to `reports/test-results.json`. The dashboard refreshes automatically every 15 seconds, or immediately with the refresh button, and links failed tests to their screenshot, context log, and trace when available. The performance test also records its DOM-content-loaded measurement and budget for the performance chart.

## Screenshots
Screenshots are captured automatically for failed or relevant test steps and can be reviewed in the test results directory.

## Trace Viewer
Use Playwright Trace Viewer to inspect executions:

```bash
npx playwright show-trace test-results/<trace-file>/trace.zip
```

## CI Readiness
The suite can run in CI with `npx playwright test`. A pipeline should install dependencies and Chromium, provide `BASE_URL` when required, publish `reports/` and `test-results/` as artifacts, and retain the HTML report for failed runs.

## Documentation Links
- [docs/Test Plan.md](docs/Test%20Plan.md)
- [docs/Test Cases.md](docs/Test%20Cases.md)
- [docs/Traceability Matrix.md](docs/Traceability%20Matrix.md)
- [docs/Test Execution Report.md](docs/Test%20Execution%20Report.md)
- [docs/Bug Report.md](docs/Bug%20Report.md)
- [docs/Test Strategy.md](docs/Test%20Strategy.md)


