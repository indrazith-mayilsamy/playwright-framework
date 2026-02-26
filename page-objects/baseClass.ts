import { Assertions } from "../utils/locator/webAssertions";
import { WebController } from "../utils/locator/webContoller";


export class base extends Assertions {
    constructor(page: any) {
        super(page);
        this.page = page;
    };

    module = {
        Login: new WebController(this.createLocator(''), 'Login Module'),
    } 
}