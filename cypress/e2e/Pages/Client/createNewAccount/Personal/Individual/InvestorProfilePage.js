import { InvestmentProfileLocators } from "../../../../../Locators/Personal/InvestorProfileLocators.json"
import { FinancialSuitabilityLocators} from "../../../../../Locators/Personal/InvestorProfileLocators.json";
import { PriorInvestmentExperienceLocators } from "../../../../../Locators/Personal/InvestorProfileLocators.json";
import { ACHRelationshipLocators } from "../../../../../Locators/Personal/InvestorProfileLocators.json";
import { FormUsageButtons } from "../../../../../Locators/FormUsageButtons.json";

export class InvestmentProfilePage{
    fillInvestmentProfileInfo(){
        cy.xpath(InvestmentProfileLocators.InvestmentObjective).select('3 - Growth & Income')
        cy.xpath(InvestmentProfileLocators.InvestmentExperience).select('Limited (1 to 2 years)')
        cy.xpath(InvestmentProfileLocators.RiskTolerance).select('High')
        cy.xpath(InvestmentProfileLocators.TimeHorizon).select('4 to 7 years')
        cy.xpath(InvestmentProfileLocators.TaxBracket).select('35%')
        
    }
}