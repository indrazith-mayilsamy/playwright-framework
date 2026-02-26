import { Locator } from "@playwright/test";

export class WebElements {
  locator: Locator;
  locatorDescription: string;
  constructor(locator: Locator, locatorDescription: string) {
    (this.locator = locator), (this.locatorDescription = locatorDescription);
  }
}
