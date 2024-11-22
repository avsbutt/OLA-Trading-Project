import { CreatePersonalAccountLocators, CreateEntityAccountLocators, CreateRetirementAccountLocators} from "../../../Locators/createNewAccountLocators.json"
import { PersonalInformationLocators, PhysicalAddressLocators, TrustedContactLocators } from "../../../Locators/Personal/PersonalInformationLocators.json";
import { FormUsageButtons } from "../../../Locators/FormUsageButtons.json";


export class CreateNewAccountPage{

    CreatePersonalAccount_TypeIndividual(){
        cy.xpath(CreatePersonalAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreatePersonalAccountLocators.PersonalAccountType).select('Individual');
        cy.xpath(CreatePersonalAccountLocators.NextBtn).click()
        cy.url().should('include','/personal-info')
    }
    CreatePersonalAccount_TypeJointAndSubtype_RightsOfSurvivorship(){
        cy.xpath(CreatePersonalAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreatePersonalAccountLocators.PersonalAccountType).select('Joint');
        cy.xpath(CreatePersonalAccountLocators.JointAccountType).select('Rights of Survivorship')
        cy.xpath(CreatePersonalAccountLocators.NextBtn).click()
        cy.url().should('include','/personal-info')
    }
    CreatePersonalAccount_TypeJointAndSubtype_JointTenantsInCommon(){
        cy.xpath(CreatePersonalAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreatePersonalAccountLocators.PersonalAccountType).select('Joint');
        cy.xpath(CreatePersonalAccountLocators.JointAccountType).select('Joint Tenants in Common')
        cy.xpath(CreatePersonalAccountLocators.NextBtn).click()
        cy.url().should('include','/personal-info')
    }
    CreatePersonalAccount_TypeJointAndSubtype_JointCommunityProperty(){
        cy.xpath(CreatePersonalAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreatePersonalAccountLocators.PersonalAccountType).select('Joint');
        cy.xpath(CreatePersonalAccountLocators.JointAccountType).select('Joint Community Property')
        cy.xpath(CreatePersonalAccountLocators.NextBtn).click()
        cy.url().should('include','/personal-info')
    }
    CreateEntityAccount_TypeCorporation(){
        cy.xpath(CreateEntityAccountLocators.CreateNewAccount).click({force: true})
        cy.wait(1000)
        cy.xpath(CreateEntityAccountLocators.Entity).click()
        cy.wait(500)
        cy.xpath(CreateEntityAccountLocators.EntityAccountType).select('Corporation').should('have.value', '2430')
        cy.xpath(CreateEntityAccountLocators.NextBtn).click()
    }
    CreateEntityAccount_TypeLLC(){
        cy.xpath(CreateEntityAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateEntityAccountLocators.Entity).click()
        cy.xpath(CreateEntityAccountLocators.EntityAccountType).select('LLC')
        cy.xpath(CreateEntityAccountLocators.NextBtn).click()
    }
    CreateEntityAccount_TypeSCorporation(){
        cy.xpath(CreateEntityAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateEntityAccountLocators.Entity).click()
        cy.xpath(CreateEntityAccountLocators.EntityAccountType).select('S Corporation')
        cy.xpath(CreateEntityAccountLocators.NextBtn).click()
    }
    CreateEntityAccount_TypePartnership(){
        cy.xpath(CreateEntityAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateEntityAccountLocators.Entity).click()
        cy.xpath(CreateEntityAccountLocators.EntityAccountType).select('Partnership')
        cy.xpath(CreateEntityAccountLocators.NextBtn).click()
    }
    CreateEntityAccount_TypeTrust(){
        cy.xpath(CreateEntityAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateEntityAccountLocators.Entity).click()
        cy.xpath(CreateEntityAccountLocators.EntityAccountType).select('Trust')
        cy.xpath(CreateEntityAccountLocators.NextBtn).click()
    }


}
