import { InvestmentProfileLocators, FinancialSuitabilityLocators, PriorInvestmentExperienceLocators, ACHRelationshipLocators  } from "../../../../../Locators/Personal/InvestorProfileLocators.json"

import { FormUsageButtons } from "../../../../../Locators/FormUsageButtons.json";
import { selectRandomOption } from "../../../../../utils/selectRandomOptionsUtils";


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
    cy.xpath(FormUsageButtons.SaveAndContinue).click({force: true});
}
}