import { UnEmployedLocators } from "../Locators/Personal/EmploymentInformationLocators.json"
import { InvestmentProfilePage } from "../Pages/Client/createNewAccount/Personal/Individual/InvestorProfilePage";
import { EmploymentInformationPage } from "../Pages/Client/createNewAccount/Personal/Individual/EmploymentInfomationPage"
import { RegulatoryItemsPage } from "../Pages/Client/createNewAccount/Personal/Individual/RegulatoryItemsPage"
import { FormUsageButtons } from "../Locators/FormUsageButtons.json";
describe ('Test', ()=>{
const testInvestor = new InvestmentProfilePage
const testemploy = new EmploymentInformationPage
const reg = new RegulatoryItemsPage
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
          cy.visit("#/regulatory-items")
          reg.fillOption1()
          reg.fillOption2()
          reg.fillOption3()

         // testemploy.ClickOnUnemployed()



          // testInvestor.fillInvestmentProfileInfo()
          // testInvestor.fillFinancialSuitability()
          // testInvestor.fillPriorInvestmentExperience()
        
    })
})