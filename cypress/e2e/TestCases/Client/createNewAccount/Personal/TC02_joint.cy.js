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


const TC_CreateNewAccountPage = new CreateNewAccountPage
const TC_PersonalInformationPage = new PersonalInformationPage
const TC_EmploymentInformationPage = new EmploymentInformationPage
const TC_InvestmentProfilePage = new InvestmentProfilePage
const TC_RegulatoryItemsPage = new RegulatoryItemsPage
const TC_AccountFeaturesPage = new AccountFeaturesPage
const TC_DocumentUploadPage = new DocumentUploadPage
const TC_DisclosureSignaturesPage = new DisclosureSignaturesPage
const TC_ReviewInfomationPage = new ReviewInfomationPage




describe('Client - Personal - Joint', () => {


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
  
  

  //---------##########---------US CITIZEN USER---------##########---------

  it('Verify that US Citizen can Create Personal Account With Type Joint & Subtype Rights Of Survivorship || ID Type #Govt ID', () => {


    TC_CreateNewAccountPage.CreatePersonalAccount_TypeJointAndSubtype_RightsOfSurvivorship()

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
    //TC_RegulatoryItemsPage.fillW8Ben(randomData.randomWords, randomData.city)
    TC_RegulatoryItemsPage.SaveAndContinue()

       
    cy.url().should('include', '#/account-features')
    TC_AccountFeaturesPage.SaveAndContinue()
    CloseToasterIfAppearUtils()
    waitForLoaderToDisappearUtils()


    cy.url().should('include', '#/upload-documents')
    cy.wait(1000)
    TC_DocumentUploadPage.GovernmentIDUploadFor_Personal()
    TC_DocumentUploadPage.GovernmentIDUploadFor_PersonalCoApplicant()
    // TC_DocumentUploadPage.UploadAuthorizationDocumentIfVisible()
    // TC_DocumentUploadPage.UploadUtilityBillIfVisible()
    // TC_DocumentUploadPage.UploadDrivingLiscenceFor_Personal()
    // TC_DocumentUploadPage.UploadPassportFor_Personal()
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

  it('Verify that US Citizen can Create Personal Account With Type Joint & Subtye Joint Tenants in Common || ID Type #Passport', () => {


    TC_CreateNewAccountPage.CreatePersonalAccount_TypeJointAndSubtype_JointTenantsInCommon()

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
    cy.xpath("//input[@name='priPercentage']").clear().type('80')
    cy.xpath("//input[@name='coAppPercentage']").clear().type('20')
    TC_PersonalInformationPage.FromPersonalInformationSelect_isUSCitizenYes(randomData.socialSecurityNo)
    TC_PersonalInformationPage.FromPersonalInformationSelect_IDType_Passport()
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
    //TC_RegulatoryItemsPage.fillW8Ben(randomData.randomWords, randomData.city)
    TC_RegulatoryItemsPage.SaveAndContinue()

       
    cy.url().should('include', '#/account-features')
    TC_AccountFeaturesPage.SaveAndContinue()
    CloseToasterIfAppearUtils()
    waitForLoaderToDisappearUtils()


    cy.url().should('include', '#/upload-documents')
    cy.wait(1000)
   // TC_DocumentUploadPage.GovernmentIDUploadFor_Personal()
   // TC_DocumentUploadPage.UploadAuthorizationDocumentIfVisible()
   // TC_DocumentUploadPage.UploadUtilityBillIfVisible()
   // TC_DocumentUploadPage.UploadDrivingLiscenceFor_Personal()
    TC_DocumentUploadPage.GovernmentIDUploadFor_PersonalCoApplicant()
    TC_DocumentUploadPage.UploadPassportFor_Personal()
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

  it('Verify that US Citizen can Create Personal Account With Type Joint & Subtype Joint Community Property || ID Type #Driver License || Verify that all 8 Expected US States exist in the dropdown', () => {
   
      // Define the expected states
     const expectedStates = [
      "Select State",
      "Arizona",
      "California",
      "Idaho",
      "Louisiana",
      "Nevada",
      "New Mexico",
      "Texas",
      "Washington"
    ];


    // THIS FUNCTION VERIFY THAT ALL expectedStates FOR US SHOULD EXIST IN PERSONAL INFORMATION PAGE __ ONLY FOR > Type Joint & Subtype Joint Community Property
    function verify8USstatesExistInDropdown(dropdownSelector, expectedOptions) {
      cy.get(`${dropdownSelector} option`)
       .should('have.length', expectedOptions.length)
       .each((option, index) => {
          expect(option).to.have.text(expectedOptions[index]);
        })
    }
   
  


    TC_CreateNewAccountPage.CreatePersonalAccount_TypeJointAndSubtype_JointCommunityProperty()

    const randomData= dataGeneratorUtils(); 




   // Verify US Expected States for each dropdown
   verify8USstatesExistInDropdown('select[name="coAppStateId"]', expectedStates)
   verify8USstatesExistInDropdown('select[name="stateId"]', expectedStates)

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
      verify8USstatesExistInDropdown('select[name="idIssuanceState"]', expectedStates)
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
    
    verify8USstatesExistInDropdown('select[name="trustedState"]' , expectedStates)
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
    //TC_RegulatoryItemsPage.fillW8Ben(randomData.randomWords, randomData.city)
    TC_RegulatoryItemsPage.SaveAndContinue()

       
    cy.url().should('include', '#/account-features')
    TC_AccountFeaturesPage.SaveAndContinue()
    CloseToasterIfAppearUtils()
    waitForLoaderToDisappearUtils()


    cy.url().should('include', '#/upload-documents')
    cy.wait(1000)
    // TC_DocumentUploadPage.GovernmentIDUploadFor_Personal()
    TC_DocumentUploadPage.GovernmentIDUploadFor_PersonalCoApplicant()
    // TC_DocumentUploadPage.UploadAuthorizationDocumentIfVisible()
    // TC_DocumentUploadPage.UploadUtilityBillIfVisible()
    TC_DocumentUploadPage.UploadDrivingLiscenceFor_Personal()
    // TC_DocumentUploadPage.UploadPassportFor_Personal()
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

  //---------##########---------FOREIGN USER---------##########---------


  it('Verify that Foreign User can Create Personal Account With Type Joint & Subtype Rights Of Survivorship || ID Type #Govt ID', () => {


    TC_CreateNewAccountPage.CreatePersonalAccount_TypeJointAndSubtype_RightsOfSurvivorship()

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
      TC_PersonalInformationPage.FromPersonalInformationSelect_isUScitizenNoAndisForeignYes()
      TC_PersonalInformationPage.FromPersonalInformationSelect_IDType_GovtID()
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

       
    cy.url().should('include', '#/account-features')
    TC_AccountFeaturesPage.SaveAndContinue()
    CloseToasterIfAppearUtils()
    waitForLoaderToDisappearUtils()


    cy.url().should('include', '#/upload-documents')
    cy.wait(1000)
    TC_DocumentUploadPage.GovernmentIDUploadFor_Personal()
    TC_DocumentUploadPage.GovernmentIDUploadFor_PersonalCoApplicant()
    
    // TC_DocumentUploadPage.UploadAuthorizationDocumentIfVisible()
    // TC_DocumentUploadPage.UploadUtilityBillIfVisible()
    // TC_DocumentUploadPage.UploadDrivingLiscenceFor_Personal()
    // TC_DocumentUploadPage.UploadPassportFor_Personal()
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

  it('Verify that Foreign User can Create Personal Account With Type Joint & Subtye Joint Tenants in Common || ID Type #Passport', () => {


    TC_CreateNewAccountPage.CreatePersonalAccount_TypeJointAndSubtype_JointTenantsInCommon()

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
    cy.xpath("//input[@name='priPercentage']").clear().type('80')
    cy.xpath("//input[@name='coAppPercentage']").clear().type('20')
    TC_PersonalInformationPage.FromPersonalInformationSelect_isUScitizenNoAndisForeignYes(randomData.socialSecurityNo)
    TC_PersonalInformationPage.FromPersonalInformationSelect_IDType_Passport()
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

       
    cy.url().should('include', '#/account-features')
    TC_AccountFeaturesPage.SaveAndContinue()
    CloseToasterIfAppearUtils()
    waitForLoaderToDisappearUtils()


    cy.url().should('include', '#/upload-documents')
    cy.wait(1000)
   // TC_DocumentUploadPage.GovernmentIDUploadFor_Personal()
   // TC_DocumentUploadPage.UploadAuthorizationDocumentIfVisible()
   // TC_DocumentUploadPage.UploadUtilityBillIfVisible()
   // TC_DocumentUploadPage.UploadDrivingLiscenceFor_Personal()
    TC_DocumentUploadPage.GovernmentIDUploadFor_PersonalCoApplicant()
    TC_DocumentUploadPage.UploadPassportFor_Personal()
    TC_DocumentUploadPage.UploadW8BenForForeign_Personal()
    TC_DocumentUploadPage.UploadForeignQuestionnaireFor_Foreign_Personal()
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

  it('Verify that Foreign User can Create Personal Account With Type Joint & Subtype Joint Community Property || ID Type #Passport || Verify that all 8 Expected US States exist in the dropdown', () => {
   
      // Define the expected states
     const expectedStates = [
      "Select State",
      "Arizona",
      "California",
      "Idaho",
      "Louisiana",
      "Nevada",
      "New Mexico",
      "Texas",
      "Washington"
    ];


    // THIS FUNCTION VERIFY THAT ALL expectedStates FOR US SHOULD EXIST IN PERSONAL INFORMATION PAGE __ ONLY FOR > Type Joint & Subtype Joint Community Property
    function verify8USstatesExistInDropdown(dropdownSelector, expectedOptions) {
      cy.get(`${dropdownSelector} option`)
       .should('have.length', expectedOptions.length)
       .each((option, index) => {
          expect(option).to.have.text(expectedOptions[index]);
        })
    }
   
  


    TC_CreateNewAccountPage.CreatePersonalAccount_TypeJointAndSubtype_JointCommunityProperty()

    const randomData= dataGeneratorUtils(); 




   // Verify US Expected States for each dropdown
   verify8USstatesExistInDropdown('select[name="coAppStateId"]', expectedStates)
   verify8USstatesExistInDropdown('select[name="stateId"]', expectedStates)

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
      TC_PersonalInformationPage.FromPersonalInformationSelect_isUScitizenNoAndisForeignYes()
      TC_PersonalInformationPage.FromPersonalInformationSelect_IDType_Passport()
      //verify8USstatesExistInDropdown('select[name="idIssuanceState"]', expectedStates)
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
    
    verify8USstatesExistInDropdown('select[name="trustedState"]' , expectedStates)
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

       
    cy.url().should('include', '#/account-features')
    TC_AccountFeaturesPage.SaveAndContinue()
    CloseToasterIfAppearUtils()
    waitForLoaderToDisappearUtils()


    cy.url().should('include', '#/upload-documents')
    cy.wait(1000)
    // TC_DocumentUploadPage.UploadAuthorizationDocumentIfVisible()
    // TC_DocumentUploadPage.UploadUtilityBillIfVisible()
    //TC_DocumentUploadPage.UploadDrivingLiscenceFor_Personal()
    // TC_DocumentUploadPage.GovernmentIDUploadFor_Personal()
    TC_DocumentUploadPage.UploadPassportFor_Personal()
    TC_DocumentUploadPage.GovernmentIDUploadFor_PersonalCoApplicant()
    
    TC_DocumentUploadPage.UploadW8BenForForeign_Personal()
    TC_DocumentUploadPage.UploadForeignQuestionnaireFor_Foreign_Personal()
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

})