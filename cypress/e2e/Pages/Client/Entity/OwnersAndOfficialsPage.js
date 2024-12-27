import { EntityOfficersLocators, BeneficialOwnersLocators} from "@Locators/Entity/OwnersAndOfficialsLocators.json"
import { FormUsageButtons } from "@Locators/FormUsageButtons.json";

export class OwnersAndOfficialsPage{
    AddEntityOfficers(fName, lName, dobYYYYMMDD, randomNumbers, address, city, randomNumbers1, randomNumbers2, randomWords ){

        cy.xpath(EntityOfficersLocators.AddEntityOfficer).click()
        cy.xpath(EntityOfficersLocators.FirstName).clear().type(fName)
        cy.xpath(EntityOfficersLocators.LastName).clear().type(lName)
        cy.xpath(EntityOfficersLocators.DateOfBirth).type(dobYYYYMMDD)
        cy.xpath(EntityOfficersLocators.SSN).clear().type(randomNumbers)
        cy.xpath(EntityOfficersLocators.Address).clear().type(address)
        
        cy.xpath(EntityOfficersLocators.City).clear().type(city)
        cy.xpath(EntityOfficersLocators.PhoneNumber).clear().type(randomNumbers1)
        cy.xpath(EntityOfficersLocators.PostalCode).clear().type(randomNumbers2)
        cy.xpath(EntityOfficersLocators.Country).select('United States')
        cy.xpath(EntityOfficersLocators.State).select('Alabama')
        cy.xpath(EntityOfficersLocators.Position).clear().type(randomWords)
        cy.xpath(EntityOfficersLocators.Manager).click()
        //cy.xpath(EntityOfficersLocators.SameForBeneficial).click()

    }

    AddBeneficialOwners(fName1, lName1, dobYYYYMMDD1, randomNumbers3, address1, city1, randomNumbers4, randomNumbers5){

        cy.xpath(BeneficialOwnersLocators.AddbeneficialOwner).click()
       cy.xpath(BeneficialOwnersLocators.FirstName).clear().type(fName1)
        cy.xpath(BeneficialOwnersLocators.LastName).clear().type(lName1)
        cy.xpath(BeneficialOwnersLocators.DateOfBirth).type(dobYYYYMMDD1)
        cy.xpath(BeneficialOwnersLocators.SSN).clear().type(randomNumbers3)
        cy.xpath(BeneficialOwnersLocators.Address).clear().type(address1)
        cy.xpath(BeneficialOwnersLocators.City).clear().type(city1)
        cy.xpath(BeneficialOwnersLocators.PhoneNumber).clear().type(randomNumbers4)
        cy.xpath(BeneficialOwnersLocators.PostalCode).clear().type(randomNumbers5)
        cy.xpath(BeneficialOwnersLocators.Country).select('United States')
        cy.xpath(BeneficialOwnersLocators.State).select('Alaska')
        cy.xpath(BeneficialOwnersLocators.OwnershipPercentage).clear().type('100')    

    }

    SaveAndContinue(){
        cy.xpath(FormUsageButtons.SaveAndContinue).should('be.visible').click({force:true})
     }

}