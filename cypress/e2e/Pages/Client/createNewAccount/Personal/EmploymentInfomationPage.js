import { EmployedLocators, CoApplicantEmployedLocators, UnEmployedLocators, CoApplicantUnEmployedLocators, RetiredLocators, CoApplicantRetiredLocators } from "../../../../Locators/Personal/EmploymentInformationLocators.json"
import { FormUsageButtons } from "../../../../Locators/FormUsageButtons.json";

export class EmploymentInformationPage{


    fillEmployedInfo(){
        cy.xpath(EmployedLocators.Employed).click()
        cy.xpath(EmployedLocators.Employer).clear().type('Digital Sol')
        cy.xpath(EmployedLocators.YearsEmployed).clear().type('10')
        cy.xpath(EmployedLocators.Position).clear().type('QA Manager')
        cy.xpath(EmployedLocators.EmployerAddress1).clear().type('NASTP Building Airport Road, Block 5')
        cy.xpath(EmployedLocators.EmployerAddress2).clear().type('Mezaine Floor Office 505')
        // cy.xpath(EmployedLocators.Country).select('Unites States')
        cy.xpath(EmployedLocators.State).select('Florida')
        cy.xpath(EmployedLocators.City).clear().type('Miami')
        cy.xpath(EmployedLocators.ZipCode).clear().type('458787')
        cy.wait(100)
    }

    ClickOnUnemployed(){
        cy.reload(true); // Forces a hard reload, ignoring cache
        // cy.xpath(EmployedLocators.Employed).click()
        cy.xpath(UnEmployedLocators.Unemployed).should('be.visible').realHover()
        cy.xpath(UnEmployedLocators.Unemployed).click({ force: true });
        cy.xpath(UnEmployedLocators.Unemployed).dblclick()
    }

    ClickOnCoApplicantUnemployed(){
        // cy.reload(true); // Forces a hard reload, ignoring cache
        // cy.xpath(CoApplicantUnEmployedLocators.Employed).click()
        cy.xpath(CoApplicantUnEmployedLocators.Unemployed).should('be.visible').realHover()
        cy.xpath(CoApplicantUnEmployedLocators.Unemployed).click({ force: true });
        cy.xpath(CoApplicantUnEmployedLocators.Unemployed).dblclick()
    }

    SaveAndContinue(){
        cy.xpath(FormUsageButtons.SaveAndContinue).click({ force: true });
    }  

}