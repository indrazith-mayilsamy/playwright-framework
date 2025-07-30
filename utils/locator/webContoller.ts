import { Locator } from "@playwright/test";

export class WebController {
    controlLocator: Locator;
    locatorDescription: string | undefined;
    constructor(controlLocator: Locator, locatorDescription: string | undefined) {
        this.controlLocator = controlLocator;
        this.locatorDescription = locatorDescription;
    };
}