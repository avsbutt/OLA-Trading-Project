import { clientLoginUtils } from "../../../../utils/clientLoginUtils"
import { PersonalInformationPage } from "../../../../Pages/Client/createNewAccount/Personal/PersonalInformationPage"
import { EmploymentInformationPage } from "../../../../Pages/Client/createNewAccount/Personal/EmploymentInfomationPage"
import { dataGeneratorUtils } from "../../../../utils/dataGeneratorUtils";
import { InvestmentProfilePage } from "../../../../Pages/Client/createNewAccount/Personal/InvestorProfilePage";
import { RegulatoryItemsPage } from "../../../../Pages/Client/createNewAccount/Personal/RegulatoryItemsPage"
import { AccountFeaturesPage} from "../../../../Pages/Client/createNewAccount/Personal/AccountFeaturesPage"
import { DocumentUploadPage } from "../../../../Pages/Client/createNewAccount/Personal/DocumentUploadPage"
import { DisclosureSignaturesPage } from "../../../../Pages/Client/createNewAccount/Personal/DisclosureSignaturesPage"
import{ ReviewInfomationPage } from "../../../../Pages/Client/createNewAccount/Personal/ReviewInformationPage"
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



describe('Client - Personal - Individual', () => {


  beforeEach(() => {

    clientLoginUtils();
    waitForLoaderToDisappearUtils()
    IfApplicationStatusNotCompletedThenCancelUtils()
    CloseToasterIfAppearUtils()

  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  

  it('Verify that US Citizen User can Create New Personal Account || ID Type #Driver License', () => {

    TC_CreateNewAccountPage.CreatePersonalAccount_TypeIndividual();
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
    TC_PersonalInformationPage.FromPersonalInformationSelect_isUSCitizenYes(randomData.socialSecurityNo)
    TC_PersonalInformationPage.FromPersonalInformationSelect_IDType_DriverLicense()
    TC_PersonalInformationPage.fillPhysicalAddress(
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
    TC_PersonalInformationPage.SaveAndContinue()
    waitForLoaderToDisappearUtils()
        

       
    cy.url().should('include', '/employment-info')
    //  TC_EmploymentInformationPage.fillEmployedInfo()
    TC_EmploymentInformationPage.ClickOnUnemployed()
    TC_EmploymentInformationPage.SaveAndContinue()
   waitForLoaderToDisappearUtils()
 

    cy.url().should('include','/investor-profile')
    TC_InvestmentProfilePage.fillInvestmentProfileInfo()
    TC_InvestmentProfilePage.fillFinancialSuitability()
    TC_InvestmentProfilePage.fillPriorInvestmentExperience()
    TC_InvestmentProfilePage.SaveAndContinue()
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
    // TC_RegulatoryItemsPage.fillW8Ben_ForForeignAccounts(randomData.randomWords, randomData.city)
    TC_RegulatoryItemsPage.SaveAndContinue()
    waitForLoaderToDisappearUtils()

      
    cy.url().should('include', '#/account-features')
    TC_AccountFeaturesPage.SaveAndContinue()
    CloseToasterIfAppearUtils()
    waitForLoaderToDisappearUtils()


    cy.url().should('include', '#/upload-documents')
    // TC_DocumentUploadPage.GovernmentIDUploadFor_Personal()
    // TC_DocumentUploadPage.UploadAuthorizationDocumentIfVisible()
    // TC_DocumentUploadPage.UploadUtilityBillIfVisible()
    TC_DocumentUploadPage.UploadDrivingLiscenceFor_Personal()
    // TC_DocumentUploadPage.UploadPassportFor_Personal()
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
   // waitForLoaderToDisappearUtils()


    cy.url().should('include', '#/review')
    TC_ReviewInfomationPage.ClickOnSubmitBtn()
    cy.url().should('include', '#/dashboard')

  })

  it('Verify that US Citizen User can Create New Personal Account || ID Type #Passport', () => {

    TC_CreateNewAccountPage.CreatePersonalAccount_TypeIndividual();
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
    TC_PersonalInformationPage.FromPersonalInformationSelect_isUSCitizenYes(randomData.socialSecurityNo)
    TC_PersonalInformationPage.FromPersonalInformationSelect_IDType_Passport()
    TC_PersonalInformationPage.fillPhysicalAddress(
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
    TC_PersonalInformationPage.SaveAndContinue()
    waitForLoaderToDisappearUtils()
        

       
    cy.url().should('include', '/employment-info')
    //  TC_EmploymentInformationPage.fillEmployedInfo()
    TC_EmploymentInformationPage.ClickOnUnemployed()
    TC_EmploymentInformationPage.SaveAndContinue()
   waitForLoaderToDisappearUtils()
 

    cy.url().should('include','/investor-profile')
    TC_InvestmentProfilePage.fillInvestmentProfileInfo()
    TC_InvestmentProfilePage.fillFinancialSuitability()
    TC_InvestmentProfilePage.fillPriorInvestmentExperience()
    TC_InvestmentProfilePage.SaveAndContinue()
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
    // TC_RegulatoryItemsPage.fillW8Ben_ForForeignAccounts(randomData.randomWords, randomData.city)
    TC_RegulatoryItemsPage.SaveAndContinue()
    waitForLoaderToDisappearUtils()

      
    cy.url().should('include', '#/account-features')
    TC_AccountFeaturesPage.SaveAndContinue()
    CloseToasterIfAppearUtils()
    waitForLoaderToDisappearUtils()


    cy.url().should('include', '#/upload-documents')
    // TC_DocumentUploadPage.GovernmentIDUploadFor_Personal()
    // TC_DocumentUploadPage.UploadAuthorizationDocumentIfVisible()
    // TC_DocumentUploadPage.UploadUtilityBillIfVisible()
    // TC_DocumentUploadPage.UploadDrivingLiscenceFor_Personal()
    TC_DocumentUploadPage.UploadPassportFor_Personal()
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
   // waitForLoaderToDisappearUtils()


    cy.url().should('include', '#/review')
    TC_ReviewInfomationPage.ClickOnSubmitBtn()
    cy.url().should('include', '#/dashboard')

  })

  it('Verify that Foreign User can Create New Personal Account || ID Type #Govt ID' , ()=>{

    TC_CreateNewAccountPage.CreatePersonalAccount_TypeIndividual();
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
      randomData.idExpirationDate,
      randomData.socialSecurityNo);
    TC_PersonalInformationPage.FromPersonalInformationSelect_isUScitizenNoAndisForeignYes()
    TC_PersonalInformationPage.FromPersonalInformationSelect_IDType_GovtID()
    TC_PersonalInformationPage.fillPhysicalAddress(
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
    TC_PersonalInformationPage.SaveAndContinue()
    waitForLoaderToDisappearUtils()
        

       
    cy.url().should('include', '/employment-info')
    //  TC_EmploymentInformationPage.fillEmployedInfo()
    TC_EmploymentInformationPage.ClickOnUnemployed()
    TC_EmploymentInformationPage.SaveAndContinue()
    waitForLoaderToDisappearUtils()
 

    cy.url().should('include','/investor-profile')
    TC_InvestmentProfilePage.fillInvestmentProfileInfo()
    TC_InvestmentProfilePage.fillFinancialSuitability()
    TC_InvestmentProfilePage.fillPriorInvestmentExperience()
    TC_InvestmentProfilePage.SaveAndContinue()
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
    TC_RegulatoryItemsPage.fillW8Ben_ForForeignAccounts(randomData.randomWords, randomData.city)
    TC_RegulatoryItemsPage.SaveAndContinue()
    waitForLoaderToDisappearUtils()

      
    cy.url().should('include', '#/account-features')
    TC_AccountFeaturesPage.SaveAndContinue()
    CloseToasterIfAppearUtils()
    waitForLoaderToDisappearUtils()


    cy.url().should('include', '#/upload-documents')
    TC_DocumentUploadPage.DocumentsShouldBeVisibleFor_ForeignAccount_Personal_TypeIndividual()    
    //  TC_DocumentUploadPage.UploadAuthorizationDocumentIfVisible()
    //  TC_DocumentUploadPage.UploadUtilityBillIfVisible()
    //  TC_DocumentUploadPage.UploadPassportFor_Personal()
    //  TC_DocumentUploadPage.UploadDrivingLiscenceFor_Personal()
    TC_DocumentUploadPage.GovernmentIDUploadFor_Personal()
    TC_DocumentUploadPage.UploadW8BenForForeign_Personal()
    TC_DocumentUploadPage.UploadForeignQuestionnaireFor_Foreign_Personal()
    

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
    //waitForLoaderToDisappearUtils()


    cy.url().should('include', '#/review')
    TC_ReviewInfomationPage.ClickOnSubmitBtn()
    cy.url().should('include', '#/dashboard')

  })

  it.skip('Verify that ID Issuance Date is not visible For ID Type *Govt ID* and *Passport*' , ()=>{

  })

  it.skip('Verify that if in Investor Profile if Investment Experience is None(0) and Total Net Worth* is $0-24,999 then Securities Lending is Not Visible in Account Feature and Securities Loan Agreement* is Not Visible Disclosure & Signatures', ()=>{

  })
    

})