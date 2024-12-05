import { IRABeneficiariesLocators } from "../../../../Locators/Retirement/IRABeneficiaries.json"
import { FormUsageButtons } from "../../../../Locators/FormUsageButtons.json"

export class IRABeneficiariesPage{

    AddIRABeneficiaries(fName, lName, dobYYYYMMDD, randomNumbers, address, city, postalCode, randomWords){
        cy.xpath(IRABeneficiariesLocators.AddBeneficiary).click()
        cy.xpath(IRABeneficiariesLocators.FirstName).type(fName)
        cy.xpath(IRABeneficiariesLocators.LastName).type(lName)
        cy.xpath(IRABeneficiariesLocators.DateofBirth).type(dobYYYYMMDD)
        cy.xpath(IRABeneficiariesLocators.SSN).type(randomNumbers)
        cy.xpath(IRABeneficiariesLocators.Address).type(address)
        cy.xpath(IRABeneficiariesLocators.Country).select('United States')
        cy.xpath(IRABeneficiariesLocators.State).select('Alabama')
        cy.xpath(IRABeneficiariesLocators.City).type(city)
        cy.xpath(IRABeneficiariesLocators.PostalCode).type(postalCode)
        cy.xpath(IRABeneficiariesLocators.Share).type('100')
        cy.xpath(IRABeneficiariesLocators.Relationship).type(randomWords)
        cy.xpath(IRABeneficiariesLocators.BeneficiaryType).select('PRIMARY')
    }

    SaveAndContinue(){
        cy.xpath(FormUsageButtons.SaveAndContinue).should('be.visible').click({force:true})
    }

}