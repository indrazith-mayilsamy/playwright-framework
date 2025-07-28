import { Base } from "../services/baseTestFile";
import { Logger } from "../services/logger";
import { WebController } from "../services/webContoller";

/**
 * Actions class for web elements, extending Base for common functionalities.   
 */

export class Actions extends Base {

    /** * Constructor for Actions class.
     * @param page The Playwright Page object.
     */
    protected createLocator(locator: string) {
        return this.page.locator(locator).first();
    }

    /**
     * Waits for an element to be in a specific state.
     * @param contrl The WebController instance containing the locator and description.
     * @param state  State to wait for (visible, hidden, attached, detached).
     * @param timeout Maximum time to wait for the element to be in the specified state.
     */
    async waitFor(contrl: WebController, state: 'visible' | 'hidden' | 'attached' | 'detached', timeout: number = 10000) {
        try {
            await contrl.controlLocator.waitFor({ state, timeout });
            Logger.info(`ACTION: Waited for element ${contrl.locatorDescription} to be ${state}`);
        } catch (error: any) {
            Logger.error(`Error waiting for element with locator '${contrl.locatorDescription}': ${error.message}`);
            throw error;
        };
    };

    /**
     * Types text into a web element.
     * @param contrl The WebController instance containing the locator and description.
     * @param text The text to type into the element.
     */
    async typeText(contrl: WebController, text: string) {
        try {
            await contrl.controlLocator.fill(text);
            Logger.info(`ACTION: Enter '${text}' into ${contrl.locatorDescription}`);
        } catch (error: any) {
            Logger.error(`Error typing text into element with locator '${contrl.locatorDescription}':   ${error.message}`);
            throw error;
        }
    };

    /**
     * Types text into a web element with a delay (debounce).
     * @param contrl The WebController instance containing the locator and description.
     * @param text The text to type into the element.
     * @param delay Delay in milliseconds before typing the text.
     */
    async typeTextWithDebounce(contrl: WebController, text: string, delay: number = 500) {
        try {
            await contrl.controlLocator.fill(text);
            Logger.info(`ACTION: Entered '${text}' into ${contrl.locatorDescription} with a delay of ${delay}ms`);
            await new Promise(resolve => setTimeout(resolve, delay));
        } catch (error: any) {
            Logger.error(`Error typing text into element with locator '${contrl.locatorDescription}':  ${error.message}`);
            throw error;
        }
    };

    /**
     * Retrieves the text content of a web element.
     * @param contrl The WebController instance containing the locator and description.
     * @returns The text content of the element.
     */
    async getText(contrl: WebController): Promise<string> {
        try {
            const text = await contrl.controlLocator.textContent();
            Logger.info(`ACTION: Retrieved text from ${contrl.locatorDescription}: ${text}`);
            return text || "";
        } catch (error: any) {
            Logger.error(`Error retrieving text from element with locator '${contrl.locatorDescription}':   ${error.message}`);
            throw error;
        }
    };

    /**
     * Clicks on a web element.
     * @param locator The locator of the element to click.
     */
    async clickButton(contrl: WebController) {
        try {
            await contrl.controlLocator.click();
            Logger.info(`ACTION: Clicked on ${contrl.locatorDescription}`);
        } catch (error: any) {
            Logger.error(`Error clicking on element with locator '${contrl.locatorDescription}': ${error.message}`);
            throw error;
        };
    };

    /**
     * Selects an option from a dropdown or multiselect element.
     * @param control The WebController instance containing the locator and description.
     * @param tag The HTML tag of the option to select (e.g., 'option', 'li').
     * @param value The value of the option to select.
     * @param isExactMatch Whether to match the option text exactly (default is true).
     */
    async selectOption(control: WebController, tag: string, value: string, isExactMatch: boolean = true) {
        try {
            await control.controlLocator.click();
            const xpath = isExactMatch ? `//${tag}[normalize-space(text())='${value}']` : `//${tag}[contains(normalize-space(text()), '${value}')]`;
            await this.page.mouse.move(0, 0)
            await this.page.locator(xpath).first().click();
            Logger.info(`ACTION: Selected option '${value}' in ${control.locatorDescription}`);
        } catch (error: any) {
            Logger.error(`Error selecting option in element with locator '${control.locatorDescription}': ${error.message}`);
            throw error;
        } finally {
            await this.page.keyboard.press('Escape');
        }
    };

    /**
     * Selects multiple options from a multiselect element.
     * @param control The WebController instance containing the locator and description.
     * @param tag The HTML tag of the option to select (e.g., 'option', 'li').
     * @param values An array of values to select.
     * @param isExactMatch Whether to match the option text exactly (default is true).
     */
    async multiselectOption(control: WebController, tag: string, values: string[], isExactMatch: boolean = true) {
        try {
            await control.controlLocator.click();
            for (const value of values) {
                const xpath = isExactMatch ? `//${tag}[normalize-space(text())='${value}']` : `//${tag}[contains(normalize-space(text()), '${value}')]`;
                await this.page.mouse.move(0, 0)
                await this.page.locator(xpath).first().click();
                Logger.info(`ACTION: Selected option '${value}' in ${control.locatorDescription}`);
            }
        } catch (error: any) {
            Logger.error(`Error selecting options in element with locator '${control.locatorDescription}': ${error.message}`);
            throw error;
        } finally {
            await this.page.keyboard.press('Escape')
        };
    };

    /**
     * Waits for the page to load completely.
     * @param timeout Maximum time to wait for the page to load (default is 60 seconds).
     */
    async waitForPageLoad(timeout: number = 60000) {
        try {
            await this.page.waitForLoadState('load', { timeout });
            Logger.info(`ACTION: Page loaded successfully within ${timeout}ms`);
        } catch (error: any) {
            Logger.error(`Error waiting for page load: ${error.message}`);
            throw error;
        }
    };

    /**
     * Waits for the page to be fully loaded, including network requests.
     */
    async waitForLoad() {
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('domcontentloaded');
    };

    /**
     * Uploads a file to a web element.
     * @param control The WebController instance containing the locator and description.
     * @param filePath The path to the file to upload.
     */
    async uploadFile(control: WebController, filePath: string) {
        try {
            const element = control.controlLocator;
            try {
                await element.setInputFiles(filePath);
                Logger.info(`ACTION: Uploaded file '${filePath}' to ${control.locatorDescription}`);
            } catch {
                const fileChooserPromise = this.page.waitForEvent('filechooser', { timeout: 5000 });
                await element.click();
                const fileChooser = await fileChooserPromise;
                await fileChooser.setFiles(filePath);
                Logger.info(`ACTION: Uploaded file '${filePath}' to ${control.locatorDescription} using file chooser`);
            }
        } catch (error: any) {
            Logger.error(`Error uploading file to element with locator '${control.locatorDescription}': ${error.message}`);
            throw error;
        }
    };
};