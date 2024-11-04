import { clientLoginUtils } from "../../../../utils/clientLoginUtils"
import { PersonalInformationPage } from "../../../../Pages/Client/createNewAccount/Personal/Individual/PersonalInformationPage"
import { EmploymentInformationPage } from "../../../../Pages/Client/createNewAccount/Personal/Individual/EmploymentInfomationPage"
import { dataGeneratorUtils } from "../../../../utils/dataGeneratorUtils";
import { InvestmentProfilePage } from "../../../../Pages/Client/createNewAccount/Personal/Individual/InvestorProfilePage";
import { RegulatoryItemsPage } from "../../../../Pages/Client/createNewAccount/Personal/Individual/RegulatoryItemsPage"
import { AccountFeaturesPage} from "../../../../Pages/Client/createNewAccount/Personal/Individual/AccountFeaturesPage"
import { DocumentUploadPage } from "../../../../Pages/Client/createNewAccount/Personal/Individual/DocumentUploadPage"
import { DisclosureSignaturesPage } from "../../../../Pages/Client/createNewAccount/Personal/Individual/DisclosureSignaturesPage"
import{ ReviewInfomationPage } from "../../../../Pages/Client/createNewAccount/Personal/Individual/ReviewInformationPage"
import { CloseToasterIfAppearUtils } from "../../../../utils/CloseToasterIfAppearUtils";
import { IfApplicationStatusNotCompletedThenCancelUtils } from "../../../../utils/IfApplicationStatusNotCompletedThenCancelUtils";
import { CreateNewAccountPage } from "../../../../Pages/Client/createNewAccount/CreateNewAccountPage"
import { waitForLoaderToDisappearUtils } from "../../../../utils/waitForLoaderToDisappearUtils";

const TC_PersonalInformationPage = new PersonalInformationPage
const TC_EmploymentInformationPage = new EmploymentInformationPage
const TC_InvestmentProfilePage = new InvestmentProfilePage
const TC_RegulatoryItemsPage = new RegulatoryItemsPage
const TC_AccountFeaturesPage = new AccountFeaturesPage
const TC_DocumentUploadPage = new DocumentUploadPage
const TC_DisclosureSignaturesPage = new DisclosureSignaturesPage
const TC_ReviewInfomationPage = new ReviewInfomationPage
const TC_CreateNewAccountPage = new CreateNewAccountPage


beforeEach(() => {
    clientLoginUtils()
});


describe('DDT - Client - Individual', () => {
  it('TC002_Verify that User can Create Personal Account With SubType Individual', () => {
    cy.fixture('CountryAndStates.json').then((countryStates) => {
      countryStates.forEach((location) => {
      
        waitForLoaderToDisappearUtils()
        IfApplicationStatusNotCompletedThenCancelUtils();
        CloseToasterIfAppearUtils();
        TC_CreateNewAccountPage.CreatePersonalAccountTypeIndividual()
        CloseToasterIfAppearUtils();

        const randomData= dataGeneratorUtils();
        cy.writeFile('cypress/e2e/fixtures/PersonInfoData.json', randomData)
        TC_PersonalInformationPage.fillPersonalInformation(
          randomData.fName,
          randomData.mName,
          randomData.lName,
          randomData.email,
          randomData.nOfDependents,
          randomData.primaryTelephone,
          randomData.idNumber,
          randomData.dobYYYYMMDD,
          randomData.idIssueDate,
          randomData.idExpirationDate);
        TC_PersonalInformationPage.fillPersonalInformation_isUSCitizenYes(randomData.socialSecurityNo)
        TC_PersonalInformationPage.fillPhysicalAddress(
          randomData.address,
          randomData.city,
          randomData.postalCode);

        cy.xpath("//select[@name='countryId']").select(location.country);
        cy.xpath("//select[@name='stateId']") .select(location.state);



        TC_PersonalInformationPage.fillTrustedContact(
          randomData.trustedFirstName,
          randomData.trustedLastName,
          randomData.trustedTelephone,
          randomData.trustedEmail,
          randomData.trustedMailingAddress1,
          randomData.trustedCity,
          randomData.trustedPostalCode);
        TC_PersonalInformationPage.SaveAndContinue();
        waitForLoaderToDisappearUtils()
        

     
        cy.url().should('include', '/employment-info');
        TC_EmploymentInformationPage.ClickOnUnemployed();   
        TC_EmploymentInformationPage.SaveAndContinue();
        waitForLoaderToDisappearUtils()

 
        cy.url().should('include','/investor-profile')
        TC_InvestmentProfilePage.fillInvestmentProfileInfo();
        TC_InvestmentProfilePage.fillFinancialSuitability();
        TC_InvestmentProfilePage.fillPriorInvestmentExperience(); 
        TC_InvestmentProfilePage.SaveAndContinue();
        waitForLoaderToDisappearUtils()


        cy.url().should('include', '/regulatory-items')
        cy.wait(1000)
        TC_RegulatoryItemsPage.fillOption1()
        cy.wait(1000)
        TC_RegulatoryItemsPage.fillOption2()
        TC_RegulatoryItemsPage.fillOption3(randomData.randomWords)
        TC_RegulatoryItemsPage.fillOption4()
        TC_RegulatoryItemsPage.fillOption5(randomData.randomWords)
        TC_RegulatoryItemsPage.fillOption6()
        TC_RegulatoryItemsPage.fillOption7(randomData.randomWords)
        TC_RegulatoryItemsPage.fillOption8()
        TC_RegulatoryItemsPage.fillOption9()
        TC_RegulatoryItemsPage.fillOption10()
        TC_RegulatoryItemsPage.fillDirectCommunication()
        TC_RegulatoryItemsPage.SaveAndContinue()
        waitForLoaderToDisappearUtils()

       
        cy.url().should('include', '#/account-features')
        TC_AccountFeaturesPage.SaveAndContinue()
        CloseToasterIfAppearUtils();
        waitForLoaderToDisappearUtils()
      


              
        cy.url().should('include', '#/upload-documents')
        TC_DocumentUploadPage.UploadGovernmentIdIfVisible()
        TC_DocumentUploadPage.UploadAuthorizationDocumentIfVisible()
        TC_DocumentUploadPage.UploadUtilityBillIfVisible()
        TC_DocumentUploadPage.UploadDrivingLiscenceIfVisible()
        TC_DocumentUploadPage.UploadPassportIfVisible()
        TC_DocumentUploadPage.SaveAndContinue()
        CloseToasterIfAppearUtils();
        waitForLoaderToDisappearUtils()
       

        cy.url().should('include', '#/disclosures-signatures')
        TC_DisclosureSignaturesPage.AccountAgreementCashAndMargin()
        cy.wait(1000)
        TC_DisclosureSignaturesPage.AccountLoanAgreement()
        cy.wait(1000)
        TC_DisclosureSignaturesPage.AccountAgreement()
        cy.wait(1000)
        TC_DisclosureSignaturesPage.FillSignature()
        TC_DisclosureSignaturesPage.ClickSaveAndReview()
        CloseToasterIfAppearUtils();


        cy.url().should('include', '#/review')
        // cy.xpath("(//div[@class='col-lg-12'])[3]").contains('Country').siblings('td').invoke('text').should('have.text', location.country);    //Verify the Country from the (Loop) fixture file on Review Page
        // cy.xpath("(//div[@class='col-lg-12'])[3]").contains('State').siblings('td').invoke('text').should('have.text', location.state);        //Verify the State from the (Loop) fixture file on Review Page


        TC_ReviewInfomationPage.ClickOnSubmitBtn()
        cy.url().should('include', '#/dashboard')    
     
      })

    })
   
  })

})