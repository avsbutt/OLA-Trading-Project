import { FormUsageButtons } from "../../../../Locators/FormUsageButtons.json";

export class ReviewInfomationPage{

    ClickOnSubmitBtn(){
        cy.xpath(FormUsageButtons.Submit).click()
    }

    

}