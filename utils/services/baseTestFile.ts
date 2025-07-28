import { Page, TestInfo } from "@playwright/test";
import { Logger } from "./logger";
import { Configuration } from "./configuration";



export class Base extends Logger {
    page: Page;
    constructor(page: Page) {
        super();
        this.page = page;
    };

    static setTestCaseID(testInfo: TestInfo) {
        Logger.info("");
        Logger.info(`======== Starting Execution For Test Case: '${testInfo.title}' ========`);
        Logger.info("");
    };

    static setTestCaseEnd(testInfo: TestInfo) {
        Logger.info("");
        Logger.info(`===== END Of Execution For Test Case: '${testInfo.title}'  With Test Result: '${testInfo.status?.toUpperCase()}' =====`);
        Logger.info("");
    };

    async initializeBrowser(url: string = Configuration.get("URL") || "", options: { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle', timeout?: number }) {
        try {
            await this.page.goto(url, {
                waitUntil: options.waitUntil || 'load',
                timeout: options.timeout || 60000 // 60 seconds
            });
            Logger.info(`Navigated to URL: ${url}`);
        } catch (error: any) {
            Logger.error(`Error during browser initialization: ${error.message}`);
            throw error;
        }
    };
};

