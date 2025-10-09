import {
  clientLoginUtils,
  registerRepresentativeLoginUtils,
  supervsorLoginUtils, wdBrokerLoginUtils
} from "@Utils/LoginUtils";
import { PersonalInformationPage } from "@Pages/Client/Personal/PersonalInformationPage"
import { EmploymentInformationPage } from "@Pages/Client/Personal/EmploymentInfomationPage"
import { dataGeneratorUtils } from "@Utils/dataGeneratorUtils";
import { InvestmentProfilePage } from "@Pages/Client/Personal/InvestorProfilePage";
import { RegulatoryItemsPage } from "@Pages/Client/Personal/RegulatoryItemsPage"
import { AccountFeaturesPage} from "@Pages/Client/Personal/AccountFeaturesPage"
import { DocumentUploadPage } from "@Pages/Client/Personal/DocumentUploadPage"
import { DisclosureSignaturesPage } from "@Pages/Client/Personal/DisclosureSignaturesPage"
import { ReviewInfomationPage } from "@Pages/Client/Personal/ReviewInformationPage"
import { IRABeneficiariesPage } from "@Pages/Client/Retirement/IRABeneficiaries"
import { CloseToasterIfAppearUtils } from "@Utils/CloseToasterIfAppearUtils";
import { IfApplicationStatusNotCompletedThenCancelUtils } from "@Utils/IfApplicationStatusNotCompletedThenCancelUtils";
import { CreateNewAccountPage } from "@Pages/Client/CreateNewAccountPage"
import { waitForLoaderToDisappearUtils } from "@Utils/waitForLoaderToDisappearUtils";
import { RegisterRepresentativePage } from "@Pages/Register_Representative/registerRepresentative";
import { BrokerPage } from "@Pages/Broker/brokerPage"


const TC_RegisterRepresentativePage = new RegisterRepresentativePage();
const TC_BrokerPage = new BrokerPage

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

describe.only('RETIREMENT - WD(Margin Account) - Representative - Supervisor', ()=>{
 
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  

  it('Verify that US Citizen User can Create Tradational IRA Account || ID Type #Driver License', () => {

    clientLoginUtils();
    waitForLoaderToDisappearUtils()
    IfApplicationStatusNotCompletedThenCancelUtils()
    CloseToasterIfAppearUtils()
    
    TC_CreateNewAccountPage.CreateRetirementAccount_TypeTraditionalIRA();
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
    TC_DisclosureSignaturesPage.AccountAgreementCashAndMarginDomestic_ShouldNotBeVisibleOnlyForAllRetirementIRAApplications()
 
    cy.wait(1000)
    TC_DisclosureSignaturesPage.FullyPaidSecuritiesLoanAgreement()
    cy.wait(1000)
    // TC_DisclosureSignaturesPage.AccountAgreement()
    // cy.wait(1000)
    TC_DisclosureSignaturesPage.FormCRSAgreement()
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

  it("Verify that Representative Can Download and Approved an Application", () => {
    registerRepresentativeLoginUtils();
    waitForLoaderToDisappearUtils();
    CloseToasterIfAppearUtils();
    TC_RegisterRepresentativePage.ApprovedApplicationFromQueue();

    // TC_RegisterRepresentativePage.selectOption('View Application');

    TC_RegisterRepresentativePage.selectOption("Start Review");
    TC_RegisterRepresentativePage.clickButtonFromPopup("Yes");

    cy.url().should("include", "registerrep/review-application");
    TC_RegisterRepresentativePage.verifyApplication();
    TC_RegisterRepresentativePage.downloadPrintPdf();
    TC_RegisterRepresentativePage.clickButtonOnReviewPage("Action Required");
    TC_RegisterRepresentativePage.ChangeApplicationStatus("Approved");

    TC_RegisterRepresentativePage.clickButtonFromPopup("Change Status");

    waitForLoaderToDisappearUtils();

    cy.url().should("include", "registerrep/applications");
    TC_RegisterRepresentativePage.verifyApplicationIsNotInQueue();
    TC_RegisterRepresentativePage.clickOnDashboard()
    TC_RegisterRepresentativePage.verifyApplicationStatus("Pending Review (Sup)");
  })

  it("Verify that Supervisor Can Download and Approved an Application", () => {
    supervsorLoginUtils();
    waitForLoaderToDisappearUtils();
    CloseToasterIfAppearUtils();

    TC_RegisterRepresentativePage.ApprovedApplicationFromQueue();

    // TC_RegisterRepresentativePage.selectOption('View Application');

    TC_RegisterRepresentativePage.selectOption("Start Review");
    TC_RegisterRepresentativePage.clickButtonFromPopup("Yes");

    cy.url().should("include", "supervisor/review-application");
    TC_RegisterRepresentativePage.verifyApplication();
    TC_RegisterRepresentativePage.downloadPrintPdf();
    TC_RegisterRepresentativePage.clickButtonOnReviewPage("Action Required");
    TC_RegisterRepresentativePage.ChangeApplicationStatus("Approved (Sup)");
    TC_RegisterRepresentativePage.clickButtonFromPopup("Change Status");
    waitForLoaderToDisappearUtils();

    cy.url().should("include", "supervisor/applications");
    TC_RegisterRepresentativePage.verifyApplicationIsNotInQueue();
    TC_RegisterRepresentativePage.clickOnDashboard()
    TC_RegisterRepresentativePage.verifyApplicationStatus("Approved");
  })

})

describe("RETIREMENT - WD(Margin Account) - Broker - Representative - Supervisor", () => {
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  })

  it('Verify that US Citizen User can Create Tradational IRA Account || ID Type #Driver License', () => {

    
    TC_CreateNewAccountPage.CreateRetirementAccount_TypeTraditionalIRA();
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
    TC_DisclosureSignaturesPage.AccountAgreementCashAndMarginDomestic_ShouldNotBeVisibleOnlyForAllRetirementIRAApplications()
 
    cy.wait(1000)
    TC_DisclosureSignaturesPage.FullyPaidSecuritiesLoanAgreement()
    cy.wait(1000)
    // TC_DisclosureSignaturesPage.AccountAgreement()
    // cy.wait(1000)
    TC_DisclosureSignaturesPage.FormCRSAgreement()
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

  it('Verify that Broker Can Download and Assign an Application to RR', () => {
    wdBrokerLoginUtils();
    CloseToasterIfAppearUtils()
    waitForLoaderToDisappearUtils()
    // TC_BrokerPage.VerifyNoAssigneeFromQueue();
    TC_RegisterRepresentativePage.ApprovedApplicationFromQueue();
    TC_RegisterRepresentativePage.selectOption('View Application');
    cy.url().should("include", "broker/review-application");
    TC_RegisterRepresentativePage.verifyApplication();
    TC_RegisterRepresentativePage.downloadPrintPdf();
    TC_RegisterRepresentativePage.clickButtonOnReviewPage("OK");
    TC_RegisterRepresentativePage.clickOnApprovalQueue()
    TC_BrokerPage.VerifyNoAssigneeFromQueue()
    TC_RegisterRepresentativePage.verifyApplicationStatus('Submitted Pending Approval')
    TC_BrokerPage.ClickButton('Assign to')
    TC_BrokerPage.SelectRegisterRep('Demo RR')
    TC_RegisterRepresentativePage.clickButtonFromPopup("Assign to RR");
    waitForLoaderToDisappearUtils()
    TC_BrokerPage.VerifyAssigneeFromQueue('Demo RR')
    TC_RegisterRepresentativePage.verifyApplicationStatus('Pending Review (Rr)')

  })

  it("Verify that Representative Can Download and Approved an Application", () => {
    registerRepresentativeLoginUtils();
    waitForLoaderToDisappearUtils();
    CloseToasterIfAppearUtils();
    TC_RegisterRepresentativePage.ApprovedApplicationFromQueue();

    // TC_RegisterRepresentativePage.selectOption('View Application');

    TC_RegisterRepresentativePage.selectOption("Start Review");
    TC_RegisterRepresentativePage.clickButtonFromPopup("Yes");

    cy.url().should("include", "registerrep/review-application");
    TC_RegisterRepresentativePage.verifyApplication();
    TC_RegisterRepresentativePage.downloadPrintPdf();
    TC_RegisterRepresentativePage.clickButtonOnReviewPage("Action Required");
    TC_RegisterRepresentativePage.ChangeApplicationStatus("Approved");

    TC_RegisterRepresentativePage.clickButtonFromPopup("Change Status");

    waitForLoaderToDisappearUtils();

    cy.url().should("include", "registerrep/applications");
    TC_RegisterRepresentativePage.verifyApplicationIsNotInQueue();
    TC_RegisterRepresentativePage.clickOnDashboard()
    TC_RegisterRepresentativePage.verifyApplicationStatus("Pending Review (Sup)");
  })

  it("Verify that Supervisor Can Download and Approved an Application", () => {
    supervsorLoginUtils();
    waitForLoaderToDisappearUtils();
    CloseToasterIfAppearUtils();

    TC_RegisterRepresentativePage.ApprovedApplicationFromQueue();

    // TC_RegisterRepresentativePage.selectOption('View Application');

    TC_RegisterRepresentativePage.selectOption("Start Review");
    TC_RegisterRepresentativePage.clickButtonFromPopup("Yes");

    cy.url().should("include", "supervisor/review-application");
    TC_RegisterRepresentativePage.verifyApplication();
    TC_RegisterRepresentativePage.downloadPrintPdf();
    TC_RegisterRepresentativePage.clickButtonOnReviewPage("Action Required");
    TC_RegisterRepresentativePage.ChangeApplicationStatus("Approved (Sup)");
    TC_RegisterRepresentativePage.clickButtonFromPopup("Change Status");
    waitForLoaderToDisappearUtils();

    cy.url().should("include", "supervisor/applications");
    TC_RegisterRepresentativePage.verifyApplicationIsNotInQueue();
    TC_RegisterRepresentativePage.clickOnDashboard()
    TC_RegisterRepresentativePage.verifyApplicationStatus("Approved");
  })
})

describe("RETIREMENT - WD(Cash Account) - Representative - Supervisor", () => {
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  })

  it('Verify that US Citizen User can Create Tradational IRA Account || ID Type #Driver License', () => {

    
    TC_CreateNewAccountPage.CreateRetirementAccount_TypeTraditionalIRA();
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
    TC_DisclosureSignaturesPage.AccountAgreementCashAndMarginDomestic_ShouldNotBeVisibleOnlyForAllRetirementIRAApplications()
 
    cy.wait(1000)
    TC_DisclosureSignaturesPage.FullyPaidSecuritiesLoanAgreement()
    cy.wait(1000)
    // TC_DisclosureSignaturesPage.AccountAgreement()
    // cy.wait(1000)
    TC_DisclosureSignaturesPage.FormCRSAgreement()
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

  it("Verify that Representative Can Download and Approved an Application", () => {
    registerRepresentativeLoginUtils();
    waitForLoaderToDisappearUtils();
    CloseToasterIfAppearUtils();
    TC_RegisterRepresentativePage.ApprovedApplicationFromQueue();

    // TC_RegisterRepresentativePage.selectOption('View Application');

    TC_RegisterRepresentativePage.selectOption("Start Review");
    TC_RegisterRepresentativePage.clickButtonFromPopup("Yes");

    cy.url().should("include", "registerrep/review-application");
    TC_RegisterRepresentativePage.verifyApplication();
    TC_RegisterRepresentativePage.downloadPrintPdf();
    TC_RegisterRepresentativePage.clickButtonOnReviewPage("Action Required");
    TC_RegisterRepresentativePage.ChangeApplicationStatus("Approved");

    TC_RegisterRepresentativePage.clickButtonFromPopup("Change Status");

    waitForLoaderToDisappearUtils();

    cy.url().should("include", "registerrep/applications");
    TC_RegisterRepresentativePage.verifyApplicationIsNotInQueue();
    TC_RegisterRepresentativePage.clickOnDashboard()
    TC_RegisterRepresentativePage.verifyApplicationStatus("Pending Review (Sup)");
  })

  it("Verify that Supervisor Can Download and Approved an Application", () => {
    supervsorLoginUtils();
    waitForLoaderToDisappearUtils();
    CloseToasterIfAppearUtils();

    TC_RegisterRepresentativePage.ApprovedApplicationFromQueue();

    // TC_RegisterRepresentativePage.selectOption('View Application');

    TC_RegisterRepresentativePage.selectOption("Start Review");
    TC_RegisterRepresentativePage.clickButtonFromPopup("Yes");

    cy.url().should("include", "supervisor/review-application");
    TC_RegisterRepresentativePage.verifyApplication();
    TC_RegisterRepresentativePage.downloadPrintPdf();
    TC_RegisterRepresentativePage.clickButtonOnReviewPage("Action Required");
    TC_RegisterRepresentativePage.ChangeApplicationStatus("Approved (Sup)");
    TC_RegisterRepresentativePage.clickButtonFromPopup("Change Status");
    waitForLoaderToDisappearUtils();

    cy.url().should("include", "supervisor/applications");
    TC_RegisterRepresentativePage.verifyApplicationIsNotInQueue();
    TC_RegisterRepresentativePage.clickOnDashboard()
    TC_RegisterRepresentativePage.verifyApplicationStatus("Approved");
  })
})

describe("RETIREMENT - WD(Cash Account) - Broker - Representative - Supervisor", () => {
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  })

  it('Verify that US Citizen User can Create Tradational IRA Account || ID Type #Driver License', () => {

    
    TC_CreateNewAccountPage.CreateRetirementAccount_TypeTraditionalIRA();
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
    TC_DisclosureSignaturesPage.AccountAgreementCashAndMarginDomestic_ShouldNotBeVisibleOnlyForAllRetirementIRAApplications()
 
    cy.wait(1000)
    TC_DisclosureSignaturesPage.FullyPaidSecuritiesLoanAgreement()
    cy.wait(1000)
    // TC_DisclosureSignaturesPage.AccountAgreement()
    // cy.wait(1000)
    TC_DisclosureSignaturesPage.FormCRSAgreement()
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

  it('Verify that Broker Can Download and Assign an Application to RR', () => {
    wdBrokerLoginUtils();
    CloseToasterIfAppearUtils()
    waitForLoaderToDisappearUtils()
    // TC_BrokerPage.VerifyNoAssigneeFromQueue();
    TC_RegisterRepresentativePage.ApprovedApplicationFromQueue();
    TC_RegisterRepresentativePage.selectOption('View Application');
    cy.url().should("include", "broker/review-application");
    TC_RegisterRepresentativePage.verifyApplication();
    TC_RegisterRepresentativePage.downloadPrintPdf();
    TC_RegisterRepresentativePage.clickButtonOnReviewPage("OK");
    TC_RegisterRepresentativePage.clickOnApprovalQueue()
    TC_BrokerPage.VerifyNoAssigneeFromQueue()
    TC_RegisterRepresentativePage.verifyApplicationStatus('Submitted Pending Approval')
    TC_BrokerPage.ClickButton('Assign to')
    TC_BrokerPage.SelectRegisterRep('Demo RR')
    TC_RegisterRepresentativePage.clickButtonFromPopup("Assign to RR");
    waitForLoaderToDisappearUtils()
    TC_BrokerPage.VerifyAssigneeFromQueue('Demo RR')
    TC_RegisterRepresentativePage.verifyApplicationStatus('Pending Review (Rr)')

  })

  it("Verify that Representative Can Download and Approved an Application", () => {
    registerRepresentativeLoginUtils();
    waitForLoaderToDisappearUtils();
    CloseToasterIfAppearUtils();
    TC_RegisterRepresentativePage.ApprovedApplicationFromQueue();

    // TC_RegisterRepresentativePage.selectOption('View Application');

    TC_RegisterRepresentativePage.selectOption("Start Review");
    TC_RegisterRepresentativePage.clickButtonFromPopup("Yes");

    cy.url().should("include", "registerrep/review-application");
    TC_RegisterRepresentativePage.verifyApplication();
    TC_RegisterRepresentativePage.downloadPrintPdf();
    TC_RegisterRepresentativePage.clickButtonOnReviewPage("Action Required");
    TC_RegisterRepresentativePage.ChangeApplicationStatus("Approved");

    TC_RegisterRepresentativePage.clickButtonFromPopup("Change Status");

    waitForLoaderToDisappearUtils();

    cy.url().should("include", "registerrep/applications");
    TC_RegisterRepresentativePage.verifyApplicationIsNotInQueue();
    TC_RegisterRepresentativePage.clickOnDashboard()
    TC_RegisterRepresentativePage.verifyApplicationStatus("Pending Review (Sup)");
  })

  it("Verify that Supervisor Can Download and Approved an Application", () => {
    supervsorLoginUtils();
    waitForLoaderToDisappearUtils();
    CloseToasterIfAppearUtils();

    TC_RegisterRepresentativePage.ApprovedApplicationFromQueue();

    // TC_RegisterRepresentativePage.selectOption('View Application');

    TC_RegisterRepresentativePage.selectOption("Start Review");
    TC_RegisterRepresentativePage.clickButtonFromPopup("Yes");

    cy.url().should("include", "supervisor/review-application");
    TC_RegisterRepresentativePage.verifyApplication();
    TC_RegisterRepresentativePage.downloadPrintPdf();
    TC_RegisterRepresentativePage.clickButtonOnReviewPage("Action Required");
    TC_RegisterRepresentativePage.ChangeApplicationStatus("Approved (Sup)");
    TC_RegisterRepresentativePage.clickButtonFromPopup("Change Status");
    waitForLoaderToDisappearUtils();

    cy.url().should("include", "supervisor/applications");
    TC_RegisterRepresentativePage.verifyApplicationIsNotInQueue();
    TC_RegisterRepresentativePage.clickOnDashboard()
    TC_RegisterRepresentativePage.verifyApplicationStatus("Approved");
  })
})