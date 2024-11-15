import { EntityInformationLocators, MailingPreferenceLocators, AuthorizedSignerLocators, IndustrialClassificationLocators} from "../../../../Locators/Entity/EntityinformationLocators.json"
import { FormUsageButtons } from "../../../../Locators/FormUsageButtons.json"

export class EntityInformationPage{

    fillEntityInformation(fName, socialSecurityNo, primaryTelephone, city, address, address1, dobYYYYMMDD, postalCode){
        cy.xpath(EntityInformationLocators.EntityName).type(fName)
        cy.xpath(EntityInformationLocators.EINSSN).type(socialSecurityNo, {force: true } )
       // cy.xpath(EntityInformationLocators.TypeOfEntity).select('Partnership')
        cy.xpath(EntityInformationLocators.BusinessPhone).type(primaryTelephone, {force: true })
        cy.xpath(EntityInformationLocators.OriginCountry).select('United States')
        cy.xpath(EntityInformationLocators.OriginState).select('Alaska')
        cy.xpath(EntityInformationLocators.EntityResolutionDate).type(dobYYYYMMDD)
        cy.xpath(EntityInformationLocators.BusinessAddress1).type(address)
        cy.xpath(EntityInformationLocators.BusinessAddress2).type(address1)
        cy.xpath(EntityInformationLocators.Country).select('United States')
        cy.xpath(EntityInformationLocators.State).select('Alaska')
        cy.xpath(EntityInformationLocators.City).type(city)
        cy.xpath(EntityInformationLocators.PostalCode).type(postalCode)
    }


    fillMailingPreference(address1, address2, city, postalCode, randomNumbers, randomNumbers2, dobYYYYMMDD){
        cy.xpath(MailingPreferenceLocators.MailingAddress1).type(address1)
        cy.xpath(MailingPreferenceLocators.MailingAddress2).type(address2)
        cy.xpath(MailingPreferenceLocators.Country).select('United States')
        cy.xpath(MailingPreferenceLocators.State).select('Alabama')
        cy.xpath(MailingPreferenceLocators.City).type(city)
        cy.xpath(MailingPreferenceLocators.PostalCode).type(postalCode)
        cy.xpath(MailingPreferenceLocators.LargeTraderID).type(randomNumbers, {force: true })
        cy.xpath(MailingPreferenceLocators.EffectiveDate).type(dobYYYYMMDD)
        cy.xpath(MailingPreferenceLocators.LEINumber).type(randomNumbers2, {force: true })
    }


    fillAuthorizedSigner(fName1, mName1, lName1, dobMMDDYYYY1, email1, randomNumbers3, randomNumbers4, idNumber, idIssueDate, IdExpirationDate){
        cy.xpath(AuthorizedSignerLocators.Firstname).type(fName1)
        cy.xpath(AuthorizedSignerLocators.MiddleName).type(mName1)
        cy.xpath(AuthorizedSignerLocators.LastName).type(lName1)
        cy.xpath(AuthorizedSignerLocators.DateOfBirth).type(dobMMDDYYYY1)
        cy.xpath(AuthorizedSignerLocators.Email).type(email1)
        cy.xpath(AuthorizedSignerLocators.PhoneNumber).type(randomNumbers3, {force: true })
        cy.xpath(AuthorizedSignerLocators.ITINForeignTaxID).type(randomNumbers4, {force: true })   
        cy.xpath(AuthorizedSignerLocators.IdType).select('Other Govt ID')
        cy.xpath(AuthorizedSignerLocators.IdNumber).type(idNumber, {force: true })
        cy.xpath(AuthorizedSignerLocators.IdIssueDate).type(idIssueDate)
        cy.xpath(AuthorizedSignerLocators.IdExpirationDate).type(IdExpirationDate)
    }

    fillAuthorizedSigner_isUSCitizenYes(randomNumbers1){
        cy.xpath(AuthorizedSignerLocators.isUSCitizenYes).click()
        cy.xpath(AuthorizedSignerLocators.SocialSecurityNo).type(randomNumbers1, {force: true })
    }

    fillAuthorizedSigner_isUScitizenNoAndisForeignYes(){
        cy.xpath(AuthorizedSignerLocators.isUSCitizenNo).click()
        cy.xpath(AuthorizedSignerLocators.isUsPermanentNo).click()
        cy.xpath(AuthorizedSignerLocators.isForeignAccountYes).click()
        // cy.intercept('GET', '**/api/lov/listofvalues/4513*').as('dropdownData');
        // cy.wait('@dropdownData')
        cy.xpath(AuthorizedSignerLocators.Citizenship).select('Austria')
    }

    fillIndustrialClassification(){

        cy.xpath(IndustrialClassificationLocators.RetailTrade).check()   
    }

    SaveAndContinue(){
        cy.xpath(FormUsageButtons.SaveAndContinue).click({force:true}).click({force:true})
        cy.xpath(FormUsageButtons.SaveAndContinue).click({force:true})
    }

}