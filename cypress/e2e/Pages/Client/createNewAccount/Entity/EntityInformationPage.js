import { EntityInformationLocators, MailingPreferenceLocators, AuthorizedSignerLocators, IndustrialClassificationLocators} from "../../../../Locators/Entity/EntityinformationLocators.json"
import { FormUsageButtons } from "../../../../Locators/FormUsageButtons.json"

export class EntityInformationPage{

    fillEntityInformation(fName, socialSecurityNo, primaryTelephone, city, address, address1, dobYYYYMMDD, postalCode){
        cy.xpath(EntityInformationLocators.EntityName).focus().type(fName)
        cy.xpath(EntityInformationLocators.EINSSN).focus().type(socialSecurityNo, {force: true } )
       // cy.xpath(EntityInformationLocators.TypeOfEntity).select('Partnership')
        cy.xpath(EntityInformationLocators.BusinessPhone).focus().type(primaryTelephone, {force: true })
        cy.xpath(EntityInformationLocators.OriginCountry).select('United States')
        cy.xpath(EntityInformationLocators.OriginState).select('Alabama')
        cy.xpath(EntityInformationLocators.EntityResolutionDate).type(dobYYYYMMDD)
        cy.xpath(EntityInformationLocators.BusinessAddress1).focus().type(address, { force: true })
        cy.xpath(EntityInformationLocators.BusinessAddress2).focus().type(address1, { force: true })
        cy.xpath(EntityInformationLocators.Country).select('United States')
        cy.xpath(EntityInformationLocators.State).select('Alaska')
        cy.xpath(EntityInformationLocators.City).focus().type(city, { force: true })
        cy.xpath(EntityInformationLocators.PostalCode).focus().type(postalCode)
    }


    fillMailingPreference(address1, address2, city, postalCode, randomNumbers, randomNumbers2, dobYYYYMMDD){
        cy.xpath(MailingPreferenceLocators.MailingAddress1).focus().type(address1, { force: true })
        cy.xpath(MailingPreferenceLocators.MailingAddress2).focus().type(address2, { force: true })
        cy.xpath(MailingPreferenceLocators.Country).select('United States')
        cy.xpath(MailingPreferenceLocators.State).select('Alabama')
        cy.xpath(MailingPreferenceLocators.City).focus().type(city)
        cy.xpath(MailingPreferenceLocators.PostalCode).type(postalCode)
        cy.xpath(MailingPreferenceLocators.LargeTraderID).focus().type(randomNumbers, {force: true })
        cy.xpath(MailingPreferenceLocators.EffectiveDate).focus().type(dobYYYYMMDD)
        cy.xpath(MailingPreferenceLocators.LEINumber).focus().type(randomNumbers2, {force: true })
    }


    fillAuthorizedSigner(fName1, mName1, lName1, dobMMDDYYYY1, email1, randomNumbers3, randomNumbers4, idNumber, idIssueDate, IdExpirationDate){
        cy.xpath(AuthorizedSignerLocators.Firstname).focus().type(fName1, { force: true })
        cy.xpath(AuthorizedSignerLocators.MiddleName).focus().type(mName1, { force: true })
        cy.xpath(AuthorizedSignerLocators.LastName).focus().type(lName1, { force: true })
        cy.xpath(AuthorizedSignerLocators.DateOfBirth).focus().type(dobMMDDYYYY1)
        cy.xpath(AuthorizedSignerLocators.Email).focus().type(email1, { force: true })
        cy.xpath(AuthorizedSignerLocators.PhoneNumber).focus().type(randomNumbers3, {force: true })
        cy.xpath(AuthorizedSignerLocators.ITINForeignTaxID).focus().type(randomNumbers4, {force: true })   
       // cy.xpath(AuthorizedSignerLocators.IdType).select('Other Govt ID')
        cy.xpath(AuthorizedSignerLocators.IdNumber).focus().type(idNumber, {force: true })
        cy.xpath(AuthorizedSignerLocators.IdIssueDate).focus().type(idIssueDate)
        cy.xpath(AuthorizedSignerLocators.IdExpirationDate).focus().type(IdExpirationDate)
    }

    FromAuthorizedSignerSelect_IDType_GovtID(){
        cy.xpath(AuthorizedSignerLocators.IdType).select('Other Govt ID')
    }

    FromAuthorizedSignerSelect_IDType_Passport(){
        cy.xpath(AuthorizedSignerLocators.IdType).select('Passport')
    }

    FromAuthorizedSignerSelect_IDType_DriverLicense(){
        cy.xpath(AuthorizedSignerLocators.IdType).select('Driver License')
        cy.xpath(AuthorizedSignerLocators.IdIssuanceState).select('Alaska')
    }

    FromAuthorizedSignerSelect_isUSCitizenYes(randomNumbers1){
        cy.xpath(AuthorizedSignerLocators.isUSCitizenYes).click()
        cy.xpath(AuthorizedSignerLocators.SocialSecurityNo).focus().type(randomNumbers1, {force: true })
    }

    FromlAuthorizedSignerSelect_isUScitizenNoAndisForeignYes(){
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