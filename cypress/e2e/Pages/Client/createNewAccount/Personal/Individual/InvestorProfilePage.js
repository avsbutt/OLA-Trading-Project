import { InvestmentProfileLocators } from "../../../../../Locators/Personal/InvestorProfileLocators.json"
import { FinancialSuitabilityLocators} from "../../../../../Locators/Personal/InvestorProfileLocators.json";
import { PriorInvestmentExperienceLocators } from "../../../../../Locators/Personal/InvestorProfileLocators.json";
import { ACHRelationshipLocators } from "../../../../../Locators/Personal/InvestorProfileLocators.json";
import { FormUsageButtons } from "../../../../../Locators/FormUsageButtons.json";

export function selectRandomOption(locator) {
    cy.xpath(locator).should('be.visible').then($select => {
        cy.wrap($select).children('option').should('have.length.greaterThan', 1).then(options => {
            // Start random selection from index 1, skipping the first "Select" option
            const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;
            const value = options[randomIndex].value;
            cy.wrap($select).select(value); // Select the value of the randomly selected option
        });
    });
}
export class InvestmentProfilePage{
 
    // fillInvestmentProfileInfo(){
    //     cy.xpath(InvestmentProfileLocators.InvestmentObjective).select('3 - Growth & Income')
    //     cy.xpath(InvestmentProfileLocators.InvestmentExperience).select('Limited (1 to 2 years)')
    //     cy.xpath(InvestmentProfileLocators.RiskTolerance).select('High')
    //     cy.xpath(InvestmentProfileLocators.TimeHorizon).select('4 to 7 years')
    //     cy.xpath(InvestmentProfileLocators.TaxBracket).select('35%')
    // }

    fillInvestmentProfileInfo() {
        selectRandomOption(InvestmentProfileLocators.InvestmentObjective);
        selectRandomOption(InvestmentProfileLocators.InvestmentExperience);
        selectRandomOption(InvestmentProfileLocators.RiskTolerance);
        selectRandomOption(InvestmentProfileLocators.TimeHorizon);
        selectRandomOption(InvestmentProfileLocators.TaxBracket);
    }

fillFinancialSuitability(){
    selectRandomOption(FinancialSuitabilityLocators.AnnualIncome);
    selectRandomOption(FinancialSuitabilityLocators.TotalNetWorth);
    selectRandomOption(FinancialSuitabilityLocators.LiquidityNeeds);
    selectRandomOption(FinancialSuitabilityLocators.LiquidNetWorth);
}
fillPriorInvestmentExperience (){
    selectRandomOption(PriorInvestmentExperienceLocators.StockYears);
    selectRandomOption(PriorInvestmentExperienceLocators.Options);
    selectRandomOption(PriorInvestmentExperienceLocators.MutualFunds);
    selectRandomOption(PriorInvestmentExperienceLocators.MarginAccount);
    selectRandomOption(PriorInvestmentExperienceLocators.MunicipalBonds);
    selectRandomOption(PriorInvestmentExperienceLocators.CommoditiesFeatures);
    selectRandomOption(PriorInvestmentExperienceLocators.GovernmentBonds);
    selectRandomOption(PriorInvestmentExperienceLocators.CorporateBonds);
    selectRandomOption(PriorInvestmentExperienceLocators.TaxShelters);
}

fillACHRelationship(){

}
SaveAndContinue(){
    cy.xpath(FormUsageButtons.SaveAndContinue).click();
}


}