import { PersonalInformationLocators } from "../../../../../Locators/Personal/PersonalInformationLocators.json";
import { CreatePersonalAccountLocators } from "../../../../../Locators/createNewAccount/createNewAccountLocators.json"

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
    fillPersonalInfo(fName, mName, lName, email, nOfDependents, primaryTelephone, idNumber, dobdobYYYYMMDD, idIssueDate, idExpirationDate) {
        cy.xpath(PersonalInformationLocators.FirstName).clear().type(fName);
        cy.xpath(PersonalInformationLocators.LastName).clear().type(lName);
        cy.xpath(PersonalInformationLocators.MiddleName).clear().type(mName);
        cy.xpath(PersonalInformationLocators.Email).clear().type(email);
        cy.xpath(PersonalInformationLocators.NoOfDependents).clear().type(nOfDependents); // Fill the number of dependents
        cy.xpath(PersonalInformationLocators.PrimaryTelephone).clear().type(primaryTelephone); // Fill the primary telephone
        cy.xpath(PersonalInformationLocators.IdNumber).clear().type(idNumber); // Fill the ID number
        cy.xpath(PersonalInformationLocators.DateofBirth).clear().type(dobYYYYMMDD)
       
        // Now fill in the Issue and Expiration dates
        cy.xpath(PersonalInformationLocators.IdIssueDate).clear().type(idIssueDate); // Use the YYYY-MM-DD format for Issue Date
        cy.xpath(PersonalInformationLocators.IdExpirationDate).clear().type(idExpirationDate); // Use the YYYY-MM-DD format for Expiration Date
    }
}
