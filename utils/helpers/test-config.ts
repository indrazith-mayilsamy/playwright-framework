import { Page, TestInfo } from "@playwright/test";
import { Logger } from "./step-logger";

export class TestConfiguration extends Logger {
  page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  static setTestCaseID(testInfo: TestInfo) {
    Logger.info("");
    Logger.info(
      `==================== Starting execution for the test case ${testInfo.title} ====================`,
    );
    Logger.info("");
  }

  static setTestCaseStatus(testInfo: TestInfo) {
    Logger.info("");
    Logger.info(
      `==================== Starting execution for the test case ${testInfo.status} ====================`,
    );
    Logger.info("");
  }

  async gotoURL(
    url: string,
    timeOut: number = 10000,
    waitUntil: "load" | "domcontentloaded" | "networkidle" | "commit" = "load",
  ): Promise<void> {
    await this.safeAction(
      async () => {
        await this.page.goto(url, { timeout: timeOut, waitUntil: waitUntil });
      },
      `Action: Navigated to the: "${url}"`,
      `Unable to navigate to the "${url}" because of`,
    );
  }

  private async safeAction(
    action: () => Promise<void>,
    successMsg: string,
    errorMessage: string,
  ) {
    try {
      await action();
      Logger.info(successMsg);
    } catch (error: any) {
      Logger.error(`${errorMessage}\n:${error}`);
    }
  }
}
