import { CreatePersonalAccountLocators, CreateEntityAccountLocators, CreateRetirementAccountLocators} from "../../../Locators/createNewAccountLocators.json"

export class CreateNewAccountPage{

    //    ######-----PERSONAL ACCOUNT------######

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


    //    ######-----ENTITY ACCOUNT------######

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
        cy.wait(500)
        cy.xpath(CreateEntityAccountLocators.EntityAccountType).select('LLC')
        cy.xpath(CreateEntityAccountLocators.NextBtn).click()
    }
    CreateEntityAccount_TypeSCorporation(){
        cy.xpath(CreateEntityAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateEntityAccountLocators.Entity).click()
        cy.wait(500)
        cy.xpath(CreateEntityAccountLocators.EntityAccountType).select('S Corporation')
        cy.xpath(CreateEntityAccountLocators.NextBtn).click()
    }
    CreateEntityAccount_TypeLimitedPartnership(){
        cy.xpath(CreateEntityAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateEntityAccountLocators.Entity).click()
        cy.wait(500)
        cy.xpath(CreateEntityAccountLocators.EntityAccountType).select('Limited Partnership')
        cy.xpath(CreateEntityAccountLocators.NextBtn).click()
    }
    CreateEntityAccount_TypeTrust(){
        cy.xpath(CreateEntityAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateEntityAccountLocators.Entity).click()
        cy.wait(500)
        cy.xpath(CreateEntityAccountLocators.EntityAccountType).select('Trust')
        cy.xpath(CreateEntityAccountLocators.NextBtn).click()
    }
    CreateEntityAccount_TypeNonProfit(){
        cy.xpath(CreateEntityAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateEntityAccountLocators.Entity).click()
        cy.wait(500)
        cy.xpath(CreateEntityAccountLocators.EntityAccountType).select('Non-Profit')
        cy.xpath(CreateEntityAccountLocators.NextBtn).click()
    }


    //    ######-----RETIREMENT ACCOUNT------######

    CreateRetirementAccount_TypeTraditionalIRA(){
        cy.xpath(CreateRetirementAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateRetirementAccountLocators.Retirement).click()
        cy.wait(500)
        cy.xpath(CreateRetirementAccountLocators.RetirementAccountType).select('Traditional IRA')
        cy.xpath(CreateRetirementAccountLocators.NextBtn).click()
    }

    CreateRetirementAccount_TypeRothIRA(){
        cy.xpath(CreateRetirementAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateRetirementAccountLocators.Retirement).click()
        cy.wait(500)
        cy.xpath(CreateRetirementAccountLocators.RetirementAccountType).select('Roth IRA')
        cy.xpath(CreateRetirementAccountLocators.NextBtn).click()
    }

    CreateRetirementAccount_TypeSimpleIRAParticipant(){
        cy.xpath(CreateRetirementAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateRetirementAccountLocators.Retirement).click()
        cy.wait(500)
        cy.xpath(CreateRetirementAccountLocators.RetirementAccountType).select('Simple IRA Participant')
        cy.xpath(CreateRetirementAccountLocators.NextBtn).click()
    }

    CreateRetirementAccount_TypeBeneficiaryRothIRA(){
        cy.xpath(CreateRetirementAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateRetirementAccountLocators.Retirement).click()
        cy.wait(500)
        cy.xpath(CreateRetirementAccountLocators.RetirementAccountType).select('Beneficiary Roth IRA')
        cy.xpath(CreateRetirementAccountLocators.NextBtn).click()
    }

    CreateRetirementAccount_TypeBeneficiaryTraditionalIRA(){
        cy.xpath(CreateRetirementAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateRetirementAccountLocators.Retirement).click()
        cy.wait(500)
        cy.xpath(CreateRetirementAccountLocators.RetirementAccountType).select('Beneficiary Traditional IRA')
        cy.xpath(CreateRetirementAccountLocators.NextBtn).click()
    }

    CreateRetirementAccount_TypeRolloverIRA(){
        cy.xpath(CreateRetirementAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateRetirementAccountLocators.Retirement).click()
        cy.wait(500)
        cy.xpath(CreateRetirementAccountLocators.RetirementAccountType).select('Rollover IRA')
        cy.xpath(CreateRetirementAccountLocators.NextBtn).click()
    }

    CreateRetirementAccount_TypeSEPIRA(){
        cy.xpath(CreateRetirementAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateRetirementAccountLocators.Retirement).click()
        cy.wait(500)
        cy.xpath(CreateRetirementAccountLocators.RetirementAccountType).select('SEP IRA')
        cy.xpath(CreateRetirementAccountLocators.NextBtn).click()
    }





}
