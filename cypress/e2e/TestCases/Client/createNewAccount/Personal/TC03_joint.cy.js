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


const TC_CreateNewAccountPage = new CreateNewAccountPage
const TC_PersonalInformationPage = new PersonalInformationPage
const TC_EmploymentInformationPage = new EmploymentInformationPage
const TC_InvestmentProfilePage = new InvestmentProfilePage
const TC_RegulatoryItemsPage = new RegulatoryItemsPage
const TC_AccountFeaturesPage = new AccountFeaturesPage
const TC_DocumentUploadPage = new DocumentUploadPage
const TC_DisclosureSignaturesPage = new DisclosureSignaturesPage
const TC_ReviewInfomationPage = new ReviewInfomationPage




describe('Client Side - Personal - Joint', () => {
  it('TC003_Verify that User can Create Personal Account With Type Joint & Subtype Rights Of Survivorship', () => {
    clientLoginUtils();
    waitForLoaderToDisappearUtils()
    IfApplicationStatusNotCompletedThenCancelUtils();
    CloseToasterIfAppearUtils();

    TC_CreateNewAccountPage.CreatePersonalAccountTypeJointAndSubtype_RightsOfSurvivorship()

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
      randomData.idExpirationDate,
      randomData.socialSecurityNo);
    TC_PersonalInformationPage.fillCoApplicantPersonalInformation(
      randomData.fName,
      randomData.mName,
      randomData.lName,
      randomData.email,
      randomData.nOfDependents,
      randomData.primaryTelephone,
      randomData.idNumber,
      randomData.dobYYYYMMDD,
      randomData.idIssueDate,
      randomData.idExpirationDate,
      randomData.randomNumbers);

    TC_PersonalInformationPage.fillPhysicalAddress(
      randomData.address,
      randomData.city,
      randomData.postalCode);

    TC_PersonalInformationPage.fillCoApplicantPhysicalAddress(
      randomData.address,
      randomData.city,
      randomData.postalCode);
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
        
  
    cy.url().should('include', '/employment-info')
    // TC_EmploymentInformationPage.fillEmployedInfo()
    TC_EmploymentInformationPage.ClickOnUnemployed()
    TC_EmploymentInformationPage.ClickOnCoApplicantUnemployed()  
    TC_EmploymentInformationPage.SaveAndContinue()
    waitForLoaderToDisappearUtils()
 

    cy.url().should('include','/investor-profile')
    TC_InvestmentProfilePage.fillInvestmentProfileInfo()
    TC_InvestmentProfilePage.fillFinancialSuitability()
    TC_InvestmentProfilePage.fillPriorInvestmentExperience()
    TC_InvestmentProfilePage.SaveAndContinue()


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
    //TC_RegulatoryItemsPage.fillW8Ben(randomData.randomWords, randomData.city)
    TC_RegulatoryItemsPage.SaveAndContinue()

       
    cy.url().should('include', '#/account-features')
    TC_AccountFeaturesPage.SaveAndContinue()
    CloseToasterIfAppearUtils()
    waitForLoaderToDisappearUtils()


    cy.url().should('include', '#/upload-documents')
    cy.wait(1000)
    TC_DocumentUploadPage.UploadGovernmentIdIfVisible()
    TC_DocumentUploadPage.UploadGovernmentIdIfVisibleCoApplicant()
    TC_DocumentUploadPage.UploadAuthorizationDocumentIfVisible()
    TC_DocumentUploadPage.UploadUtilityBillIfVisible()
    TC_DocumentUploadPage.UploadDrivingLiscenceIfVisible()
    TC_DocumentUploadPage.UploadPassportIfVisible()
    TC_DocumentUploadPage.SaveAndContinue()
    CloseToasterIfAppearUtils()
    waitForLoaderToDisappearUtils()


    cy.url().should('include', '#/disclosures-signatures')
    TC_DisclosureSignaturesPage.AccountAgreementCashAndMargin()
    cy.wait(1000)
    TC_DisclosureSignaturesPage.AccountLoanAgreement()
    cy.wait(1000)
    TC_DisclosureSignaturesPage.AccountAgreement()
    cy.wait(1000)
    TC_DisclosureSignaturesPage.FillSignature()
    TC_DisclosureSignaturesPage.FillCoApplicantSignature()
    TC_DisclosureSignaturesPage.ClickSaveAndReview()
    CloseToasterIfAppearUtils()
    
       

    cy.url().should('include', '#/review')
    TC_ReviewInfomationPage.ClickOnSubmitBtn()
    cy.url().should('include', '#/dashboard')

  });


  it('TC004_Verify that User can Create Personal Account With Type Joint & Subtye Joint Tenants in Common ', ()=>{

  })

  it('TC003_Verify that User can Create Personal Account With Type Joint & Subtype Joint Community Property', ()=>{
      
  })

   
}); 