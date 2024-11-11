import { DueDiligenceFormLocators } from "../../../../Locators/Entity/DueDiligenceFormLocators.json"
import { FormUsageButtons } from "../../../../Locators/FormUsageButtons.json";
import { selectRandomValueFromDropdownUtils } from "../../../../utils/selectRandomValueFromDropdownUtils";

export class DueDiligenceFormPage{

    fillEntityDueDiligenceForm(fName1, address2, randomNumbers5, randomWords1, randomWords2, randomWords3){
        cy.xpath(DueDiligenceFormLocators.AccountName).type(fName1)
        selectRandomValueFromDropdownUtils(DueDiligenceFormLocators.CountryOfIncorporation)
        cy.xpath(DueDiligenceFormLocators.BusinessLocation).type(address2)
        selectRandomValueFromDropdownUtils(DueDiligenceFormLocators.PrimaryEntityAccountActivity)
        selectRandomValueFromDropdownUtils(DueDiligenceFormLocators.ExpectedWithdrawalFrequency)
        cy.xpath(DueDiligenceFormLocators.InitialDepositAmount).type(randomNumbers5)
        cy.xpath(DueDiligenceFormLocators.InitialDepositSource).type(randomWords1)
        cy.xpath(DueDiligenceFormLocators.InstitutionName).type(randomWords2)
        selectRandomValueFromDropdownUtils(DueDiligenceFormLocators.ScopeOfBusiness)
        selectRandomValueFromDropdownUtils(DueDiligenceFormLocators.PrimaryOngoing)
        selectRandomValueFromDropdownUtils(DueDiligenceFormLocators.EntityRisk)
        cy.xpath(DueDiligenceFormLocators.ForeignBondsYes).check()
        cy.xpath(DueDiligenceFormLocators.LowPricedSecuritiesYes).check()
        cy.wait(2000)
        cy.xpath(DueDiligenceFormLocators.BearerShareNo).check()
        cy.xpath(DueDiligenceFormLocators.RelatedEntitiesYes).check()
        cy.xpath(DueDiligenceFormLocators.NegativeNewsInfo).type(randomWords3)

    }
    
    SaveAndContinue(){
        cy.xpath(FormUsageButtons.SaveAndContinue).should('be.visible').click({force:true})
     }
}