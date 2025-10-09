import { CreatePersonalAccountLocators, CreateEntityAccountLocators, CreateRetirementAccountLocators} from "@Locators/createNewAccountLocators.json"

export class CreateNewAccountPage{

    //    ######-----PERSONAL ACCOUNT------######

    CreatePersonalAccount_TypeIndividual(){
        cy.xpath(CreatePersonalAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreatePersonalAccountLocators.PersonalAccountType).focus().select('Individual');
        cy.xpath(CreatePersonalAccountLocators.NextBtn).click()
        cy.url().should('include','/personal-info')
    }
    CreatePersonalAccount_TypeJointAndSubtype_RightsOfSurvivorship(){
        cy.xpath(CreatePersonalAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreatePersonalAccountLocators.PersonalAccountType).select('Joint');
        cy.xpath(CreatePersonalAccountLocators.JointAccountType).focus().select('Rights of Survivorship')
        cy.xpath(CreatePersonalAccountLocators.NextBtn).click()
        cy.url().should('include','/personal-info')
    }
    CreatePersonalAccount_TypeJointAndSubtype_JointTenantsInCommon(){
        cy.xpath(CreatePersonalAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreatePersonalAccountLocators.PersonalAccountType).select('Joint');
        cy.xpath(CreatePersonalAccountLocators.JointAccountType).focus().select('Joint Tenants in Common')
        cy.xpath(CreatePersonalAccountLocators.NextBtn).click()
        cy.url().should('include','/personal-info')
    }
    CreatePersonalAccount_TypeJointAndSubtype_JointCommunityProperty(){
        cy.xpath(CreatePersonalAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreatePersonalAccountLocators.PersonalAccountType).select('Joint');
        cy.xpath(CreatePersonalAccountLocators.JointAccountType).focus().select('Joint Community Property')
        cy.xpath(CreatePersonalAccountLocators.NextBtn).click()
        cy.url().should('include','/personal-info')
    }


    //    ######-----ENTITY ACCOUNT------######

    CreateEntityAccount_TypeCorporation(){
        cy.xpath(CreateEntityAccountLocators.CreateNewAccount).click({force: true})
        cy.wait(1000)
        cy.xpath(CreateEntityAccountLocators.Entity).click()
        cy.wait(500)
        cy.xpath(CreateEntityAccountLocators.EntityAccountType).focus().select('Corporation').trigger('change').should('have.value', '2430')
        cy.xpath(CreateEntityAccountLocators.NextBtn).click()
    }
    CreateEntityAccount_TypeLLC(){
        cy.xpath(CreateEntityAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateEntityAccountLocators.Entity).click()
        cy.wait(500)
        cy.xpath(CreateEntityAccountLocators.EntityAccountType).focus().select('LLC').trigger('change'); 
        cy.xpath(CreateEntityAccountLocators.NextBtn).click()
    }
    CreateEntityAccount_TypeSCorporation(){
        cy.xpath(CreateEntityAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateEntityAccountLocators.Entity).click()
        cy.wait(500)
        cy.xpath(CreateEntityAccountLocators.EntityAccountType).focus().select('S Corporation').trigger('change'); 
        cy.xpath(CreateEntityAccountLocators.NextBtn).click()
    }
    CreateEntityAccount_TypeLimitedPartnership(){
        cy.xpath(CreateEntityAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateEntityAccountLocators.Entity).click()
        cy.wait(500)
        cy.xpath(CreateEntityAccountLocators.EntityAccountType).focus().select('Limited Partnership').trigger('change'); 
        cy.xpath(CreateEntityAccountLocators.NextBtn).click()
    }
    CreateEntityAccount_TypeTrust(){
        cy.xpath(CreateEntityAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateEntityAccountLocators.Entity).click()
        cy.wait(500)
        cy.xpath(CreateEntityAccountLocators.EntityAccountType).focus().select('Trust').trigger('change'); 
        cy.xpath(CreateEntityAccountLocators.NextBtn).click()
    }
    CreateEntityAccount_TypeNonProfit(){
        cy.xpath(CreateEntityAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateEntityAccountLocators.Entity).click()
        cy.wait(500)
        cy.xpath(CreateEntityAccountLocators.EntityAccountType).focus().select('Non-Profit').trigger('change'); 
        cy.xpath(CreateEntityAccountLocators.NextBtn).click()
    }


    //    ######-----RETIREMENT ACCOUNT------######

    CreateRetirementAccount_TypeTraditionalIRA(){
        cy.xpath(CreateRetirementAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateRetirementAccountLocators.Retirement).click()
        cy.wait(2000)
        cy.xpath(CreateRetirementAccountLocators.RetirementAccountType).focus().select('Traditional IRA').trigger('change'); 
        cy.xpath(CreateRetirementAccountLocators.NextBtn).click()
    }

    CreateRetirementAccount_TypeRothIRA(){
        cy.xpath(CreateRetirementAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateRetirementAccountLocators.Retirement).click()
        cy.wait(2000)
        cy.xpath(CreateRetirementAccountLocators.RetirementAccountType).focus().select('Roth IRA').trigger('change'); 
        cy.xpath(CreateRetirementAccountLocators.NextBtn).click()
    }

    CreateRetirementAccount_TypeSimpleIRAParticipant(){
        cy.xpath(CreateRetirementAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateRetirementAccountLocators.Retirement).click()
        cy.wait(1000)
        cy.get('select.form-select').click({ force: true })
        cy.xpath(CreateRetirementAccountLocators.RetirementAccountType).focus().select('Simple IRA Participant').trigger('change'); 
        cy.xpath(CreateRetirementAccountLocators.NextBtn).click()
    }

    CreateRetirementAccount_TypeBeneficiaryRothIRA(){
        cy.xpath(CreateRetirementAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateRetirementAccountLocators.Retirement).click()
        cy.wait(1000)
        cy.get('select.form-select').click({ force: true })
        cy.xpath(CreateRetirementAccountLocators.RetirementAccountType).focus().select('Beneficiary Roth IRA').trigger('change'); 
        cy.xpath(CreateRetirementAccountLocators.NextBtn).click()
    }

    CreateRetirementAccount_TypeBeneficiaryTraditionalIRA(){
        cy.xpath(CreateRetirementAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateRetirementAccountLocators.Retirement).click()
        cy.wait(1000)
        cy.get('select.form-select').click({ force: true })
        cy.xpath(CreateRetirementAccountLocators.RetirementAccountType).focus().select('Beneficiary Traditional IRA').trigger('change'); 
        cy.xpath(CreateRetirementAccountLocators.NextBtn).click()
    }

    CreateRetirementAccount_TypeRolloverIRA(){
        cy.xpath(CreateRetirementAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateRetirementAccountLocators.Retirement).click()
        cy.wait(1000)
        cy.get('select.form-select').click({ force: true })
        cy.xpath(CreateRetirementAccountLocators.RetirementAccountType).focus().select('Rollover IRA').trigger('change'); 
        cy.xpath(CreateRetirementAccountLocators.NextBtn).click()
    }

    CreateRetirementAccount_TypeSEPIRA(){
        cy.xpath(CreateRetirementAccountLocators.CreateNewAccount).click({force: true})
        cy.xpath(CreateRetirementAccountLocators.Retirement).click()
        cy.wait(1000)
        cy.xpath(CreateRetirementAccountLocators.RetirementAccountType).vfocus().select('SEP IRA').trigger('change'); 
        cy.xpath(CreateRetirementAccountLocators.NextBtn).click()
    }





}
