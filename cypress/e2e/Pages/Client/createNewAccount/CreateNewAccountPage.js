import { CreatePersonalAccountLocators } from "../../../Locators/createNewAccountLocators.json"
import { PersonalInformationLocators, PhysicalAddressLocators, TrustedContactLocators } from "../../../Locators/Personal/PersonalInformationLocators.json";
import { FormUsageButtons } from "../../../Locators/FormUsageButtons.json";


export class CreateNewAccountPage{

    CreatePersonalAccountTypeIndividual(){
        cy.xpath(CreatePersonalAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreatePersonalAccountLocators.PersonalAccountType).select('Individual');
        cy.xpath(CreatePersonalAccountLocators.NextBtn).click()
        cy.url().should('include','/personal-info')
    }
    CreatePersonalAccountTypeJointAndSubtype_RightsOfSurvivorship(){
        cy.xpath(CreatePersonalAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreatePersonalAccountLocators.PersonalAccountType).select('Joint');
        cy.xpath(CreatePersonalAccountLocators.JointAccountType).select('Rights of Survivorship')
        cy.xpath(CreatePersonalAccountLocators.NextBtn).click()
        cy.url().should('include','/personal-info')
    }
    CreatePersonalAccountTypeJointAndSubtype_JointTenantsInCommon(){
        cy.xpath(CreatePersonalAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreatePersonalAccountLocators.PersonalAccountType).select('Joint');
        cy.xpath(CreatePersonalAccountLocators.JointAccountType).select('Joint Tenants in Common')
        cy.xpath(CreatePersonalAccountLocators.NextBtn).click()
        cy.url().should('include','/personal-info')
    }
    CreatePersonalAccountTypeJointAndSubtype_JointCommunityProperty(){
        cy.xpath(CreatePersonalAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreatePersonalAccountLocators.PersonalAccountType).select('Joint');
        cy.xpath(CreatePersonalAccountLocators.JointAccountType).select('Joint Community Property')
        cy.xpath(CreatePersonalAccountLocators.NextBtn).click()
        cy.url().should('include','/personal-info')
    }
}