import { UnEmployedLocators } from "../Locators/Personal/EmploymentInformationLocators.json"
import { InvestmentProfilePage } from "../Pages/Client/createNewAccount/Personal/Individual/InvestorProfilePage";
import { FormUsageButtons } from "../Locators/FormUsageButtons.json";
describe ('Test', ()=>{
const testInvestor = new InvestmentProfilePage
    it('User can type signature', ()=>{
        cy.visit("", {
            failOnStatusCode: false,
            auth: {
              username: 'ola-staging',
              password: 'Atlasclear@123/'
            }
          })
          
          cy.get('#username').type('democlient')
          cy.get('#password').type('Pac@123456')
          cy.get('.btn').click()
          cy.wait(5000)
          cy.visit("#/investor-profile")
          testInvestor.fillInvestmentProfileInfo()
          testInvestor.fillFinancialSuitability()
          testInvestor.fillPriorInvestmentExperience()
        
    })
})