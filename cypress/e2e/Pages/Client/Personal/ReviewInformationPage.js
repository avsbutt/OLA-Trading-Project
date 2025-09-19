import { FormUsageButtons } from "@Locators/FormUsageButtons.json";

export class ReviewInfomationPage{

    SelectRegisteredRep(){
        cy.xpath("//select[@name='repUserId']").select('Demo RR').should('contain.text', 'Demo RR');  // Alabama State is selected for Deborah on Broker/RR side 
    }

    ClickOnSubmitBtn(){
        cy.xpath(FormUsageButtons.Submit).click()
    }

    VerifyClientDashboardVisible(){
       cy.xpath('//h2[@class="heading" and text()="Client Applications"]')
      .should('be.visible');
    }

}