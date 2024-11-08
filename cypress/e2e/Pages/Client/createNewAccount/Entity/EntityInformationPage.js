import { EntityInformationLocators, MailingPreferenceLocators, AuthorizedSignerLocators, IndustrialClassificationLocators} from "../../../../Locators/Entity/EntityinformationLocators.json"
import { FormUsageButtons } from "../../../../Locators/FormUsageButtons.json"

export class EntityInformationPage{

    fillEntityInformation(fName, socialSecurityNo, primaryTelephone, city, address, address1, dobYYYYMMDD, postalCode){
        cy.xpath(EntityInformationLocators.EntityName).clear().type(fName)
        cy.xpath(EntityInformationLocators.EINSSN).clear().type(socialSecurityNo)
        cy.xpath(EntityInformationLocators.TypeOfEntity).select('Partnership')
        cy.xpath(EntityInformationLocators.BusinessPhone).clear().type(primaryTelephone)
        cy.xpath(EntityInformationLocators.OriginCountry).select('United States')
        cy.xpath(EntityInformationLocators.OriginState).select('Alaska')
        cy.xpath(EntityInformationLocators.EntityResolutionDate).type(dobYYYYMMDD)
        cy.xpath(EntityInformationLocators.BusinessAddress1).clear().type(address)
        cy.xpath(EntityInformationLocators.BusinessAddress2).clear().type(address1)
        cy.xpath(EntityInformationLocators.Country).select('United States')
        cy.xpath(EntityInformationLocators.State).select('Alaska')
        cy.xpath(EntityInformationLocators.City).clear().type(city)
        cy.xpath(EntityInformationLocators.PostalCode).clear().type(postalCode)
    }


    fillMailingPreference(address1, address2, city, postalCode, randomNumbers, randomNumbers2, dobYYYYMMDD){
        cy.xpath(MailingPreferenceLocators.MailingAddress1).clear().type(address1)
        cy.xpath(MailingPreferenceLocators.MailingAddress2).clear().type(address2)
        cy.xpath(MailingPreferenceLocators.Country).select('United States')
        cy.xpath(MailingPreferenceLocators.State).select('Alabama')
        cy.xpath(MailingPreferenceLocators.City).clear().type(city)
        cy.xpath(MailingPreferenceLocators.PostalCode).clear().type(postalCode)
        cy.xpath(MailingPreferenceLocators.LargeTraderID).clear().type(randomNumbers)
        cy.xpath(MailingPreferenceLocators.EffectiveDate).type(dobYYYYMMDD)
        cy.xpath(MailingPreferenceLocators.LEINumber).clear().type(randomNumbers2)
    }


    fillAuthorizedSigner(fName1, mName1, lName1, dobMMDDYYYY1, email1, randomNumbers3, randomNumbers4, idNumber, idIssueDate, IdExpirationDate){
        cy.xpath(AuthorizedSignerLocators.Firstname).clear().type(fName1)
        cy.xpath(AuthorizedSignerLocators.MiddleName).clear().type(mName1)
        cy.xpath(AuthorizedSignerLocators.LastName).clear().type(lName1)
        cy.xpath(AuthorizedSignerLocators.DateOfBirth).type(dobMMDDYYYY1)
        cy.xpath(AuthorizedSignerLocators.Email).clear().type(email1)
        cy.xpath(AuthorizedSignerLocators.PhoneNumber).clear().type(randomNumbers3)
        cy.xpath(AuthorizedSignerLocators.ITINForeignTaxID).clear().type(randomNumbers4)   
        cy.xpath(AuthorizedSignerLocators.IdType).select('Other Govt ID')
        cy.xpath(AuthorizedSignerLocators.IdNumber).type(idNumber)
        cy.xpath(AuthorizedSignerLocators.IdIssueDate).type(idIssueDate)
        cy.xpath(AuthorizedSignerLocators.IdExpirationDate).type(IdExpirationDate)
    }

    fillAuthorizedSigner_isUSCitizenYes(randomNumbers1){
        cy.xpath(AuthorizedSignerLocators.isUSCitizenYes).click()
        cy.xpath(AuthorizedSignerLocators.SocialSecurityNo).clear().type(randomNumbers1)
    }

    fillAuthorizedSigner_isUScitizenNoAndisForeignYes(){
        cy.xpath(AuthorizedSignerLocators.isUSCitizenNo).click()
        cy.xpath(AuthorizedSignerLocators.isUsPermanentNo).click()
        cy.xpath(AuthorizedSignerLocators.isForeignAccountYes).click()
        cy.xpath(AuthorizedSignerLocators.Citizenship).select('Austria')
    }

    fillIndustrialClassification(){
        cy.xpath(IndustrialClassificationLocators.RetailTrade).check()   
    }

    SaveAndContinue(){
        cy.xpath(FormUsageButtons.SaveAndContinue).click().click()
    }

}