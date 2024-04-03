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

To have data driven project, we have data is stored at `test-data/data.json` such as temperature limits, what items to select for moisturizers and sunscreens, and payment data.

The testcase as requested is in `tests/test.spec.ts`

# Docker

For using Docker locally, you will build the image:

```
docker build -t playwright-pom .
```

Run the container based on the previously built image

```
docker run playwright-pom
```

# Github actions

A Github action runs exists and uses docker within. The run is on three browsers and the report in the run shared as in https://github.com/ismailsobhy/playwright-pom/actions/runs/8545307433 and the report is retained for 15 days.
