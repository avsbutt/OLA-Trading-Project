import { AccountFeaturesLocators } from "../../../../../Locators/Personal/AccountFeaturesLocators.json"
import { FormUsageButtons } from "../../../../../Locators/FormUsageButtons.json";

export class AccountFeaturesPage{

    


    SaveAndContinue(){
        cy.xpath(FormUsageButtons.SaveAndContinue).click();
    }

}