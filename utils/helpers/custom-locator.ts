import { expect, Locator, Page } from "@playwright/test";
import { Logger } from "./step-logger";
import { WebElements } from "./web-elements";

type LocatorOptions =
  | {
      type: "xpath" | "css" | "class" | "id";
      locator: string;
      index?: number;
    }
  | { type: "text"; text: string; exactMatch: boolean; index?: number }
  | { type: "label"; label: string; exactMatch: boolean; index?: number }
  | { type: "data-testid"; dataTestId: string; index?: number }
  | {
      type: "placeholder";
      placeHolder: string;
      exactMatch: boolean;
      index?: number;
    }
  | { type: "altText"; altText: string; exactMatch: boolean; index?: number }
  | { type: "title"; title: string; exactMatch: boolean; index?: number };

type waitOptions =
  | {
      state:
        | "visible"
        | "attached"
        | "detached"
        | "hidden"
        | "enabled"
        | "editable"
        | "disabled";
      element: WebElements;
      timeOut?: number;
    }
  | { state: "load" | "networkidle" | "domcontentloaded" }
  | { state: "timeout"; timeOut: number }
  | { state: "url"; url: string };

export class CustomLocator extends Logger {
  page: Page;
  timeOut = 10000;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  /* ---------------- LOCATOR CREATION ---------------- */

  protected customLocator(options: LocatorOptions): Locator {
    let element: Locator;
    switch (options.type) {
      case "class":
      case "css":
      case "xpath":
      case "id":
        element = this.page.locator(options.locator);
        break;
      case "text":
        element = this.page.getByText(options.text, {
          exact: options.exactMatch,
        });
        break;
      case "label":
        element = this.page.getByLabel(options.label, {
          exact: options.exactMatch,
        });
        break;
      case "data-testid":
        element = this.page.getByTestId(options.dataTestId);
        break;
      case "placeholder":
        element = this.page.getByPlaceholder(options.placeHolder, {
          exact: options.exactMatch,
        });
        break;
      case "altText":
        element = this.page.getByAltText(options.altText, {
          exact: options.exactMatch,
        });
        break;
      case "title":
        element = this.page.getByTitle(options.title, {
          exact: options.exactMatch,
        });
        break;
      default:
        throw new Error("Unknown locator type");
    }

    element = options.index ? element.nth(options.index) : element.first();
    return element;
  }

  /* ---------------- WAIT HANDLING ---------------- */

  protected async customWait(options: waitOptions, log: "Y" | "N" = "Y") {
    const timeOut = this.timeOut;
    try {
      switch (options.state) {
        case "visible":
        case "attached":
        case "detached":
        case "hidden":
          await this.handleState(options.element, options.state);
          break;
        case "enabled":
          await expect(options.element.locator).toBeEnabled({
            timeout: timeOut,
          });
          break;
        case "editable":
          await expect(options.element.locator).toBeEditable({
            timeout: timeOut,
          });
          break;
        case "disabled":
          await expect(options.element.locator).toBeDisabled({
            timeout: timeOut,
          });
          break;
        case "load":
        case "networkidle":
        case "domcontentloaded":
          await this.page.waitForLoadState(options.state, { timeout: timeOut });
          break;
        case "timeout":
          await this.page.waitForTimeout(options.timeOut);
          break;
        case "url":
          await this.page.waitForURL(options.url, { timeout: timeOut });
          break;
        default:
          Logger.error(`Invalid wait state`);
      }
    } catch (error) {
      if (log === "Y") {
        Logger.error(`Error on the wait function \n ${error}`);
      }
    }
  }

  /* ---------------- TEXT INPUT ---------------- */

  protected async customFill(
    element: WebElements,
    text: string,
    options: {
      type?: "text" | "password";
      clearFirst?: Boolean;
      retry?: number;
      timeOut?: number;
    } = {},
  ) {
    const {
      type = "text",
      clearFirst = true,
      retry = 3,
      timeOut = this.timeOut,
    } = options;

    const logValue = type === "password" ? "******" : text;

    for (let attempt = 1; attempt <= retry; attempt++) {
      try {
        await this.customScroll(element, "field");
        await this.customWait(
          {
            element: element,
            state: "visible",
            timeOut: timeOut,
          },
          "N",
        );
        await this.customWait(
          {
            element: element,
            state: "editable",
            timeOut: timeOut,
          },
          "N",
        );

        if (clearFirst) await element.locator.fill("");
        await element.locator.fill(text);
        Logger.info(
          `ACTION: Entered "${logValue}" in the "${element.locatorDescription}" field`,
        );
        return;
      } catch (error: any) {
        if (attempt === retry) {
          Logger.error(
            `Unable to enter "${logValue}" to the "${element.locatorDescription}" field because of\n ${error}`,
          );
        }
      }
    }
  }

  protected async customPress(
    element: WebElements,
    text: string,
    options: {
      delay?: number;
      retry?: number;
      timeOut?: number;
      clearFirst?: Boolean;
    } = {},
  ) {
    const {
      delay = 100,
      retry = 3,
      timeOut = this.timeOut,
      clearFirst = true,
    } = options;
    for (let attempt = 1; attempt <= retry; attempt++) {
      try {
        await this.customScroll(element, "button");
        await this.customWait(
          {
            element: element,
            state: "visible",
            timeOut: timeOut,
          },
          "N",
        );
        await this.customWait(
          {
            element: element,
            state: "editable",
            timeOut: timeOut,
          },
          "N",
        );
        if (clearFirst) await element.locator.clear();
        await element.locator.pressSequentially(text, { delay: delay });
        Logger.info(
          `Action: Entered the "${text}" in the "${element.locatorDescription}" field`,
        );
        return;
      } catch (error) {
        if (attempt === retry) {
          Logger.error(
            `Unable to fill the text to the "${element.locatorDescription}" because of \n ${error}`,
          );
        }
      }
    }
  }

  /* ---------------- CLICK ---------------- */

  protected async customClick(
    element: WebElements,
    options: {
      retry?: number;
      timeOut?: number;
      delay?: number;
      button?: "Y" | "N";
    } = {},
  ) {
    const {
      retry = 3,
      timeOut = this.timeOut,
      delay = 1,
      button = "Y",
    } = options;
    const clickableText =
      button === "Y" ? "button" : button === "N" ? "module" : "";
    for (let i = 1; i <= retry; i++) {
      try {
        await this.customScroll(
          element,
          button === "Y" ? "button" : button === "N" ? "module" : "",
        );
        await this.customWait(
          {
            element: element,
            timeOut: timeOut,
            state: "visible",
          },
          "N",
        );
        await this.customWait(
          {
            element: element,
            timeOut: timeOut,
            state: "enabled",
          },
          "N",
        );
        await element.locator.click({ timeout: timeOut, delay: delay });
        Logger.info(
          `Action: Clicked the "${element.locatorDescription}" ${clickableText}`,
        );
        return;
      } catch (error) {
        if (i === retry) {
          Logger.error(
            `Unable to click the "${element.locatorDescription}" ${clickableText} \n ${error}`,
          );
        }
      }
    }
  }

  /* ---------------- DROPDOWN ---------------- */

  protected async customSelect(
    fieldElement: WebElements,
    dropdownElement: WebElements,
    options: { timeOut?: number; delay?: number } = {},
  ) {
    const { delay = 100, timeOut = this.timeOut } = options;
    if (!dropdownElement.locatorDescription) return;
    try {
      const dropdownLocator = dropdownElement.locator;
      for (let i = 0; i <= 3; i++) {
        await this.customClick(fieldElement, {
          delay: delay,
          timeOut: timeOut,
        });
        await this.customWait(
          { state: "visible", element: dropdownElement, timeOut: 300 },
          "N",
        );
        if (await dropdownLocator.isVisible()) break;
      }
      await this.customClick(dropdownElement, { timeOut: timeOut });
      Logger.info(
        `Action: Selected the "${dropdownElement.locatorDescription}" in the "${fieldElement.locatorDescription}" field`,
      );
    } catch (error) {
      Logger.error(
        `Unable to select the "${dropdownElement.locatorDescription}" in the "${fieldElement.locatorDescription}" field \n ${error}`,
      );
    }
  }

  /* ---------------- GET TEXT ---------------- */

  protected async getText(element: WebElements): Promise<string | undefined> {
    try {
      const text: string | null = await element.locator.innerText();
      Logger.info(
        `Action: Retrived "${text}" from "${element.locatorDescription}"`,
      );
      return text ?? "";
    } catch (error) {
      Logger.error(
        `Unable to fetch the text from "${element.locatorDescription}" \n ${error}`,
      );
    }
  }

  /* ---------------- SCROLL ---------------- */

  protected async customScroll(
    element: WebElements,
    scrollTo?: "field" | "button" | "page" | "module" | "",
  ) {
    let value = scrollTo ?? "";
    try {
      await element.locator.scrollIntoViewIfNeeded({ timeout: this.timeOut });
      Logger.info(
        `Action: Scrolled to the "${element.locatorDescription}" ${value}`,
      );
    } catch (error) {
      Logger.error(
        `Unable to scroll to the "${element.locatorDescription} ${value}" \n ${error}`,
      );
    }
  }

  /* ---------------- CHECK BOX ---------------- */

  protected async customCheck(element: WebElements) {
    try {
      if (!element.locatorDescription) return;
      await element.locator.check();
      Logger.info(`Action: Checked the ${element.locatorDescription}`);
    } catch (error) {
      Logger.error(
        `Unable to check the "${element.locatorDescription}" \n ${error}`,
      );
    }
  }

  async customAssert(options: {
    element: WebElements;
    state:
      | "editable"
      | "disabled"
      | "checked"
      | "enabled"
      | "attached"
      | "visible"
      | "hidden";
    timeout?: number;
  }) {
    const element = options.element;
    const timeOut = options.timeout ?? this.timeOut;
    try {
      switch (options.state) {
        case "disabled":
          await expect(element.locator).toBeDisabled({ timeout: timeOut });
          break;
        case "checked":
          await expect(element.locator).toBeChecked({ timeout: timeOut });
          break;
        case "editable":
          await expect(element.locator).toBeEditable({ timeout: timeOut });
          break;
        case "enabled":
          await expect(element.locator).toBeEnabled({ timeout: timeOut });
          break;
        case "attached":
          await expect(element.locator).toBeAttached({ timeout: timeOut });
          break;
        case "hidden":
          await expect(element.locator).toBeHidden({ timeout: timeOut });
          break;
        case "visible":
          await expect(element.locator).toBeVisible({ timeout: timeOut });
          break;
        default:
          throw new Error("No state is provided ");
      }
    } catch (error: any) {
      Logger.error(`Assertion Failed because of \n ${error}`);
    }
  }

  /* ---------------- TEXT VERIFICATION ---------------- */

  protected async verifyText(element: WebElements, expectedText: string) {
    let actualText: string | null = null;
    try {
      await element.locator.waitFor({ state: "visible", timeout: this.timeOut });
      actualText = await element.locator.last().innerText({ timeout: this.timeOut });
      await expect(element.locator.last()).toContainText(expectedText, {
        timeout: this.timeOut,
      });
      Logger.info(
        `Verification: Actual value: "${actualText}" matched with the Expected value: "${expectedText}"`,
      );
    } catch (error) {
      Logger.error(
        `Actual value: "${actualText}" mismatched with Expected value: "${expectedText}"`,
      );
    }
  }

  /* ---------------- FILE UPLOAD ---------------- */

  protected async attachFiles(
    element: WebElements,
    filePath: string,
    options: { retry?: number; delay?: number; timeOut?: number } = {},
  ) {
    const { retry = 3, delay = 100, timeOut = this.timeOut } = options;
    for (let i = 1; i <= retry; i++) {
      try {
        await element.locator.setInputFiles([]);
        if (!filePath) return "";
        const files = filePath.split(",");
        await element.locator.setInputFiles(files);
        Logger.info(
          `Uploaded "${files}" to the "${element.locatorDescription}" field`,
        );
        return;
      } catch (error) {
        if (i === retry)
          Logger.error(
            `Unable to attach file to the "${element.locatorDescription}" because of \n ${error}`,
          );
      }
    }
  }

  /* ---------------- WAIT MECHANISM ---------------- */
  private async handleState(
    element: WebElements,
    state: "detached" | "hidden" | "visible" | "attached",
    timeOut: number = this.timeOut,
  ) {
    try {
      await element.locator.waitFor({ state: state, timeout: timeOut });
    } catch (error) {
      Logger.error(
        `Error waiting for the element with locator "${element.locatorDescription}" : \n ${error}`,
      );
    }
  }
}
