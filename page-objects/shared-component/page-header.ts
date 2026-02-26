import { Page } from "@playwright/test";
import { CustomLocator } from "@utils/custom-locator";
import { WebElements } from "@utils/web-elements";

export class PageHeader extends CustomLocator {
  constructor(page: Page) {
    super(page);
  }

  profileMenu = new WebElements(
    this.customLocator({
      type: "xpath",
      locator: "",
    }),
    "Profile Menu",
  );

  async clickProfile() {
    await this.customClick(this.profileMenu);
  }
}
