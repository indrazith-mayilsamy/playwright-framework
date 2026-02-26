# 🎭 Playwright Framework Guide

## 📌 Introduction

### 📖 Purpose
This document provides a comprehensive guide to implementing a **customized Playwright automation framework** for end-to-end testing of modern web applications.  
The framework is built with **TypeScript** and adheres to **industry best practices**, ensuring:

- ✅ Modularity  
- ✅ Reusability  
- ✅ Scalability  
- ✅ Ease of maintenance  

---

### ❓ What is Playwright?

[Playwright](https://playwright.dev/) is a **Node.js** library developed by **Microsoft** for automated browser testing.

It supports testing across:
- Chromium
- Firefox
- WebKit

With powerful features like:
- Multiple tabs and iframes
- Mobile emulation
- Network interception
- Headless or headed execution
- Cross-platform support

---

### 🧱 Why a Custom Framework?

While Playwright provides a solid test runner (`@playwright/test`), a **custom automation framework** adds robust layers of structure and scalability:

- 🔹 **Page Object Model (POM)** for better abstraction
- 🔹 **Test data management** (JSON, Excel)
- 🔹 **Environment configuration** (QA, Staging, Production)
- 🔹 **Reusable utilities** and helper functions
- 🔹 **Enhanced logging** and reporting
- 🔹 **Scalability** for large teams and projects

---

## 🚀 Key Features

- ✅ Built with **TypeScript**
- ✅ **Page Object Model (POM)** architecture
- ✅ Structured and modular **directory layout**
- ✅ **Data-driven testing** (via JSON, Excel, etc.)
- ✅ Supports **multi-environment execution**
- ✅ Rich **HTML and JSON** reporting
- ✅ **CI/CD integration ready**
- ✅ Team collaboration friendly design

---

## 🏗️ Framework Architecture Overview

### 🎯 Objective
This section outlines the **internal structure and component relationships** of the custom Playwright framework. The architecture follows a layered design to promote:

- Clean separation of concerns  
- Ease of maintenance  
- Reusability  
- Scalability for large teams or multiple projects  

---

### 🧩 Architectural Layers

| Layer                 | Purpose                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Test Scripts**      | Modular and readable test cases using Playwright’s built-in runner (`test()`). Focuses on feature or workflow validation. |
| **Page Objects**      | Encapsulates locators and UI actions per page. Promotes abstraction and clarity.                                          |
| **Fixtures**          | Reusable setup/teardown logic (browser, context, data). Includes `global-setup.ts` & `global-teardown.ts`.                |
| **Configuration**     | Environment-based settings like URLs, credentials, browser options.                                                       |
| **Test Data**         | JSON/Excel files for data-driven testing and input reuse.                                                                 |
| **Utilities**         | Common functions for logging, waits, date formats, Excel parsing, etc.                                                    |
| **Reporting**         | Generates rich HTML/JSON reports after execution.                                                                         |
| **CI/CD Integration** | Enables automated execution in CI tools like GitHub Actions, Jenkins, GitLab.                                             |

---

## 🔁 Execution Flow

1. Test begins via `.spec.ts` files using `test()` syntax.
2. **Fixtures** initialize browser, context, and login/test data.
3. **Page Object methods** perform UI interactions.
4. **Test inputs** are loaded from JSON or Excel sources.
5. **Assertions** validate the expected outcomes.
6. Upon completion, reports (HTML/JSON) are automatically generated.

---

## 📊 Visual Workflow

```text
.spec.ts ➜ fixtures setup ➜ page object methods ➜ test data input ➜ assertions ➜ reports

```
---

## 🧠 Key Benefits of the Architecture

- ✅ **Clean separation** of logic and responsibilities  
- ✅ **Scalable** for small and large projects  
- ✅ **Promotes reusability** (e.g., login flows, form handling)  
- ✅ **Easier onboarding** for new contributors  
- ✅ **Dynamic test execution** across different environments and browsers  

---

## 🚀 Installation and Setup

This section explains how to set up and start using the existing Playwright framework.

---

### 🔧 Prerequisites

Refer to the official [Playwright Installation Guide](https://playwright.dev/docs/intro) for detailed instructions.

| Tool    | Version        | Command to Verify |
| ------- | -------------- | ----------------- |
| Node.js | v16 or higher  | `node -v`         |
| pnpm    | Latest version | `pnpm -v`         |
| VS Code | Recommended    | N/A               |

---

### 📦 Step-by-Step Setup

#### 1. Install Project Dependencies

Run the following command to install all dependencies listed in `package.json`:

```bash
pnpm install
```
---

## 📁 Project Folder Structure

This structure represents a well-organized and scalable Playwright automation framework using **TypeScript**, **Page Object Model (POM)**, and **`.env`-based configuration**.

```bash
Playwright-framework/
├── data/
│   ├── run-time/
│   │   └── example.json
│   └── test-data/
│       └── example.xlsx
├── utils/
│   ├── services/
│   │   ├── commonHelpers.ts
│   │   ├── logger.ts
│   │   ├── configuration.ts
│   │   └── baseTestPage.ts
│   ├── constants/
│   │   ├── en/
│   │   │   └── example.tsx
│   │   └── fr/
│   │       └── example.tsx
│   └── locators/
│       ├── webActions.ts
│       ├── webAssertion.ts
│       └── webController.ts
├── fixtures/
│   ├── global-setup.ts
│   └── global-teardown.ts
├── page-objects/
│   ├── module-1/
│   │   └── file-1.ts
│   ├── module-2/
│   │   └── file-2.ts
│   └── basePage.ts
├── tests/
│   ├── testsOrder/
│   │   ├── sat.list.ts
│   │   └── uat.list.ts
│   ├── SAT/
│   │   └── example.spec.ts
│   └── UAT/
│       └── example.spec.ts
├── execution-log/
│   └── test-steps.logs
├── test-results/
│   ├── testResults.html
│   └── testResults.json
├── .env
├── .env.example
├── package.json
├── playwright.config.ts
└── tsconfig.json
```
---

### 📄 Folder and File Descriptions

| **Folder/File**        | **Purpose**                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `data/`                | Holds all external test data (static or dynamic). Useful for DDT (Data-Driven Testing).      |
| `utils/`               | Utility classes and common functions like logging, waits, language files, and Excel parsing. |
| `fixtures/`            | Custom fixtures for shared setup/teardown logic and dependency injection.                    |
| `page-objects/`        | Implements POM: one class per UI Page/Component.                                             |
| `tests/`               | Holds Playwright `.spec.ts` test files grouped by features and modules.                      |
| `execution-log/`       | Holds the test steps logged during execution.                                                |
| `test-results/`        | Auto-generated test execution results (HTML/JSON).                                           |
| `.env`                 | Actual environment variables (not committed to Git).                                         |
| `.env.example`         | Template for `.env` — shared safely with team members.                                       |
| `playwright.config.ts` | Defines global settings: reporters, browsers, timeouts, base URL, etc.                       |
| `tsconfig.json`        | TypeScript configuration used across the project.                                            |
| `package.json`         | Manages project scripts and dependencies.                                                    |

---

## ⚙️ Configuration Management

This Playwright framework uses a **single configuration file** (`playwright.config.ts`) and leverages environment variables defined in a `.env` file to manage dynamic values like:

- Base URL  
- Credentials  
- API Keys  
- Browser selection  
- Execution mode (headed/headless)

---

### 🔐 .env File Example

```env
BASE_URL=https://qa.example.com
USERNAME=testuser
PASSWORD=qaPass123
API_KEY=abc123xyz
BROWSER=chromium
```
---

### 🛠️ `playwright.config.ts`

This file contains the centralized configuration for the Playwright test framework, enabling cross-environment support, dynamic browser handling, test retries, and rich reporting.

---

#### ✅ Imports and Environment Setup

```ts
import { defineConfig, PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
```
#### 📘 Explanation of Imports

- **`defineConfig`**: Simplifies Playwright configuration setup with IntelliSense support and schema validation.
- **`dotenv`**: Loads environment variables from the `.env` file so that values like `BASE_URL`, `USERNAME`, and `BROWSER` can be configured externally.
- **`path`**: Helps resolve file and folder paths in a cross-platform way (Windows, macOS, Linux).

---

### 🖥️ Runtime Browser & Headed Mode Detection

The following logic in `playwright.config.ts` enables flexible test execution in both headless and headed modes, across different browsers.

```ts
const isHeaded = process.argv.includes('--headed');

const browsers: string[] = process.env.BROWSER
  ? [process.env.BROWSER]
  : ['chromium', 'firefox', 'webkit'];
```
#### 📘 Explanation of Imports

- **`isHeaded`**: Enables headed mode if you run with –headed flag.
- **`browsers`**: Allows dynamic selection of browsers using .env, default to all three major ones (chromium, firefox, webkit) if not specified.

---

### ⚙️ Base Configuration Object

The core configuration is defined using `defineConfig()` which helps control global test behavior such as timeouts, test directory, retry logic, and reporter format.

```ts
export default defineConfig({
  timeout: 150000,
  testDir: path.join(process.cwd(), 'tests/testsOrder'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
});
```
---

#### 🧾 Key Configuration Options

| **Field**       | **Purpose**                                                                       |
| --------------- | --------------------------------------------------------------------------------- |
| `timeout`       | Maximum time per test (150 seconds).                                              |
| `testDir`       | Location of test files.                                                           |
| `fullyParallel` | Runs tests in parallel to speed up execution.                                     |
| `forbidOnly`    | Prevents accidental commits with `.only` in test cases (especially useful in CI). |
| `retries`       | Retries failed tests automatically (enabled only in CI).                          |
| `workers`       | Limits concurrency to 1 worker when running in CI.                                |
| `reporter`      | Generates an HTML report after test execution.                                    |


---

### 🌐 Global Test Settings – `use` block

The `use` block in `playwright.config.ts` defines settings that apply to **all tests**, such as base URL, video recording, trace collection, and session state handling.

```ts
use: {
  baseURL: process.env.BASEURL,
  video: 'retain-on-failure',
  screenshot: 'only-on-failure',
  trace: 'on-first-retry',
  headless: isHeaded,
  storageState: path.join(process.cwd(), "state.json")
}
```

This options apply to all tests:

| **Option**     | **Purpose**                                                                |
| -------------- | -------------------------------------------------------------------------- |
| `baseURL`      | Default base URL for `page.goto("/")`.                                     |
| `video`        | Captures video **only if** the test fails.                                 |
| `screenshot`   | Captures screenshot **only on failure**.                                   |
| `trace`        | Collects trace data on **first retry** to help with debugging.             |
| `headless`     | Disables UI unless `--headed` is passed; runs in headless mode by default. |
| `storageState` | Loads saved login/session state from `state.json` file.                    |

---

### 🧪 Browser Project Configuration

This section dynamically creates test projects for different environments (like SAT and UAT) across one or more browsers defined in the `.env` file.

```ts
projects: [
  ...browsers.map((browser) => ({
    name: "SAT",
    use: { browserName: browser },
    testMatch: "sat.list.ts"
  })),
  ...browsers.map((browser) => ({
    name: "UAT",
    use: { browserName: browser },
    testMatch: "uat.list.ts"
  }))
] as PlaywrightTestConfig['projects'];

```

This configuration dynamically creates **multiple test projects**, one for each browser (like `chromium`, `firefox`, and `webkit`), and binds them to environment-specific test suites.

#### 🧪 Project Mapping

| **Project Name** | **Browsers Used**   | **Test File** |
| ---------------- | ------------------- | ------------- |
| `SAT`            | All in `browsers[]` | `sat.list.ts` |
| `UAT`            | All in `browsers[]` | `uat.list.ts` |

---

#### 🔧 Browser Selection via `.env`

You can control which browser(s) to run using the `.env` file:

```env
# Run only on Chromium
BROWSER=chromium
```

---

### 🧰 `utils/` Folder

The `utils/` folder serves as the **backbone of shared resources and abstraction** in the Playwright framework. It contains utility functions, configuration handlers, reusable selectors, and static constants that are used across the entire test suite to promote DRY (Don't Repeat Yourself) principles.


#### 📁 Folder Overview

| **Subfolder** | **Purpose**                                                                                                                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `services/`   | Contains reusable helper logic such as: logging (`logger.ts`), configuration handler (`configuration.ts`), common methods (`commonHelpers.ts`), and shared base test setup (`baseTestPage.ts`).                                 |
| `constants/`  | Houses static text or language-based constants (e.g., `en/example.tsx`, `fr/example.tsx`) for localization or dynamic validation.                                                                                               |
| `locators/`   | Encapsulates UI-level interactions and element definitions, including: `webActions.ts`, `webAssertion.ts`, and `webController.ts`. These files abstract low-level selectors and allow scalable automation interaction patterns. |
---

✅ This modular utility structure enables:
- Better maintainability and readability.
- Centralized changes for reusable functions and selectors.
- Seamless collaboration across teams and modules.
---

#### 🔧 `services/` – Core Logic & Automation Helpers

This folder holds the core utility classes that power the framework’s automation flow.

Each file serves a foundational role in abstracting repeatable logic and improving test readability and scalability.

| **File**           | **Purpose**                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `commonHelpers.ts` | Contains utility methods used across tests (e.g., formatting, delays).                       |
| `logger.ts`        | Custom logging utility to log actions, errors, and statuses to log files.                    |
| `configuration.ts` | Reads environment variables and exposes config values like `baseURL`, credentials, etc.      |
| `baseTestPage.ts`  | Serves as a base class that all page objects extend to inherit common methods like `goto()`. |

---

##### 📌 Purpose
The `services/` folder contains **functional logic and core reusable components** that drive your automation framework. These are not specific to any single test but are shared across test cases, fixtures, and utilities.

##### 🧩 Common Responsibilities
- Centralized utilities (e.g., JSON/Excel handling, date or format validators)
- Framework extensions (e.g., base classes, enhanced page actions)
- Environment configuration management
- Logging and debugging support

##### 📁 Files and Example

###### 🗂️ `commonHelpers.ts`

A utility file inside `utils/services/` that provides **general-purpose helper functions** used throughout the framework for test data handling and validations.


📊 Summary Table

| Function Name                  | Purpose                                                | Returns       |
|-------------------------------|--------------------------------------------------------|---------------|
| `JSONWriter`                  | Write object to `.json` file                           | File path     |
| `JSONReader`                  | Read and parse `.json` file                            | Object/Array  |
| `excelReaderSingleSheet`     | Read one sheet from Excel                              | Array         |
| `excelReaderAllSheets`       | Read all sheets with custom headers                    | Object        |
| `emailVefification`          | Validate email address                                 | Boolean       |
| `toEnsureNoNumberAndSpecialChar` | Check for disallowed characters                     | Boolean       |
| `convertStringToArray`       | Convert stringified array to JS array                  | Array         |
| `getLang`                     | Fetch i18n content from `.tsx` file                    | Object        |

---

###### 🧪  Function Documentation

- `JSONWriter`
Writes JSON data to a file in the specified directory.
```ts
await JSONWriter(data, "data", "path");
```

- `JSONReader`
Reads and parses JSON from a file.
```ts
const data = await JSONReader('path/to/example.json');
```

- `excelReaderSingleSheet`
Reads a single Excel sheet and maps rows to objects using a specific header row.
```ts
const data = await excelReaderSingleSheet('path/to/excel.xlsx', 'Sheet1', 2);
```

- `excelReaderAllSheets`
Reads all sheets in an Excel file with custom headers.
```ts
const data = await excelReaderAllSheets('path/to/excel.xlsx', {
  Sheet1: 1,
  Sheet2: 2
});
```

- `emailVefification`
Checks whether the email address is syntactically valid.
```ts
await emailVefification("test@email.com");
```

- `toEnsureNoNumberAndSpecialChar`
Ensures a string contains only alphabets, hyphen, underscore, or dot.
```ts
await toEnsureNoNumberAndSpecialChar("John-Doe");
```

- `convertStringToArray`
Converts a JSON-style string into an array.
```ts
const array = await convertStringToArray("[1, 2, 3]");
```

- `getLang`
Fetches locale-based constants from a `.tsx` file dynamically.
```ts
const value = await getLang('en', 'common');
```

---

###### 🗂️ `logger.ts` – Logging Utility

This utility provides structured logging functionality to record test steps, warnings, and errors into both file and console.

---

📊 Summary Table

| Function Name           | Purpose                                 | Returns |
|------------------------|-----------------------------------------|---------|
| `Logger.info`          | Write INFO log to console & file        | void    |
| `Logger.warn`          | Write WARN log to console & file        | void    |
| `Logger.error`         | Write ERROR log to console & file       | void    |
| `Logger.addLineBreaks` | Adds line breaks into the log file      | void    |

---

###### 🧪  Function Documentation

- `Logger.info`
Logs a message to the console and file with `INFO` level.
```ts
Logger.info("Test started");
```

- `Logger.warn`
Logs a message with `WARN` level.
```ts
Logger.warn("Optional value missing");
```

- `Logger.error`
Logs a message with `ERROR` level.
```ts
Logger.error("Login failed");
```

- `Logger.addLineBreaks`
Inserts line breaks into the log file.
```ts
Logger.addLineBreaks(2);
```

---

###### 🗂️ `configuration.ts` – Environment Management

Provides functionality to load and access environment-specific variables, such as test environment, credentials, and runtime values.

---

📊 Summary Table

| Property/Method         | Purpose                                           | Returns       |
|------------------------|---------------------------------------------------|---------------|
| `Configuration.environment`     | Get current environment                        | `string`      |
| `Configuration.emailReceivers`  | Get list of email receivers                    | `string`      |
| `Configuration.senderEmail`     | Get sender email address                       | `string`      |
| `Configuration.senderPassword`  | Get sender password                            | `string`      |
| `Configuration.get(key)`        | Get any env variable by key                    | `string?`     |
| `Configuration.set(key, val)`   | Set an env variable at runtime                | `void`        |
| `Configuration.loadEnvironmentVariables()` | Loads environment variables from `.env` file | `void`        |

---

###### 🧪  Function Documentation

- `Configuration.loadEnvironmentVariables()`
Loads variables from an environment-specific file such as `.env.uat` or fallback `.env`.
  - Uses `dotenv` to populate `process.env`.

---

- `Configuration.environment`
Returns the lowercase environment name currently active.

---

- `Configuration.emailReceivers`, `senderEmail`, `senderPassword`
Convenience accessors to pull credentials or receiver list from environment.

---

- `Configuration.get(key)`
Generic getter to access any env variable using its key.

---

- `Configuration.set(key, value)`
Sets a runtime variable to `process.env`.

---

###### 🗂️ `baseTestPage.ts` – Logging Utility

This file acts as a base test utility that initializes page navigation and captures test lifecycle logs.

---

📊 Summary Table

| Method                    | Purpose                                              | Returns |
|---------------------------|------------------------------------------------------|---------|
| `Base.setTestCaseID()`    | Log the start of a test case                         | void    |
| `Base.setTestCaseEnd()`   | Log the end of a test case with result status        | void    |
| `Base.initializeBrowser()`| Navigate to a given URL with wait and timeout config | void    |

---

###### 🧪  Function Documentation

- `Base.setTestCaseID(testInfo)`
Logs the start of a test case execution using the title.
  
```ts
Base.setTestCaseID(testInfo);
```

---

- `Base.setTestCaseEnd(testInfo)`
Logs the end of a test execution with status (e.g., PASSED, FAILED).
 
```ts
Base.setTestCaseEnd(testInfo);
```

---

- `Base.initializeBrowser(url, options)`
Navigates the Playwright `page` to a given URL.
  - Wait strategy and timeout can be customized.
  - Logs any navigation failures.
  
```ts
await base.initializeBrowser('https://example.com', { waitUntil: 'load' });
```
---

#### 🧾 `constants/` – Static Messages, Labels, and Config Text

The `constants/` folder contains **language-specific files** that store static content such as UI labels, error messages, validation texts, and configuration strings used throughout the framework. This helps in supporting **internationalization (i18n)** and centralizes text changes.

```bash
└── constants/
    ├── en/
    │   └── example.tsx
    └── fr/
        └── example.tsx
```

##### 📌 Purpose
This folder contains fixed/static values used in tests, such as:
- Button labels
- Page headers
- Tooltips
- Success/Error messages

These are especially useful for:
- Validating UI content
- Supporting multi-language/localized applications
- Keeping test scripts clean and readable

---

##### ✅ Common Use Cases

- Assertion of UI labels or notification messages  
  _e.g., expect(toastMessage).toContain(en.MESSAGES.SUCCESS_LOGIN);_
- Avoiding hardcoded strings directly inside test cases

- Enabling localization via subfolders (e.g., `en/`, `fr/`, etc.)

---

🧠 **Tip** - Organize constants by locale using subfolders:

🧪 **Example Usage** -  `constans/en/`

| **Filename**  | **Description**                                                                       |
| ------------- | ------------------------------------------------------------------------------------- |
| `login.tsx`   | Contains English strings related to the login page (titles, buttons, error messages). |
| `home.tsx`    | Contains English strings for the home/dashboard screen.                               |
| `example.tsx` | Sample structure for reference — demonstrates how constants can be grouped.           |

---

```ts
export default {
  LOGIN: {
    TITLE: "Welcome Back",
    BUTTON: "Sign In"
  }
}
```

#### 🎯 `locators/` – Centralized UI Element Selectors

```bash
└── locators/
   ├── webActions.ts
   ├── webAssertion.ts
   └── webController.ts
```

The `locators/` folder in the Playwright test framework is used to **abstract UI interactions and validations** into clean, reusable classes or functions. This modular approach ensures a clear separation of concerns and promotes reusability across tests.

- **Actions** (interacting with the UI: click, fill, select, etc.)
- **Assertions** (Validating UI behaviour: is displayed, has text, etc)

##### `webController.ts` - Locator Wrapper Object

###### 📌 Purpose

The framework encapsulates **Playwright’s native `Locator`** along with a **human-readable description** for each UI element. This abstraction pattern improves:

- **Traceability** in logs
- **Readability** in tests
- **Maintainability** as the application UI grows

---

###### ✨ Design Benefits

| Feature                          | Benefit                                                      |
| -------------------------------- | ------------------------------------------------------------ |
| `Playwright Locator`             | Reliable and precise element selection                       |
| `Human-readable description`     | Clear log messages, error tracking, and better documentation |
| `Combined in reusable functions` | Less duplication, improved consistency, better debugging     |

---

```ts
export class WebController {
    controlLocator: Locator;
    locatorDescription: string | undefined;
    constructor(controlLocator: Locator, locatorDescription: string | undefined) {
        this.controlLocator = controlLocator;
        this.locatorDescription = locatorDescription;
    };
}
```

🧪 **Example Usage**

```ts
const emailField = new WebController(page.locator('#email'), 'Email Input Field');
```

##### `webActions.ts` - UI interaction engine

###### 📌 Purpose

Encapsulates **reusable interaction logic** using Playwright’s API, enhanced with custom utilities and standardized error handling. This abstraction minimizes duplication and **centralizes** all common UI operations.

---

###### 🚀 Key Features

- Accepts a `webControl` object:  
  Combines a **locator** with a **human-readable description** for better logs.

- Wraps common UI actions:
  - `fillText`, `typeText`, `fillPassword`
  - `clickAction`
  - `selectValue`, `multiSelect`
  - `attachFiles`

- Built-in support for:
  - Custom **timeouts**  
  - **Wait strategies** (e.g., wait for visible, enabled)

- Integrated logging:
  - Uses `LogUtils` to print meaningful action logs  
  - Logs success or failure with the element's description

---

📊 Summary Table

| Method                 | Description                                       | Parameters                                              | Returns            |
|------------------------|---------------------------------------------------|----------------------------------------------------------|---------------------|
| `createLocator`        | Creates locator from string                       | `locator: string`                                       | Locator             |
| `waitFor`              | Waits for element state                          | `WebController`, `state`, `timeout?`                    | `Promise<void>`     |
| `typeText`             | Types text into field                            | `WebController`, `text`                                 | `Promise<void>`     |
| `typeTextWithDebounce`| Types with delay (autocomplete, live search)     | `WebController`, `text`, `delay?`                       | `Promise<void>`     |
| `getText`              | Gets element text                                | `WebController`                                         | `Promise<string>`   |
| `clickButton`          | Clicks an element                                | `WebController`                                         | `Promise<void>`     |
| `clickChekbox`         | Clicks checkbox                                  | `WebController`                                         | `Promise<void>`     |
| `clickRadioButton`     | Clicks radio button                              | `WebController`                                         | `Promise<void>`     |
| `selectOption`         | Selects dropdown value                           | `WebController`, `tag`, `value`, `isExactMatch?`        | `Promise<void>`     |
| `multiselectOption`    | Selects multiple dropdown values                 | `WebController`, `tag`, `values[]`, `isExactMatch?`     | `Promise<void>`     |
| `scrollToElement`      | Scrolls to element                               | `WebController`                                         | `Promise<void>`     |
| `waitForPageLoad`      | Waits for full page load                         | `timeout?`                                              | `Promise<void>`     |
| `waitForLoad`          | Waits for DOM + network to be idle               | None                                                    | `Promise<void>`     |
| `uploadFile`           | Uploads a file to input field                    | `WebController`, `filePath`                             | `Promise<void>`     |

---

###### 📘 Method List

- `createLocator`
Creates a reusable locator object using `page.locator(locator).first()`.
```ts
protected createLocator(locator: string) {
    return this.page.locator(locator).first();
}
```
**Example Usage**
```ts
const loginButton = this.createLocator(`button:has-text("Login")`);
```

---

- `waitFor`
Waits for an element to reach a specific state (`visible`, `hidden`, `attached`, or `detached`).
```ts
async waitFor(control: WebController, state: 'visible' | 'hidden' | 'attached' | 'detached', timeout: number = 10000)
```
**Example Usage**
```ts
await this.waitFor(new WebController(this.createLocator('login.btn'), 'Login Button'), 'visible');
```

---

- `typeText`
Fills input fields like text boxes.
```ts
async typeText(control: WebController, text: string)
```
**Example Usage**
```ts
await this.typeText(new WebController(this.createLocator('login.input'), 'Login Input'), 'testUser');
```

---

- `typeTextWithDebounce`
Same as `typeText`, but introduces a delay for debounce scenarios.
```ts
async typeTextWithDebounce(control: WebController, text: string, delay: number = 500)
```
**Example Usage**
```ts
await this.typeTextWithDebounce(new WebController(this.createLocator('login.input'), 'Login Input'), 'testUser', 300);
```

---

- `getText`
Extracts the `textContent` of an element.
```ts
async getText(control: WebController): Promise<string>
```
**Example Usage**
```ts
await this.getText(new WebController(this.createLocator('login.input'), 'Login Input'));
```

---

- `clickButton`
Clicks a button or other clickable element.
```ts
async clickButton(control: WebController)
```
**Example Usage**
```ts
await this.clickButton(new WebController(this.createLocator('login.btn'), 'Login Button'));
```

---

- `clickChekbox`
Clicks a checkbox element.
```ts
async clickChekbox(control: WebController)
```
**Example Usage**
```ts
await this.clickChekbox(new WebController(this.createLocator('login.checkbox'), 'Login Checkbox'));
```

---

- `clickRadioButton`
Clicks a radio button.
```ts
async clickRadioButton(control: WebController)
```
**Example Usage**
```ts
await this.clickRadioButton(new WebController(this.createLocator('login.radio'), 'Login radio button'));
```

---

- `selectOption`
Selects a single value from dropdown/combobox.
```ts
async selectOption(control: WebController, tag: string, value: string, isExactMatch: boolean = true)
```
**Example Usage**
```ts
await this.selectOption(new WebController(this.createLocator('login.select'), 'Login Select'),'li', 'option1');
```

---

- `multiselectOption`
Selects multiple values from a multiselect dropdown.
```ts
async multiselectOption(control: WebController, tag: string, values: string[], isExactMatch: boolean = true)
```
**Example Usage**
```ts
await this.multiselectOption(new WebController(this.createLocator('login.multiselect'), 'Login MultiSelect'), 'li', ['option1', 'option2']);
```

---

- `scrollToElement`
Scrolls to a specified web element.
```ts
async scrollToElement(control: WebController)
```
**Example Usage**
```ts
await this.scrollToElement(new WebController(this.createLocator('login.scroll'), 'Login Scroll Element'));
```

---

- `waitForPageLoad`
Waits for the full page load event.
```ts
async waitForPageLoad(timeout: number = 60000)
```
**Example Usage**
```ts
await this.waitForPageLoad();
```

---

- `waitForLoad`
Waits for full page and network to settle.
```ts
async waitForLoad()
```
**Example Usage**
```ts
await this.waitForLoad();
```

---

- `uploadFile`
Uploads a file using either `setInputFiles` or `fileChooser`.
```ts
async uploadFile(control: WebController, filePath: string)
```
**Example Usage**
```ts
await this.uploadFile(new WebController(this.createLocator('login.fileInput'), 'Login File Input'), 'path/to/file.txt');
```

##### `webAssertions.ts` - UI Validation Layer

###### 📌 Purpose

This file **handles all types of element-level and page-level assertions** in a **centralized**, reusable, and readable format.

Instead of writing raw Playwright assertions in every test or page object, `webAssertions.ts` provides **wrapped verification methods** with built-in logging and better traceability.

---

###### 🚀 Key Features

- 🔁 **Inherits from `Actions`**
  - Combine interaction and assertion logic in one reusable object
  - Enables chaining of UI actions and validations when needed

- ✅ **Supported Validations**
  - `verifyURLContains()` – Confirms that the current URL includes expected path or query
  - `verifyElementVisible()` – Checks if the element is displayed in the viewport
  - `verifyElementEnabled()` / `verifyElementDisabled()` – Validates the interactivity state
  - `verifyDisplayedText()` – Compares the actual text with expected value

- 🧾 **Structured Log Output**
  - Clear, human-readable pass/fail logs
  - Includes:
    - Element description
    - Assertion type
    - Expected vs. Actual (when applicable)
  - Enhances traceability in large test suites or CI pipelines

---

📊 Summary Table

| **Function Name**            | **Purpose**                                      | **Returns**     |
|-----------------------------|--------------------------------------------------|-----------------|
| `assertElementVisible`      | Wait for visibility                              | `void / throws` |
| `assertElementNotVisible`   | Wait for hidden state                            | `void / throws` |
| `assertElementContainsText` | Check partial match on text                      | `void / throws` |
| `urlContains`               | Check if URL includes substring                  | `void / throws` |
| `verifyIsDisplayed`         | Check visibility state                           | `true / false`  |
| `verifyIsNotDisplayed`      | Check hidden state                               | `true / false`  |
| `verifyIsEnabled`           | Check enabled/disabled state                     | `true / false`  |
| `verifyIsHidden`            | Check hidden (DOM visibility)                    | `true / false`  |

---

###### 📘 Method List

This section documents the key reusable assertion methods used across test suites, all wrapped in `webAssertions.ts`.

---

- ✅ `assertElementVisible()`
Asserts that an element is visible on the page.

```ts
await this.assertElementVisible(
  new WebController(this.createLocator('login.visibleElement'), 'Visible Element')
);
```

```ts
/**
 * Asserts that an element is visible.
 * @param control - The WebController instance with locator and description.
 */
```

---

- 🚫 `assertElementNotVisible()`
Asserts that an element is hidden on the page.

```ts
await this.assertElementNotVisible(
  new WebController(this.createLocator('login.hiddenElement'), 'Hidden Element')
);
```

---

- 📄 `assertElementContainsText()`
Verifies if the element contains the expected substring.

```ts
await this.assertElementContainsText(
  new WebController(this.createLocator('login.textElement'), 'Text Element'),
  'Expected Text'
);
```

---

- 🌐 `urlContains()`
Checks whether the current page URL contains the specified substring.

```ts
await this.urlContains('https://example.com');
```

---

- 👁️ `verifyIsDisplayed()`
Checks if an element is currently visible.

```ts
await this.verifyIsDisplayed(
  new WebController(this.createLocator('login.displayedElement'), 'Displayed Element')
);
```

---

- 🙈 `verifyIsNotDisplayed()`
Checks if an element is hidden or not displayed.

```ts
await this.verifyIsNotDisplayed(
  new WebController(this.createLocator('login.notDisplayedElement'), 'Not Displayed Element')
);
```

---

- 🔓 `verifyIsEnabled()`
Checks whether the element is enabled or disabled.

```ts
await this.verifyIsEnabled(
  new WebController(this.createLocator('login.enabledElement'), 'Enabled Element')
);
```

---

- 🛑 `verifyIsHidden()`
Checks whether the element is hidden (not visible in the DOM).

```ts
await this.verifyIsHidden(
  new WebController(this.createLocator('login.hiddenElement'), 'Hidden Element')
);
```

---

##### How It Works with WebController

Using a smart abstraction via `WebController` which bundles:
- `controlLocator`: The actual Playwright locator
- `locatorDescription`: A human-readable name or label

This improves log clarity and traceability without duplicating selector logic throughout your test files.

---

##### Relationships with Page Objects

These `Actions` and `Assertions` classes are reusable within Page Object Models (POM) to:
- Reduce repetitive logic in page classes
- Keep page files lightweight and focused
- Maintain a single point of truth for interaction/assertion mechanics

---

##### Benefits of This Structure

| Benefit            | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| Reusability        | Shared methods across all test files and pages                              |
| Clean Separation   | Action and validation logic are modular and maintainable                    |
| Easier Debugging   | Centralized `Logger` reports every action and assertion failure             |
| Test Readability   | Descriptive methods like `verifyIsDisplayed()` improve test clarity         |
| Robustness         | Built-in try/catch and reliable Playwright API reduce test flakiness        |

---




🛠️ Built with ❤️ using Playwright + TypeScript
