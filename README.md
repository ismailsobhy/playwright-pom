# Playwright Project

Welcome to the Playwright project! This README file will guide you through the setup and usage of this TypeScript project.

# Installation

Clone the project

```
git clone https://github.com/ismailsobhy/playwright-pom.git
```

from root path project run this

```
npm install
```

# Usage

run this command to be able to run the testcases if you want headed mode and chromium browser

```
 npx playwright test --headed --project=chromium
```

run this command to be able to run the testcases if you want headless mode and chromium brwoser

```
 npx playwright test --project=chromium
```

You can also show the report with:

```
npx playwright show-report
```

# Project structure

Project Structure and Code reusability (including POM) for the following pages:

```
cartpage.ts     homepage.ts     paymentpage.ts  productpage.ts
```

Data is stored at `test-data/data.json`

The testcase as requested `tests/test.spec.ts`
