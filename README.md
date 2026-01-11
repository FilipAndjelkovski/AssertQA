# AssertQA - Automated Tests

This project contains automated tests for AssertQA practice pages, built with Cypress.

## Requirements

- Node.js (v14 or newer)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/FilipAndjelkovski/AssertQA.git
   cd AssertQA
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

### Run all tests (headless mode)
```bash
npx cypress run
```

### Run all tests (interactive mode)
```bash
npx cypress open
```

### Run a specific test file
```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
npx cypress run --spec "cypress/e2e/loading-animation.cy.js"
npx cypress run --spec "cypress/e2e/webtable.cy.js"
```

## Test Structure

- **login.cy.js** - Tests for the Login Form page (1 positive test, 8 negative tests)
- **loading-animation.cy.js** - Tests for the Loading Animation page
- **webtable.cy.js** - Tests for the Web Table page (filters employees and calculates salary sum)
