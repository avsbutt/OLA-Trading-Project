
import { CreatePersonalAccountLocators } from "../../../../../Locators/createNewAccountLocators.json"
import { PersonalInformationLocators, CoApplicantPersonalInformationLocators, PhysicalAddressLocators, CoApplicantPhysicalAddressLocators, TrustedContactLocators } from "../../../../../Locators/Personal/PersonalInformationLocators.json";
import { FormUsageButtons } from "../../../../../Locators/FormUsageButtons.json";


export class PersonalInformationPage{

    CreateNewAccountClick(){
        cy.xpath(CreatePersonalAccountLocators.CreateNewAccount).click({force: true})
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
        cy.xpath(PersonalInformationLocators.NoOfDependents).clear().type(nOfDependents); 
        cy.xpath(PersonalInformationLocators.MaterialStatus).select('Single')
        cy.xpath(PersonalInformationLocators.PrimaryTelephone).clear().type(primaryTelephone); 
        cy.xpath(PersonalInformationLocators.IdNumber).clear().type(idNumber); 
        cy.xpath(PersonalInformationLocators.isUSCitizenYes).click()
        cy.xpath(PersonalInformationLocators.DateofBirth).clear().type(dobYYYYMMDD)
        cy.xpath(PersonalInformationLocators.IdIssueDate).clear().type(idIssueDate); // Use the YYYY-MM-DD format for Issue Date
        cy.xpath(PersonalInformationLocators.IdExpirationDate).clear().type(idExpirationDate); // Use the YYYY-MM-DD format for Expiration Date
        cy.xpath(PersonalInformationLocators.SocialSecurityNo).type(socialSecurityNo) 
        cy.wait(2000)
        cy.xpath(PersonalInformationLocators.IdType).should('be.visible').select('4515')
    }


    fillCoApplicantPersonalInformation(fName, mName, lName, email, nOfDependents, primaryTelephone, idNumber, dobYYYYMMDD, idIssueDate, idExpirationDate, randomNumbers) {
        cy.xpath(CoApplicantPersonalInformationLocators.FirstName).clear().type(fName);
        cy.xpath(CoApplicantPersonalInformationLocators.LastName).clear().type(lName);
        cy.xpath(CoApplicantPersonalInformationLocators.MiddleName).clear().type(mName);
        cy.xpath(CoApplicantPersonalInformationLocators.Email).clear().type(email);
        cy.xpath(CoApplicantPersonalInformationLocators.NoOfDependents).clear().type(nOfDependents); 
        cy.xpath(CoApplicantPersonalInformationLocators.MaterialStatus).select('Single')
        cy.xpath(CoApplicantPersonalInformationLocators.PrimaryTelephone).clear().type(primaryTelephone); 
        cy.xpath(CoApplicantPersonalInformationLocators.IdNumber).clear().type(idNumber); 
        cy.xpath(CoApplicantPersonalInformationLocators.isUSCitizenYes).click()
        cy.xpath(CoApplicantPersonalInformationLocators.DateofBirth).clear().type(dobYYYYMMDD)
        cy.xpath(CoApplicantPersonalInformationLocators.IdIssueDate).clear().type(idIssueDate); // Use the YYYY-MM-DD format for Issue Date
        cy.xpath(CoApplicantPersonalInformationLocators.IdExpirationDate).clear().type(idExpirationDate); // Use the YYYY-MM-DD format for Expiration Date
        cy.xpath(CoApplicantPersonalInformationLocators.SocialSecurityNo).type(randomNumbers) 
        cy.wait(2000)
        cy.xpath(CoApplicantPersonalInformationLocators.IdType).should('be.visible').select('4515')
    }


    fillPhysicalAddress(address, city, postalCode){
        cy.xpath(PhysicalAddressLocators.Address1).clear().type(address)
        cy.xpath(PhysicalAddressLocators.City).clear().type(city)
        cy.xpath(PhysicalAddressLocators.PostalCode).clear().type(postalCode)
        cy.xpath(PhysicalAddressLocators.Country).select('United States')
        cy.xpath(PhysicalAddressLocators.State).select('Alabama')
    }


    fillCoApplicantPhysicalAddress(address, city, postalCode){
        cy.xpath(CoApplicantPhysicalAddressLocators.Address1).clear().type(address)
        cy.xpath(CoApplicantPhysicalAddressLocators.City).clear().type(city)
        cy.xpath(CoApplicantPhysicalAddressLocators.PostalCode).clear().type(postalCode)
        cy.xpath(CoApplicantPhysicalAddressLocators.Country).select('United States')
        cy.xpath(CoApplicantPhysicalAddressLocators.State).select('Alabama')
    }


    fillTrustedContact(trustedFirstName, trustedLastName, trustedTelephone, trustedEmail, trustedMailingAddress1, trustedCity, trustedPostalCode){
        cy.xpath(TrustedContactLocators.TrustedContactCheckbox).check();
        cy.xpath(TrustedContactLocators.FirstName).clear().type(trustedFirstName)
        cy.xpath(TrustedContactLocators.LastName).clear().type(trustedLastName)
        cy.xpath(TrustedContactLocators.TelephoneNumber).clear().type(trustedTelephone)
        cy.xpath(TrustedContactLocators.EmailAddress).clear().type(trustedEmail)
        cy.xpath(TrustedContactLocators.MailingAddress1).clear().type(trustedMailingAddress1)
        cy.xpath(TrustedContactLocators.Country).select('United States')
        cy.xpath(TrustedContactLocators.State).select('Alaska')
        cy.xpath(TrustedContactLocators.City).clear().type(trustedCity)
        cy.xpath(TrustedContactLocators.PostalCode).clear().type(trustedPostalCode)
    }

    SaveAndContinue(){
        cy.xpath(FormUsageButtons.SaveAndContinue).click({force: true});
    }

}