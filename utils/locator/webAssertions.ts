import { Page } from "@playwright/test";
import { Actions } from "./webActions";
import { Logger } from "../services/logger";
import { WebController } from "./webContoller";

/**
 * Assertions class for web elements, extending Actions for common actions.
 */
export class Assertions extends Actions {
    constructor(page: Page) {
        super(page);
    }

/**
 * Asserts that an element is visible.
 * @param control The WebController instance containing the locator and description.
 */
async assertElementVisible(control: WebController) {
    try {
        await control.controlLocator.waitFor({ state: 'visible' });
        Logger.info(`ASSERTION: Element ${control.locatorDescription} is visible`);
    } catch (error: any) {
        Logger.error(`Assertion failed for element with locator '${control.locatorDescription}': ${error.message}`);
        throw error;
    }
};

/**
 * Asserts that an element is not visible.
 * @param control The WebController instance containing the locator and description.
 */
async assertElementNotVisible(control: WebController) {
    try {
        await control.controlLocator.waitFor({ state: 'hidden' });
        Logger.info(`ASSERTION: Element ${control.locatorDescription} is not visible`);
    } catch (error: any) {
        Logger.error(`Assertion failed for element with locator '${control.locatorDescription}': ${error.message}`);
        throw error;
    }
};

/**
 * Asserts that an element contains specific text.
 * @param control The WebController instance containing the locator and description.
 * @param expectedText The text expected to be contained within the element.
 */
async assertElementContainsText(control: WebController, expectedText: string) {
    try {
        const textContent = await control.controlLocator.textContent();
        if (textContent && textContent.includes(expectedText)) {
            Logger.info(`ASSERTION: Element ${control.locatorDescription} contains text '${expectedText}'`);
        } else {
            throw new Error(`Element ${control.locatorDescription} does not contain expected text '${expectedText}'`);
        }
    } catch (error: any) {
        Logger.error(`Assertion failed for element with locator '${control.locatorDescription}': ${error.message}`);
        throw error;
    }
};

/**
 * Asserts that the current URL contains a specific string.
 * @param expectedUrl The string expected to be contained within the current URL.
 */
async urlContains(expectedUrl: string) {
    try {
        const currentUrl = this.page.url();
        if (currentUrl.includes(expectedUrl)) {
            Logger.info(`ASSERTION: Current URL contains '${expectedUrl}'`);
        } else {
            throw new Error(`Current URL does not contain expected string '${expectedUrl}'`);
        }
    } catch (error: any) {
        Logger.error(`Assertion failed for URL: ${error.message}`);
        throw error;
    }
}

/**
 * Verifies if an element is displayed or not.
 * @param control The WebController instance containing the locator and description.
 * @param expectedVisibility Expected visibility state of the element (true for visible, false for hidden).
 * @returns true if the element's visibility matches the expected state, false otherwise.
 */
async verifyIsDisplayed(control: WebController, expectedVisibility: boolean = true) {
    try {
        const isVisible = await control.controlLocator.isVisible();
        if (isVisible === expectedVisibility) {
            Logger.info(`ASSERTION: Element ${control.locatorDescription} is displayed`);
            return true;
        } else { return false; }
    } catch (error: any) {
        Logger.error(`Assertion failed for element with locator '${control.locatorDescription}': ${error.message}`);
        throw error;
    }
}

/**
 * Verifies if an element is not displayed.
 * @param control The WebController instance containing the locator and description.
 * @param expectedVisibility Expected visibility state of the element (false for not displayed).
 * @returns true if the element is not displayed, false otherwise.
 */
async verifyIsNotDisplayed(control: WebController, expectedVisibility: boolean = false) {
    try {
        const isVisible = await control.controlLocator.isVisible();
        if (isVisible === expectedVisibility) {
            Logger.info(`ASSERTION: Element ${control.locatorDescription} is not displayed`);
            return true;
        } else { return false; }
    } catch (error: any) {
        Logger.error(`Assertion failed for element with locator '${control.locatorDescription}': ${error.message}`);
        throw error;
    }
}

/**
 * Verifies if an element is enabled or disabled.
 * @param control The WebController instance containing the locator and description.
 * @param expectedState Expected state of the element (true for enabled, false for disabled).
 * @returns true if the element's state matches the expected state, false otherwise.
 */
async verifyIsEnabled(control: WebController, expectedState: boolean = true) {
    try {
        const isEnabled = await control.controlLocator.isEnabled();
        if (isEnabled === expectedState) {
            Logger.info(`ASSERTION: Element ${control.locatorDescription} is enabled`);
            return true;
        } else { return false; }
    } catch (error: any) {
        Logger.error(`Assertion failed for element with locator '${control.locatorDescription}': ${error.message}`);
        throw error;
    }
};

/**
 * Verifies if an element is hidden or visible.
 * @param control The WebController instance containing the locator and description.
 * @param expectedState Expected state of the element (true for hidden, false for visible).
 * @returns true if the element's visibility matches the expected state, false otherwise.
 */
async verifyIsHidden(control: WebController, expectedState: boolean = true) {
    try {
        const isHidden = await control.controlLocator.isHidden();
        if (isHidden === expectedState) {
            Logger.info(`ASSERTION: Element ${control.locatorDescription} is hidden`);
            return true;
        } else { return false; }
    } catch (error: any) {
        Logger.error(`Assertion failed for element with locator '${control.locatorDescription}': ${error.message}`);
        throw error;
    }
};
}