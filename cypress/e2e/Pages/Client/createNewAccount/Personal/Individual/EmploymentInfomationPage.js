import { EmployedLocators } from "../../../../../Locators/Personal/EmploymentInformationLocators.json"
import { RetiredLocators } from "../../../../../Locators/Personal/EmploymentInformationLocators.json"
import { UnEmployedLocators } from "../../../../../Locators/Personal/EmploymentInformationLocators.json"
import { FormUsageButtons } from "../../../../../Locators/FormUsageButtons.json";

export class EmploymentInformationPage{

ClickOnUnemployed(){
    cy.xpath(UnEmployedLocators.Unemployed).click()
}
SaveAndContinue(){
    cy.xpath(FormUsageButtons.SaveAndContinue).click();
}
    
}