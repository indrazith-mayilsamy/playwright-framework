import { WebController } from "../../utils/locator/webContoller";
import { base } from "../baseClass";



export class ExamplePage extends base {
    constructor(page: any) {
        super(page);
        this.page = page;
    }

    exampleLocator = new WebController(this.createLocator('example'), 'Example Module');

     async test() {
        await this.waitFor(this.exampleLocator, 'visible');
        await this.typeText(this.exampleLocator, 'testUser');
        await this.typeTextWithDebounce(this.exampleLocator, 'testUser', 300);
        await this.getText(this.exampleLocator);
        await this.clickButton(this.exampleLocator);
        await this.clickChekbox(this.exampleLocator);
        await this.clickRadioButton(this.exampleLocator);
        await this.selectOption(this.exampleLocator,'li', 'option1');
        await this.multiselectOption(this.exampleLocator, 'li', ['option1', 'option2']);
        await this.scrollToElement(this.exampleLocator);
        await this.waitForPageLoad();
        await this.waitForLoad();
        await this.uploadFile(this.exampleLocator, 'path/to/file.txt');

        await this.assertElementVisible(this.exampleLocator);
        await this.assertElementNotVisible(this.exampleLocator);
        await this.assertElementContainsText(this.exampleLocator, 'Expected Text');
        await this.urlContains('https://example.com');
        await this.verifyIsDisplayed(this.exampleLocator);
        await this.verifyIsNotDisplayed(this.exampleLocator);
        await this.verifyIsEnabled(this.exampleLocator);
        await this.verifyIsHidden(this.exampleLocator);

    }
}