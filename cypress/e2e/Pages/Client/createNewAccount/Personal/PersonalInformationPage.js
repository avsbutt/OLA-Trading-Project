
import { CreatePersonalAccountLocators } from "../../../../Locators/createNewAccountLocators.json"
import { PersonalInformationLocators, CoApplicantPersonalInformationLocators, PhysicalAddressLocators, CoApplicantPhysicalAddressLocators, TrustedContactLocators, IRAAccountInformationLocators } from "../../../../Locators/Personal/PersonalInformationLocators.json";
import { FormUsageButtons } from "../../../../Locators/FormUsageButtons.json";


export class PersonalInformationPage{


    fillPersonalInformation(fName, mName, lName, email, nOfDependents, primaryTelephone, idNumber, dobYYYYMMDD, idIssueDate, idExpirationDate, socialSecurityNo) {
        cy.xpath(PersonalInformationLocators.FirstName).clear().type(fName);
        cy.xpath(PersonalInformationLocators.LastName).clear().type(lName);
        cy.xpath(PersonalInformationLocators.MiddleName).focus().clear().type(mName);
        cy.xpath(PersonalInformationLocators.Email).focus().clear().type(email);
        cy.xpath(PersonalInformationLocators.NoOfDependents).focus().clear().type(nOfDependents); 
        cy.xpath(PersonalInformationLocators.MaterialStatus).focus().select('Single')
        cy.xpath(PersonalInformationLocators.PrimaryTelephone).focus().clear().type(primaryTelephone); 
        cy.xpath(PersonalInformationLocators.IdNumber).focus().clear().type(idNumber); 
        cy.xpath(PersonalInformationLocators.DateofBirth).focus().clear().type(dobYYYYMMDD)
        cy.xpath(PersonalInformationLocators.IdIssueDate).focus().clear().type(idIssueDate); // Use the YYYY-MM-DD format for Issue Date
        cy.xpath(PersonalInformationLocators.IdExpirationDate).focus().clear().type(idExpirationDate); // Use the YYYY-MM-DD format for Expiration Date

        // cy.xpath(PersonalInformationLocators.isUSCitizenYes).click() //#####
        // cy.xpath(PersonalInformationLocators.SocialSecurityNo).type(socialSecurityNo)  //#####
        // cy.wait(1000)
        // cy.xpath(PersonalInformationLocators.IdType).should('be.visible').select('4515')
    }
    FromPersonalInformationSelect_IDType_GovtID(){
        cy.xpath(PersonalInformationLocators.IdType).should('be.visible').focus().select('Other Govt ID' , {force:true}) 
    }

    FromPersonalInformationSelect_IDType_DriverLicense(){
        cy.xpath(PersonalInformationLocators.IdType).focus().should('be.visible').focus().select('Driver License', {force:true})
        cy.xpath(PersonalInformationLocators.IdType).focus().should('contain.text', 'Driver License')    
        cy.xpath(PersonalInformationLocators.IdIssuanceState).select('Alabama')
    }

    FromPersonalInformationSelect_IDType_Passport(){
        cy.xpath(PersonalInformationLocators.IdType).should('be.visible').select('Passport' , {force:true} ) 
    }


    FromPersonalInformationSelect_isUSCitizenYes(socialSecurityNo){
        cy.xpath(PersonalInformationLocators.isUSCitizenYes).focus().click()
        cy.xpath(PersonalInformationLocators.SocialSecurityNo).focus().type(socialSecurityNo)
        // cy.wait(1000)
        // cy.xpath(PersonalInformationLocators.IdType).should('be.visible').select('Other Govt ID') 
    }
    FromPersonalInformationSelect_isUScitizenNoAndUSpermanentYes(){
        cy.xpath(PersonalInformationLocators.isUsCitizenNO).click()
        cy.xpath(PersonalInformationLocators.isUsPermanentYes).click()
        cy.xpath(PersonalInformationLocators.CountryOfCitizenship).select('Afghanistan' , {force:true}) 
        cy.wait(1000)
        cy.xpath(PersonalInformationLocators.IdType).should('be.visible').select('4515')
    }
    FromPersonalInformationSelect_isUScitizenNoAndisForeignYes(){
        cy.xpath(PersonalInformationLocators.isUsCitizenNO).click()
        cy.xpath(PersonalInformationLocators.isUsPermanentNo).click()
        cy.xpath(PersonalInformationLocators.isForeignAccountYes).click() 
        cy.xpath(PersonalInformationLocators.CountryOfCitizenship).select('Afghanistan' , {force:true}) 
        // cy.wait(1000)
        // cy.xpath(PersonalInformationLocators.IdType).should('be.visible').select('4515')
    }

    VerifyForeignAccountCannotOpenIRAAccount(){
        cy.xpath(PersonalInformationLocators.isUsCitizenNO).click()
        cy.xpath(PersonalInformationLocators.isUsPermanentNo).click()
        cy.xpath(PersonalInformationLocators.isForeignAccountYes).click()
        cy.xpath("(//div[@role='alert'])[1]").should('be.visible')
    }

    fillCoApplicantPersonalInformation(fName, mName, lName, email, nOfDependents, primaryTelephone, idNumber, dobYYYYMMDD, idIssueDate, idExpirationDate, randomNumbers) {
        cy.xpath(PersonalInformationLocators.IdType).focus().should('contain.text', 'Driver License')
        cy.xpath(CoApplicantPersonalInformationLocators.FirstName).focus().clear().type(fName);
        cy.xpath(CoApplicantPersonalInformationLocators.LastName).focus().clear().type(lName);
        cy.xpath(CoApplicantPersonalInformationLocators.MiddleName).focus().clear().type(mName);
        cy.xpath(CoApplicantPersonalInformationLocators.Email).focus().clear().type(email);
        cy.xpath(CoApplicantPersonalInformationLocators.NoOfDependents).focus().clear().type(nOfDependents); 
        cy.xpath(CoApplicantPersonalInformationLocators.MaterialStatus).select('Single')
        cy.xpath(CoApplicantPersonalInformationLocators.PrimaryTelephone).focus().clear().type(primaryTelephone); 
        cy.xpath(CoApplicantPersonalInformationLocators.IdNumber).focus().clear().type(idNumber); 
        cy.xpath(CoApplicantPersonalInformationLocators.isUSCitizenYes).click()
        cy.xpath(CoApplicantPersonalInformationLocators.DateofBirth).clear().type(dobYYYYMMDD)
        cy.xpath(CoApplicantPersonalInformationLocators.IdIssueDate).focus().clear().type(idIssueDate); // Use the YYYY-MM-DD format for Issue Date
        cy.xpath(CoApplicantPersonalInformationLocators.IdExpirationDate).focus().clear().type(idExpirationDate); // Use the YYYY-MM-DD format for Expiration Date
        cy.xpath(CoApplicantPersonalInformationLocators.SocialSecurityNo).focus().type(randomNumbers) 
        cy.wait(2000)
        cy.xpath(CoApplicantPersonalInformationLocators.IdType).should('be.visible').select('4515')
    }


    fillPhysicalAddress(address, city, postalCode){
        cy.xpath(PhysicalAddressLocators.Address1).focus().clear().type(address)
        cy.xpath(PhysicalAddressLocators.City).focus().clear().type(city)
        cy.xpath(PhysicalAddressLocators.PostalCode).focus().clear().type(postalCode)
        cy.xpath(PhysicalAddressLocators.Country).select('United States' , {force:true})
        cy.xpath(PhysicalAddressLocators.State).select('Alabama' , {force:true})
    }


    fillCoApplicantPhysicalAddress(address, city, postalCode){
        cy.xpath(CoApplicantPhysicalAddressLocators.Address1).focus().clear().type(address)
        cy.xpath(CoApplicantPhysicalAddressLocators.City).focus().clear().type(city)
        cy.xpath(CoApplicantPhysicalAddressLocators.PostalCode).focus().clear().type(postalCode)
        cy.xpath(CoApplicantPhysicalAddressLocators.Country).focus().select('United States' , {force:true})
        cy.xpath(CoApplicantPhysicalAddressLocators.State).focus().select('Alabama' , {force:true})
    }


    fillTrustedContact(trustedFirstName, trustedLastName, trustedTelephone, trustedEmail, trustedMailingAddress1, trustedCity, trustedPostalCode){
        cy.xpath(TrustedContactLocators.TrustedContactCheckbox).check();
        cy.xpath(TrustedContactLocators.FirstName).focus().clear().type(trustedFirstName)
        cy.xpath(TrustedContactLocators.LastName).focus().clear().type(trustedLastName)
        cy.xpath(TrustedContactLocators.TelephoneNumber).focus().clear().type(trustedTelephone)
        cy.xpath(TrustedContactLocators.EmailAddress).focus().clear().type(trustedEmail)
        cy.xpath(TrustedContactLocators.MailingAddress1).focus().clear().type(trustedMailingAddress1)
        cy.xpath(TrustedContactLocators.Country).select('United States' , {force:true})
        cy.xpath(TrustedContactLocators.State).select('Alabama' , {force:true})
        cy.xpath(TrustedContactLocators.City).focus().clear().type(trustedCity)
        cy.xpath(TrustedContactLocators.PostalCode).focus().clear().type(trustedPostalCode)
    }


    // ######------IRA------######
    fillIRAAccountInformation(){
        cy.xpath(IRAAccountInformationLocators.IRAAccountInformationText).should('be.visible')
        cy.xpath(IRAAccountInformationLocators.DepositorAuthorization).type('Yes i understand')
    }

    SaveAndContinue(){
        cy.xpath(FormUsageButtons.SaveAndContinue).focus().click({force: true});
    }

}