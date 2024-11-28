import { FormUsageButtons } from "../../../../Locators/FormUsageButtons.json";

export class ReviewInfomationPage{

    SelectRegisteredRep(){
        cy.xpath("//select[@name='repUserId']").select('337').should('contain.text', 'Deborah Juarez');  // Alabama State is selected for Deborah on Broker/RR side 
    }

    ClickOnSubmitBtn(){
        cy.xpath(FormUsageButtons.Submit).click()
    }

}