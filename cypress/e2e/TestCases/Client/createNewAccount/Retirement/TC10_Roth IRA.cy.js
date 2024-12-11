import { clientLoginUtils } from "../../../../utils/LoginUtils"
import { PersonalInformationPage } from "../../../../Pages/Client/createNewAccount/Personal/PersonalInformationPage"
import { EmploymentInformationPage } from "../../../../Pages/Client/createNewAccount/Personal/EmploymentInfomationPage"
import { dataGeneratorUtils } from "../../../../utils/dataGeneratorUtils";
import { InvestmentProfilePage } from "../../../../Pages/Client/createNewAccount/Personal/InvestorProfilePage";
import { RegulatoryItemsPage } from "../../../../Pages/Client/createNewAccount/Personal/RegulatoryItemsPage"
import { AccountFeaturesPage} from "../../../../Pages/Client/createNewAccount/Personal/AccountFeaturesPage"
import { DocumentUploadPage } from "../../../../Pages/Client/createNewAccount/Personal/DocumentUploadPage"
import { DisclosureSignaturesPage } from "../../../../Pages/Client/createNewAccount/Personal/DisclosureSignaturesPage"
import { ReviewInfomationPage } from "../../../../Pages/Client/createNewAccount/Personal/ReviewInformationPage"
import { IRABeneficiariesPage } from "../../../../Pages/Client/createNewAccount/Retirement/IRABeneficiaries"
import { CloseToasterIfAppearUtils } from "../../../../utils/CloseToasterIfAppearUtils";
import { IfApplicationStatusNotCompletedThenCancelUtils } from "../../../../utils/IfApplicationStatusNotCompletedThenCancelUtils";
import { CreateNewAccountPage } from "../../../../Pages/Client/createNewAccount/CreateNewAccountPage"
import { waitForLoaderToDisappearUtils } from "../../../../utils/waitForLoaderToDisappearUtils";

const TC_PersonalInformationPage = new PersonalInformationPage
const TC_EmploymentInformationPage = new EmploymentInformationPage
const TC_IRABeneficiariesPage = new IRABeneficiariesPage
const TC_InvestmentProfilePage = new InvestmentProfilePage
const TC_RegulatoryItemsPage = new RegulatoryItemsPage
const TC_AccountFeaturesPage = new AccountFeaturesPage
const TC_DocumentUploadPage = new DocumentUploadPage
const TC_DisclosureSignaturesPage = new DisclosureSignaturesPage
const TC_ReviewInfomationPage = new ReviewInfomationPage
const TC_CreateNewAccountPage = new CreateNewAccountPage



describe('Client - Retirement - Roth IRA', () => {


  beforeEach(() => {

    clientLoginUtils();
    waitForLoaderToDisappearUtils()
    IfApplicationStatusNotCompletedThenCancelUtils()
    CloseToasterIfAppearUtils()
   // Cypress.config('numTestsKeptInMemory', 0); // Disable keeping snapshots in memory


  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  

  it('Verify that US Citizen User can Create Retirement Account || ID Type #Driver License', () => {

    
    TC_CreateNewAccountPage.CreateRetirementAccount_TypeRothIRA();
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
    TC_PersonalInformationPage.fillIRAAccountInformation()
    TC_PersonalInformationPage.SaveAndContinue()
    waitForLoaderToDisappearUtils()

       
    cy.url().should('include', '/employment-info')
    //  TC_EmploymentInformationPage.fillEmployedInfo()
    TC_EmploymentInformationPage.ClickOnUnemployed()
    TC_EmploymentInformationPage.SaveAndContinue()
    waitForLoaderToDisappearUtils()

   cy.url().should('include', '/ira-beneficiaries')
   TC_IRABeneficiariesPage.AddIRABeneficiaries(randomData.fName, randomData.lName, randomData.dobYYYYMMDD, randomData.randomNumbers, randomData.address, randomData.city, randomData.postalCode, randomData.randomWords)
   TC_IRABeneficiariesPage.SaveAndContinue()
 

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
    TC_DisclosureSignaturesPage.AccountAgreementCashAndMarginDomestic_ShouldNotBeVisibleOnlyForAllRetirementIRAApplications()
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
    TC_ReviewInfomationPage.SelectRegisteredRep()
    TC_ReviewInfomationPage.ClickOnSubmitBtn()
    cy.url().should('include', '#/dashboard')

  })

  it('Verify that US Citizen User can Create Retirement Account || ID Type #Passport', () => {

    TC_CreateNewAccountPage.CreateRetirementAccount_TypeRothIRA();
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


    cy.url().should('include', '/ira-beneficiaries')
    TC_IRABeneficiariesPage.AddIRABeneficiaries(randomData.fName, randomData.lName, randomData.dobYYYYMMDD, randomData.randomNumbers, randomData.address, randomData.city, randomData.postalCode, randomData.randomWords)
    TC_IRABeneficiariesPage.SaveAndContinue()


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
    TC_DisclosureSignaturesPage.AccountAgreementCashAndMarginDomestic_ShouldNotBeVisibleOnlyForAllRetirementIRAApplications()
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
    TC_ReviewInfomationPage.SelectRegisteredRep()
    TC_ReviewInfomationPage.ClickOnSubmitBtn()
    cy.url().should('include', '#/dashboard')

  })

  it.only('Verify that US Citizen User can Create Retirement Account || ID Type #Govt ID', () => {

    TC_CreateNewAccountPage.CreateRetirementAccount_TypeRothIRA();
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


    cy.url().should('include', '/ira-beneficiaries')
    TC_IRABeneficiariesPage.AddIRABeneficiaries(randomData.fName, randomData.lName, randomData.dobYYYYMMDD, randomData.randomNumbers, randomData.address, randomData.city, randomData.postalCode, randomData.randomWords)
    TC_IRABeneficiariesPage.SaveAndContinue()


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
    TC_DocumentUploadPage.GovernmentIDUploadFor_IRA()
    TC_DocumentUploadPage.SaveAndContinue()
    CloseToasterIfAppearUtils();
    waitForLoaderToDisappearUtils()


    cy.url().should('include', '#/disclosures-signatures')
    TC_DisclosureSignaturesPage.AccountAgreementCashAndMarginDomestic_ShouldNotBeVisibleOnlyForAllRetirementIRAApplications()
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
    TC_ReviewInfomationPage.SelectRegisteredRep()
    TC_ReviewInfomationPage.ClickOnSubmitBtn()
    cy.url().should('include', '#/dashboard')

  })

  it('Verify that Foreign User cannot Open IRA Account' , ()=>{

    TC_CreateNewAccountPage.CreateRetirementAccount_TypeRothIRA();
    CloseToasterIfAppearUtils();
    TC_PersonalInformationPage.VerifyForeignAccountCannotOpenIRAAccount()

  })

})