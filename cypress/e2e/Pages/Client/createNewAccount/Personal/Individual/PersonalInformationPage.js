
import { CreatePersonalAccountLocators } from "../../../../../Locators/createNewAccountLocators.json"
import { PersonalInformationLocators, PhysicalAddressLocators, TrustedContactLocators } from "../../../../../Locators/Personal/PersonalInformationLocators.json";
import { FormUsageButtons } from "../../../../../Locators/FormUsageButtons.json";


export class PersonalInformationPage{

    CreateNewAccountClick(){
        cy.xpath(CreatePersonalAccountLocators.CreateNewAccount).click()
    }
    ClickPersonalAndSelectIndividual(){
        cy.xpath(CreatePersonalAccountLocators.PersonalAccountType).select('Individual');
    }
    ClickNextBtn(){
        cy.xpath(CreatePersonalAccountLocators.NextBtn).click()
        cy.url().should('include','/personal-info')
    }
    fillPersonalInfo(fName, mName, lName, email, nOfDependents, primaryTelephone, idNumber, dobYYYYMMDD, idIssueDate, idExpirationDate, socialSecurityNo) {
        cy.xpath(PersonalInformationLocators.FirstName).clear().type(fName);
        cy.xpath(PersonalInformationLocators.LastName).clear().type(lName);
        cy.xpath(PersonalInformationLocators.MiddleName).clear().type(mName);
        cy.xpath(PersonalInformationLocators.Email).clear().type(email);
        cy.xpath(PersonalInformationLocators.NoOfDependents).clear().type(nOfDependents); // Fill the number of dependents
        cy.xpath(PersonalInformationLocators.MaterialStatus).select('Single')
        cy.xpath(PersonalInformationLocators.PrimaryTelephone).clear().type(primaryTelephone); // Fill the primary telephone
        cy.xpath(PersonalInformationLocators.IdNumber).clear().type(idNumber); // Fill the ID number
        cy.xpath(PersonalInformationLocators.IdType).select('Other Govt ID')
        cy.xpath(PersonalInformationLocators.isUSCitizenYes).click()
        cy.xpath(PersonalInformationLocators.DateofBirth).clear().type(dobYYYYMMDD)

        cy.xpath(PersonalInformationLocators.IdIssueDate).clear().type(idIssueDate); // Use the YYYY-MM-DD format for Issue Date
        cy.xpath(PersonalInformationLocators.IdExpirationDate).clear().type(idExpirationDate); // Use the YYYY-MM-DD format for Expiration Date
        cy.xpath(PersonalInformationLocators.SocialSecurityNo).type(socialSecurityNo) //Fill the Social Security Number 
    }


    fillPhysicalAddress(address, city, postalCode){
        cy.xpath(PhysicalAddressLocators.Address1).type(address)
        cy.xpath(PhysicalAddressLocators.City).type(city)
        cy.xpath(PhysicalAddressLocators.PostalCode).type(postalCode)
        cy.xpath(PhysicalAddressLocators.Country).select('United States')
        cy.xpath(PhysicalAddressLocators.State).select('Alabama')
    }

    fillTrustedContact(trustedFirstName, trustedLastName, trustedTelephone, trustedEmail, trustedMailingAddress1, trustedCity, trustedPostalCode){
        cy.xpath(TrustedContactLocators.FirstName).type(trustedFirstName)
        cy.xpath(TrustedContactLocators.LastName).type(trustedLastName)
        cy.xpath(TrustedContactLocators.TelephoneNumber).type(trustedTelephone)
        cy.xpath(TrustedContactLocators.EmailAddress).type(trustedEmail)
        cy.xpath(TrustedContactLocators.MailingAddress1).type(trustedMailingAddress1)

        cy.xpath(TrustedContactLocators.Country).select('United States')
        cy.xpath(TrustedContactLocators.State).select('Alaska')
        cy.xpath(TrustedContactLocators.City).type(trustedCity)
        cy.xpath(TrustedContactLocators.PostalCode).type(trustedPostalCode)
    }

    SaveAndContinue(){
        cy.xpath(FormUsageButtons.SaveAndContinue).click();
    }

}
