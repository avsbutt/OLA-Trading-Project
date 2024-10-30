import { FormUsageButtons} from "../../../../Locators/FormUsageButtons.json"
import { clientLoginUtils } from "../../../../utils/clientLoginUtils"
import{ createNewAccountLocators, CreatePersonalAccountLocators, EntityLocators, RetirementLocators} from "../../../../Locators/createNewAccountLocators.json"

describe ('Create Entity Account', ()=>{


 
    it.skip('Retire', ()=>{
        clientLoginUtils()
        cy.xpath(CreatePersonalAccountLocators.CreateNewAccount).click()
        cy.xpath(RetirementLocators.Retirement).click()
        cy.xpath(RetirementLocators.RetirementAccountType).select('Traditional IRA')
        // cy.xpath(EntityLocators.EntityAccountType).select('LLC')
        cy.xpath(EntityLocators.NextBtn).click()
    })
})