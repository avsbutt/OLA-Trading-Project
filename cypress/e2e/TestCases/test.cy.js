import { InvestmentProfilePage } from "../Pages/Client/createNewAccount/Personal/Individual/InvestorProfilePage";
import { EmploymentInformationPage } from "../Pages/Client/createNewAccount/Personal/Individual/EmploymentInfomationPage"
import { RegulatoryItemsLocators} from "../Locators/createNewAccountLocators.json"
import { RegulatoryItemsPage } from "../Pages/Client/createNewAccount/Personal/Individual/RegulatoryItemsPage"
import { generatePersonalInfoData } from "../utils/dataGenerator";
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
          const randomData= generatePersonalInfoData();
          cy.get('#username').type('democlient')
          cy.get('#password').type('Pac@123456')
          cy.get('.btn').click()
          cy.wait(5000)
          cy.visit("#/regulatory-items")
          reg.fillOption1()
          reg.fillOption2()
          reg.fillOption3(randomData.randomWords)
          reg.fillOption4()
          reg.fillOption5(randomData.randomWords)
          reg.fillOption6()
          reg.fillOption7(randomData.randomWords)
          reg.fillOption8()
          reg.fillOption9()
          reg.fillOption10()
          
          reg.fillDirectCommunication()
          reg.SaveAndContinue()
// cy.xpath(RegulatoryItemsLocator).click()

         // testemploy.ClickOnUnemployed()



          // testInvestor.fillInvestmentProfileInfo()
          // testInvestor.fillFinancialSuitability()
          // testInvestor.fillPriorInvestmentExperience()
        
    })
})