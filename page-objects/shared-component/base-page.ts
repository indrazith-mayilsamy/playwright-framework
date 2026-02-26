import { Page } from "@playwright/test";
import { WebElements } from "@utils/web-elements";
import { PageHeader } from "./page-header";
import { Configuration } from "@utils/env-configuration";

export class BasePage extends PageHeader {
  constructor(page: Page) {
    super(page);
  }

  /* ---------------- MODULES & SUB MODULES ---------------- */
  modules = {
    dashboard: this.createModuleLocators(""),
  };

  /* ---------------- BUTTONS ---------------- */

  buttons = {
    submit: this.createButtonLocators(""),
  };

  /* ---------------- FRAMES ---------------- */

  frame = {
    reCAPTCHA: new WebElements(
      this.customLocator({
        type: "xpath",
        locator: "//iframe[@title='reCAPTCHA']",
      }),
      "Recaptcha",
    ),
  };

  /* ---------------- TOAST MESSAGES ---------------- */

  toast = {
    title: new WebElements(
      this.customLocator({
        type: "xpath",
        locator: ``,
      }),
      "Toast Message",
    ),
    fieldError: new WebElements(
      this.customLocator({
        type: "xpath",
        locator: ``,
      }),
      "Field-wise error",
    ),
  };

  /* ---------------- GRAPHQL RESPONSE ---------------- */

  async waitForGraphQLResponse(queryName: string) {
    try {
      const response = await this.page.waitForResponse(
        async (response) => {
          if (!response.url().includes(Configuration.get("BASE_API_URL")))
            return false;

          const body = await response.json().catch(() => null);
          return body?.data?.[queryName];
        },
        { timeout: 10000 },
      );

      const json = await response.json();
      return json.data[queryName];
    } catch (error) {
      throw new Error(`Unable to fetch the response \n: ${error}`);
    }
  }

  /* ---------------- BUTTON LOCATOR ---------------- */

  createButtonLocators(buttonName: string, isExact: "Y" | "N" = "Y") {
    const locator =
      isExact === "Y"
        ? `//button[normalize-space()="${buttonName}"]`
        : `//button[contains(normalize-space(),"${buttonName}")]`;
    return new WebElements(
      this.customLocator({
        type: "xpath",
        locator: locator,
      }),
      buttonName,
    );
  }

  /* ---------------- LINK LOCATOR ---------------- */

  createLinkLocators(linkName: string) {
    return new WebElements(
      this.customLocator({
        type: "xpath",
        locator: `//a[normalize-space()="${linkName}"]`,
      }),
      linkName,
    );
  }

  /* ---------------- TEXT FIELD LOCATOR ---------------- */

  createTextFieldLocoators(fieldName: string) {
    return new WebElements(
      this.customLocator({
        type: "xpath",
        locator: ``,
      }),
      fieldName,
    );
  }

  /* ---------------- DROPDOWN FIELD LOCATOR ---------------- */

  createDropdownFieldLocators(fieldName: string, value: string) {
    return {
      dropdown: new WebElements(
        this.customLocator({
          type: "xpath",
          locator: ``,
        }),
        fieldName,
      ),

      option: new WebElements(
        this.customLocator({
          type: "xpath",
          locator: ``,
        }),
        value,
      ),
    };
  }

  /* ---------------- RADIO BUTTON FIELD LOCATOR ---------------- */

  createRadioButtonFieldLocators(fieldName: string, value: string) {
    return new WebElements(
      this.customLocator({
        type: "xpath",
        locator: ``,
      }),
      fieldName,
    );
  }

  /* ---------------- CHECKBOX FIELD LOCATOR ---------------- */

  createCheckBoxFieldLocators(fieldName: string) {
    return new WebElements(
      this.customLocator({
        type: "xpath",
        locator: ``,
      }),
      fieldName,
    );
  }

  /* ---------------- FILE UPLOAD FIELD LOCATOR ---------------- */

  createUploadFieldLocators(fieldName: string) {
    return new WebElements(
      this.customLocator({
        type: "xpath",
        locator: ``,
      }),
      fieldName,
    );
  }

  /* ---------------- MODULE LOCATOR ---------------- */

  createModuleLocators(moduleName: string) {
    return new WebElements(
      this.customLocator({
        type: "xpath",
        locator: ``,
      }),
      "",
    );
  }
}
