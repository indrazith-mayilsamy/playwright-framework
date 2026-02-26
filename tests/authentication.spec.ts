import { test, BrowserContext, Page } from "@playwright/test";
import { Configuration } from "@utils/env-configuration";
import { TestConfiguration } from "@utils/test-config";

export async function AuthenticationTest() {
  let context: BrowserContext;
  let page: Page;
  let base: TestConfiguration;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    base = new TestConfiguration(page);
    await base.gotoURL(Configuration.get("BASE_ADMIN_URL"));
  });

  test.describe("", { tag: ["@system", "@smoke"] }, async () => {
    test("Login", async () => {});
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });
}
