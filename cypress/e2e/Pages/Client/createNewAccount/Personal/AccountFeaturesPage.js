import { AccountFeaturesLocators } from "../../../../Locators/Personal/AccountFeaturesLocators.json"
import { FormUsageButtons } from "../../../../Locators/FormUsageButtons.json";

export class AccountFeaturesPage{

    VerifyTheEDocumentsTitle(){
        cy.xpath(AccountFeaturesLocators.EDocumentsTitle)
    }
    VerifyTheMoneyMarketTitle(){
        cy.xpath(AccountFeaturesLocators.MoneyMarketTitle)
    }
    VerifyTheAddMarginToAccountTitle(){
        cy.xpath(AccountFeaturesLocators.AddMarginToAccountTitle)
    }
    VerifyTheParticipateTitle(){
        cy.xpath(AccountFeaturesLocators.ParticipateTitle)
    }
    VerifyTheDividendReinvestmentTitle(){
        cy.xpath(AccountFeaturesLocators.DividendReinvestmentTitle)
    }




    SaveAndContinue(){
       // cy.xpath(FormUsageButtons.SaveAndContinue, { timeout: 20000 }).should('be.visible').click()
       cy.wait(1000)
       cy.xpath(FormUsageButtons.Save).should('be.visible').click({force:true})
       cy.xpath(FormUsageButtons.SaveAndContinue).should('be.visible').click({force:true})

    
    }

}