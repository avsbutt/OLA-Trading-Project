import { InvestmentProfileLocators, FinancialSuitabilityLocators, PriorInvestmentExperienceLocators, ACHRelationshipLocators  } from "../../../../../Locators/Personal/InvestorProfileLocators.json"

import { FormUsageButtons } from "../../../../../Locators/FormUsageButtons.json";
import { selectRandomValueFromDropdownUtils } from "../../../../../utils/selectRandomValueFromDropdownUtils";


export class InvestmentProfilePage{
 
    // fillInvestmentProfileInfo(){
    //     cy.xpath(InvestmentProfileLocators.InvestmentObjective).select('3 - Growth & Income')
    //     cy.xpath(InvestmentProfileLocators.InvestmentExperience).select('Limited (1 to 2 years)')
    //     cy.xpath(InvestmentProfileLocators.RiskTolerance).select('High')
    //     cy.xpath(InvestmentProfileLocators.TimeHorizon).select('4 to 7 years')
    //     cy.xpath(InvestmentProfileLocators.TaxBracket).select('35%')
    // }

    fillInvestmentProfileInfo() {
        selectRandomValueFromDropdownUtils(InvestmentProfileLocators.InvestmentObjective);
        selectRandomValueFromDropdownUtils(InvestmentProfileLocators.InvestmentExperience);
        selectRandomValueFromDropdownUtils(InvestmentProfileLocators.RiskTolerance);
        selectRandomValueFromDropdownUtils(InvestmentProfileLocators.TimeHorizon);
        selectRandomValueFromDropdownUtils(InvestmentProfileLocators.InvestmentObjective);
        selectRandomValueFromDropdownUtils(InvestmentProfileLocators.TaxBracket);
    }

    fillFinancialSuitability(){
        selectRandomValueFromDropdownUtils(FinancialSuitabilityLocators.AnnualIncome);
        selectRandomValueFromDropdownUtils(FinancialSuitabilityLocators.TotalNetWorth);
        selectRandomValueFromDropdownUtils(FinancialSuitabilityLocators.LiquidityNeeds);
        selectRandomValueFromDropdownUtils(FinancialSuitabilityLocators.LiquidNetWorth);
    }
    
    fillPriorInvestmentExperience (){
        selectRandomValueFromDropdownUtils(PriorInvestmentExperienceLocators.StockYears);
        selectRandomValueFromDropdownUtils(PriorInvestmentExperienceLocators.Options);
        selectRandomValueFromDropdownUtils(PriorInvestmentExperienceLocators.MutualFunds);
        selectRandomValueFromDropdownUtils(PriorInvestmentExperienceLocators.MarginAccount);
        selectRandomValueFromDropdownUtils(PriorInvestmentExperienceLocators.MunicipalBonds);
        selectRandomValueFromDropdownUtils(PriorInvestmentExperienceLocators.CommoditiesFeatures);
        selectRandomValueFromDropdownUtils(PriorInvestmentExperienceLocators.GovernmentBonds);
        selectRandomValueFromDropdownUtils(PriorInvestmentExperienceLocators.CorporateBonds);
        selectRandomValueFromDropdownUtils(PriorInvestmentExperienceLocators.TaxShelters);
    }

    fillACHRelationship(){

    }

    SaveAndContinue(){
    cy.xpath(FormUsageButtons.SaveAndContinue).click({force: true});
    }
}