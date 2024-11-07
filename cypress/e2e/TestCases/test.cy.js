import { InvestmentProfilePage } from "../Pages/Client/createNewAccount/Personal/InvestorProfilePage";
import { EmploymentInformationPage } from "../Pages/Client/createNewAccount/Personal/EmploymentInfomationPage"
import { RegulatoryItemsLocators} from "../Locators/createNewAccountLocators.json"
import { RegulatoryItemsPage } from "../Pages/Client/createNewAccount/Personal/RegulatoryItemsPage"
import { dataGeneratorUtils } from "../utils/dataGeneratorUtils"
import { FormUsageButtons } from "../Locators/FormUsageButtons.json";
import { DocumentUploadPage } from "../Pages/Client/createNewAccount/Personal/DocumentUploadPage"
import { DisclosureSignaturesPage } from "../Pages/Client/createNewAccount/Personal/DisclosureSignaturesPage"
import { PersonalInformationPage} from "../Pages/Client/createNewAccount/Personal/PersonalInformationPage"
import { clientLoginUtils } from "../utils/clientLoginUtils"
import { CloseToasterIfAppearUtils } from "../utils/CloseToasterIfAppearUtils";
import { IfApplicationStatusNotCompletedThenCancelUtils } from "../utils/IfApplicationStatusNotCompletedThenCancelUtils";




//   Cypress.on('uncaught:exception', (err) => {
//     console.error('Uncaught exception:', err);
//     return false;
// });

const testInvestor = new InvestmentProfilePage
const testemploy = new EmploymentInformationPage
const reg = new RegulatoryItemsPage
const doc = new DocumentUploadPage
const sig = new DisclosureSignaturesPage
const perspnal = new PersonalInformationPage
const randomData= dataGeneratorUtils();
const countries = require("../fixtures/CountryAndStates.json")



describe('Test File', () => {
   
  
    it('Test Cases ', () => {
      clientLoginUtils()
    });

    it('Test Cases 2 ', () => {
      clientLoginUtils()
    });

    it('Test Cases 3 ', () => {
      clientLoginUtils()
    });

    it('Test Cases ', () => {
      clientLoginUtils()
    });
     // IfApplicationStatusNotCompletedThenCancelUtils()


  




        //  cy.visit("#/upload-documents")
        //    doc.UploadUtilityBillIfVisible()
        //    doc.UploadAuthorizationDocumentIfVisible()
        //    doc.UploadDrivingLiscenceIfVisible()
        //    doc.UploadGovernmentIdIfVisible()



      // cy.visit("#/disclosures-signatures")
      //     sig.FillSignature()
      //     CloseToasterIfAppearUtils()
      //     sig.AccountAgreement()
      //     sig.AccountAgreementCashAndMargin()
      //     sig.AccountLoanAgreement()
      //     sig.ClickSaveAndReview()
      //     CloseToasterIfAppearUtils()

      
        


      // cy.fixture('CountryAndStates.json').then((countryStates) => {
      //   countryStates.forEach((location) => {

      //       cy.xpath("//select[@name='countryId']") // Replace with the actual selector
      //       .select(location.country);
  
     
      //     cy.xpath("//select[@name='stateId']") // Replace with the actual selector
      //       .select(location.state);
  
      //     // Perform actions for the rest of your flow here
      //     cy.reload()
          
      //   });
      // });
    
  });
  



        // data.foreach((userdata)={
        //   cy.get('select[name="countryId"]').select(userdata.country)



     
 



       //select[@name='countryId']

          

       


          // reg.fillOption1()
          // reg.fillOption2()
          // reg.fillOption3(randomData.randomWords)
          // reg.fillOption4()
          // reg.fillOption5(randomData.randomWords)
          // reg.fillOption6()
          // reg.fillOption7(randomData.randomWords)
          // reg.fillOption8()
          // reg.fillOption9()
          // reg.fillOption10() 
          // reg.fillDirectCommunication()
          // reg.SaveAndContinue()
          // cy.xpath(RegulatoryItemsLocator).click()

          // testemploy.ClickOnUnemployed()

          // testInvestor.fillInvestmentProfileInfo()
          // testInvestor.fillFinancialSuitability()
          // testInvestor.fillPriorInvestmentExperience()