import { InvestmentProfileLocators } from "../../../../../Locators/Personal/InvestorProfileLocators.json"
import { FinancialSuitabilityLocators} from "../../../../../Locators/Personal/InvestorProfileLocators.json";
import { PriorInvestmentExperienceLocators } from "../../../../../Locators/Personal/InvestorProfileLocators.json";
import { ACHRelationshipLocators } from "../../../../../Locators/Personal/InvestorProfileLocators.json";
import { FormUsageButtons } from "../../../../../Locators/FormUsageButtons.json";

const selectRandomOption = (locator) => {
    cy.xpath(locator).find('option').then($options => {
        const validOptions = $options.filter((index, option) => option.value !== 'Select' && option.value !== '');
        const randomIndex = Math.floor(Math.random() * validOptions.length);
        cy.xpath(locator).select(validOptions[randomIndex].value).trigger('change');
    });
};

export class InvestmentProfilePage{

    
    // fillInvestmentProfileInfo(){
    //     cy.xpath(InvestmentProfileLocators.InvestmentObjective).select('3 - Growth & Income')
    //     cy.xpath(InvestmentProfileLocators.InvestmentExperience).select('Limited (1 to 2 years)')
    //     cy.xpath(InvestmentProfileLocators.RiskTolerance).select('High')
    //     cy.xpath(InvestmentProfileLocators.TimeHorizon).select('4 to 7 years')
    //     cy.xpath(InvestmentProfileLocators.TaxBracket).select('35%')
    // }


fillInvestmentProfileInfo() {
    selectRandomOption(InvestmentProfileLocators.InvestmentObjective); // Random selection for InvestmentObjective
    selectRandomOption(InvestmentProfileLocators.InvestmentExperience); // Random selection for InvestmentExperience
    selectRandomOption(InvestmentProfileLocators.RiskTolerance); // Random selection for RiskTolerance
    selectRandomOption(InvestmentProfileLocators.TimeHorizon); // Random selection for TimeHorizon
    selectRandomOption(InvestmentProfileLocators.TaxBracket); // Random selection for TaxBracket
}


}