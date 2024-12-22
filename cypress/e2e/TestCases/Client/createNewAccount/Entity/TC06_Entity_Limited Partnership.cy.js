import { clientLoginUtils } from "@Utils/LoginUtils"
import { waitForLoaderToDisappearUtils } from "@Utils/waitForLoaderToDisappearUtils"
import { IfApplicationStatusNotCompletedThenCancelUtils } from "@Utils/IfApplicationStatusNotCompletedThenCancelUtils"
import { dataGeneratorUtils } from "@Utils/dataGeneratorUtils"
import { CloseToasterIfAppearUtils } from "@Utils/CloseToasterIfAppearUtils"
import { CreateNewAccountPage } from "@Pages/Client/createNewAccount/CreateNewAccountPage"
import { EntityInformationPage } from "@Pages/Client/createNewAccount/Entity/EntityInformationPage"
import { InvestmentProfilePage } from "@Pages/Client/createNewAccount/Personal/InvestorProfilePage"
import { RegulatoryItemsPage } from "@Pages/Client/createNewAccount/Personal/RegulatoryItemsPage"
import { AccountFeaturesPage} from "@Pages/Client/createNewAccount/Personal/AccountFeaturesPage"
import { DueDiligenceFormPage } from "@Pages/Client/createNewAccount/Entity/DueDiligenceFormPage"
import { OwnersAndOfficialsPage} from "@Pages/Client/createNewAccount/Entity/OwnersAndOfficialsPage"
import { DisclosureSignaturesPage } from "@Pages/Client/createNewAccount/Personal/DisclosureSignaturesPage"
import { DocumentUploadPage} from "@Pages/Client/createNewAccount/Personal/DocumentUploadPage"
import { ReviewInfomationPage } from "@Pages/Client/createNewAccount/Personal/ReviewInformationPage"


const TC_CreateNewAccountPage = new CreateNewAccountPage
const TC_EntityInformationPage = new EntityInformationPage
const TC_InvestmentProfilePage = new InvestmentProfilePage
const TC_RegulatoryItemsPage = new RegulatoryItemsPage
const TC_AccountFeaturesPage = new AccountFeaturesPage
const TC_DueDiligenceFormPage = new DueDiligenceFormPage
const TC_OwnersAndOfficialsPage = new OwnersAndOfficialsPage
const TC_DocumentUploadPage = new DocumentUploadPage
const TC_DisclosureSignaturesPage = new DisclosureSignaturesPage
const TC_ReviewInfomationPage = new ReviewInfomationPage

describe ('Client - Entity - Limited Partnership', ()=>{
 
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
      


    it('Verify that US Citizen User can Create an Entity Account || Due Diligence Questionnaire Should be filled || ID Type #Govt ID', ()=>{




        // cy.wait(5000)
        //  cy.visit("#/upload-entity-documents")
           
        const randomData= dataGeneratorUtils();
        TC_CreateNewAccountPage.CreateEntityAccount_TypeLimitedPartnership()
        CloseToasterIfAppearUtils();
     
        TC_EntityInformationPage.fillEntityInformation(randomData.fName, randomData.socialSecurityNo, randomData.primaryTelephone, randomData.city, randomData.address, randomData.address1, randomData.dobYYYYMMDD, randomData.postalCode)
        TC_EntityInformationPage.fillMailingPreference(randomData.address1, randomData.address2, randomData.city, randomData.postalCode, randomData.randomNumbers, randomData.randomNumbers2, randomData.dobYYYYMMDD)
        TC_EntityInformationPage.fillAuthorizedSigner(randomData.fName1, randomData.mName1, randomData.lName1, randomData.dobMMDDYYYY1, randomData.email1, randomData.randomNumbers3, randomData.randomNumbers4, randomData.idNumber, randomData.idIssueDate, randomData.idExpirationDate)
        TC_EntityInformationPage.FromAuthorizedSignerSelect_isUSCitizenYes(randomData.randomNumbers1)
        TC_EntityInformationPage.FromAuthorizedSignerSelect_IDType_GovtID()
        TC_EntityInformationPage.fillIndustrialClassification()
        TC_EntityInformationPage.SaveAndContinue()
        waitForLoaderToDisappearUtils()
     
    
    
        cy.url().should('include', '#/investor-entity-profile')
    
    
        TC_InvestmentProfilePage.fillInvestmentProfileInfo()
        TC_InvestmentProfilePage.fillFinancialSuitability()
        TC_InvestmentProfilePage.fillPriorInvestmentExperience()
        TC_InvestmentProfilePage.SaveAndContinue()
        waitForLoaderToDisappearUtils()
    
    
        cy.url().should('include', '#/regulatory-entity-items')
        cy.wait(1000)
        TC_RegulatoryItemsPage.fillOption1()
        cy.wait(1000)
        TC_RegulatoryItemsPage.fillOption2_Entity()
        TC_RegulatoryItemsPage.fillOption3_Entity(randomData.randomWords)
        TC_RegulatoryItemsPage.fillOption4()
        TC_RegulatoryItemsPage.fillOption5(randomData.randomWords)
        TC_RegulatoryItemsPage.fillOption6()
        TC_RegulatoryItemsPage.fillOption7(randomData.randomWords)
        TC_RegulatoryItemsPage.fillOption8()
        TC_RegulatoryItemsPage.fillOption9()
        TC_RegulatoryItemsPage.fillOption10()
        TC_RegulatoryItemsPage.fillOption11_Entity()
        TC_RegulatoryItemsPage.fillOption12_Entity()
        TC_RegulatoryItemsPage.fillDirectCommunication()
        TC_RegulatoryItemsPage.SaveAndContinue()
        waitForLoaderToDisappearUtils()
    
              
        cy.url().should('include', '#/account-entity-features')
        TC_AccountFeaturesPage.SaveAndContinue()
        TC_AccountFeaturesPage.ForEntityAccount_isQuestionnaireNo()
        TC_AccountFeaturesPage.SaveAndContinue()
        CloseToasterIfAppearUtils();
        waitForLoaderToDisappearUtils()
    
        cy.url().should('include', '#/due-diligence-info')
        TC_DueDiligenceFormPage.fillEntityDueDiligenceForm(randomData.fName1, randomData.address2, randomData.randomNumbers5, randomData.randomWords1, randomData.randomWords2, randomData.randomWords3)
        TC_DueDiligenceFormPage.SaveAndContinue()
        CloseToasterIfAppearUtils();
        waitForLoaderToDisappearUtils()
    
        cy.url().should('include', '#/owners-officials')
        TC_OwnersAndOfficialsPage.AddEntityOfficers(randomData.fName, randomData.lName, randomData.dobYYYYMMDD, randomData.randomNumbers, randomData.address, randomData.city, randomData.randomNumbers1, randomData.randomNumbers2, randomData.randomWords)
        TC_OwnersAndOfficialsPage.AddBeneficialOwners(randomData.fName1, randomData.lName1, randomData.dobYYYYMMDD1, randomData.randomNumbers3, randomData.address1, randomData.city1, randomData.randomNumbers4, randomData.randomNumbers5)
        TC_OwnersAndOfficialsPage.SaveAndContinue()
        waitForLoaderToDisappearUtils()
    
    
        cy.url().should('include', '#/upload-entity-documents')
        TC_DocumentUploadPage.LPBrokerAgreementShouldBeVisibleFor_Entity_TypePartnership()
        TC_DocumentUploadPage.LPBrokerAgreementUploadFor_Entity_TypePartnership()
        TC_DocumentUploadPage.GovernmentIDUploadFor_Entity()
        TC_DocumentUploadPage.PassportIDUploadForBeneficialOwners_Entity()
         //TC_DocumentUploadPage.Save()
        TC_DocumentUploadPage.SaveAndContinue()
        CloseToasterIfAppearUtils();
        waitForLoaderToDisappearUtils()
    
    
        cy.url().should('include', '#/disclosures-signatures')
        TC_DisclosureSignaturesPage.AccountAgreementCashAndMargin()
        cy.wait(1000)
        TC_DisclosureSignaturesPage.FullyPaidSecuritiesLoanAgreement()
        cy.wait(1000)
        TC_DisclosureSignaturesPage.AccountAgreement()
        cy.wait(1000)
        TC_DisclosureSignaturesPage.FillSignature()
        TC_DisclosureSignaturesPage.ClickSaveAndReview()
        CloseToasterIfAppearUtils();
        //waitForLoaderToDisappearUtils()
    
        cy.url().should('include', '#/review')
            TC_ReviewInfomationPage.SelectRegisteredRep()
    TC_ReviewInfomationPage.ClickOnSubmitBtn()
        cy.url().should('include', '#/dashboard')
        
    })
    
    it('Verify that US Citizen User can Create an Entity Account || Due Diligence Questionnaire Should not be filled || ID Type #Driver License', ()=>{
    
        // cy.wait(5000)
        //  cy.visit("#/upload-entity-documents")
        
          const randomData= dataGeneratorUtils();
        TC_CreateNewAccountPage.CreateEntityAccount_TypeLimitedPartnership()
        CloseToasterIfAppearUtils();
    
    
        TC_EntityInformationPage.fillEntityInformation(randomData.fName, randomData.socialSecurityNo, randomData.primaryTelephone, randomData.city, randomData.address, randomData.address1, randomData.dobYYYYMMDD, randomData.postalCode)
        TC_EntityInformationPage.fillMailingPreference(randomData.address1, randomData.address2, randomData.city, randomData.postalCode, randomData.randomNumbers, randomData.randomNumbers2, randomData.dobYYYYMMDD)
        TC_EntityInformationPage.fillAuthorizedSigner(randomData.fName1, randomData.mName1, randomData.lName1, randomData.dobMMDDYYYY1, randomData.email1, randomData.randomNumbers3, randomData.randomNumbers4, randomData.idNumber, randomData.idIssueDate, randomData.idExpirationDate)
        TC_EntityInformationPage.FromAuthorizedSignerSelect_isUSCitizenYes(randomData.randomNumbers1)
        TC_EntityInformationPage.FromAuthorizedSignerSelect_IDType_DriverLicense()
        TC_EntityInformationPage.fillIndustrialClassification()
        TC_EntityInformationPage.SaveAndContinue()
        waitForLoaderToDisappearUtils()
    
    
    
        cy.url().should('include', '#/investor-entity-profile')
    
    
        TC_InvestmentProfilePage.fillInvestmentProfileInfo()
        TC_InvestmentProfilePage.fillFinancialSuitability()
        TC_InvestmentProfilePage.fillPriorInvestmentExperience()
        TC_InvestmentProfilePage.SaveAndContinue()
        waitForLoaderToDisappearUtils()
    
    
        cy.url().should('include', '#/regulatory-entity-items')
        cy.wait(1000)
        TC_RegulatoryItemsPage.fillOption1()
        cy.wait(1000)
        TC_RegulatoryItemsPage.fillOption2_Entity()
        TC_RegulatoryItemsPage.fillOption3_Entity(randomData.randomWords)
        TC_RegulatoryItemsPage.fillOption4()
        TC_RegulatoryItemsPage.fillOption5(randomData.randomWords)
        TC_RegulatoryItemsPage.fillOption6()
        TC_RegulatoryItemsPage.fillOption7(randomData.randomWords)
        TC_RegulatoryItemsPage.fillOption8()
        TC_RegulatoryItemsPage.fillOption9()
        TC_RegulatoryItemsPage.fillOption10()
        TC_RegulatoryItemsPage.fillOption11_Entity()
        TC_RegulatoryItemsPage.fillOption12_Entity()
        TC_RegulatoryItemsPage.fillDirectCommunication()
        TC_RegulatoryItemsPage.SaveAndContinue()
        waitForLoaderToDisappearUtils()
    
          
        cy.url().should('include', '#/account-entity-features')
        TC_AccountFeaturesPage.SaveAndContinue()
        TC_AccountFeaturesPage.ForEntityAccount_isQuestionnaireYes()  //Fill Entity Account Questionarie and Due Diligence Page will not appear '
        TC_AccountFeaturesPage.SaveAndContinue()
        CloseToasterIfAppearUtils();
        waitForLoaderToDisappearUtils()
    
    
        cy.url().should('include', '#/owners-officials')
        TC_OwnersAndOfficialsPage.AddEntityOfficers(randomData.fName, randomData.lName, randomData.dobYYYYMMDD, randomData.randomNumbers, randomData.address, randomData.city, randomData.randomNumbers1, randomData.randomNumbers2, randomData.randomWords)
        TC_OwnersAndOfficialsPage.AddBeneficialOwners(randomData.fName1, randomData.lName1, randomData.dobYYYYMMDD1, randomData.randomNumbers3, randomData.address1, randomData.city1, randomData.randomNumbers4, randomData.randomNumbers5)
        TC_OwnersAndOfficialsPage.SaveAndContinue()
        waitForLoaderToDisappearUtils()
    
    
        cy.url().should('include', '#/upload-entity-documents')
        TC_DocumentUploadPage.LPBrokerAgreementShouldBeVisibleFor_Entity_TypePartnership()
        // TC_DocumentUploadPage.CorporateDocumentUploadFor_Entity_TypeCorporate()
        TC_DocumentUploadPage.LPBrokerAgreementUploadFor_Entity_TypePartnership()
        TC_DocumentUploadPage.DriverLicenseUploadFor_Entity()    //For ID Type Driver License only
        TC_DocumentUploadPage.PassportIDUploadForBeneficialOwners_Entity()
        TC_DocumentUploadPage.SaveAndContinue()
        CloseToasterIfAppearUtils();
        waitForLoaderToDisappearUtils()
    
    
        cy.url().should('include', '#/disclosures-signatures')
        TC_DisclosureSignaturesPage.AccountAgreementCashAndMargin()
        cy.wait(1000)
        TC_DisclosureSignaturesPage.FullyPaidSecuritiesLoanAgreement()
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
    
    it('Verify that Foreign User can Create an Entity Account || ID Type #Passport', ()=>{
    
        //  cy.wait(5000)
        //  cy.visit("#/upload-entity-documents")
        
          const randomData= dataGeneratorUtils();
        TC_CreateNewAccountPage.CreateEntityAccount_TypeLimitedPartnership()
        CloseToasterIfAppearUtils();
    
    
        TC_EntityInformationPage.fillEntityInformation(randomData.fName, randomData.socialSecurityNo, randomData.primaryTelephone, randomData.city, randomData.address, randomData.address1, randomData.dobYYYYMMDD, randomData.postalCode)
        TC_EntityInformationPage.fillMailingPreference(randomData.address1, randomData.address2, randomData.city, randomData.postalCode, randomData.randomNumbers, randomData.randomNumbers2, randomData.dobYYYYMMDD)
        TC_EntityInformationPage.fillAuthorizedSigner(randomData.fName1, randomData.mName1, randomData.lName1, randomData.dobMMDDYYYY1, randomData.email1, randomData.randomNumbers3, randomData.randomNumbers4, randomData.idNumber, randomData.idIssueDate, randomData.idExpirationDate)
        TC_EntityInformationPage.FromlAuthorizedSignerSelect_isUScitizenNoAndisForeignYes()
        TC_EntityInformationPage.FromAuthorizedSignerSelect_IDType_Passport()
        TC_EntityInformationPage.fillIndustrialClassification()
        TC_EntityInformationPage.SaveAndContinue()
        waitForLoaderToDisappearUtils()
    
    
    
        cy.url().should('include', '#/investor-entity-profile')
    
    
        TC_InvestmentProfilePage.fillInvestmentProfileInfo()
        TC_InvestmentProfilePage.fillFinancialSuitability()
        TC_InvestmentProfilePage.fillPriorInvestmentExperience()
        TC_InvestmentProfilePage.SaveAndContinue()
        waitForLoaderToDisappearUtils()
    
    
        cy.url().should('include', '#/regulatory-entity-items')
        cy.wait(1000)
        TC_RegulatoryItemsPage.fillOption1()
        cy.wait(1000)
        TC_RegulatoryItemsPage.fillOption2_Entity()
        TC_RegulatoryItemsPage.fillOption3_Entity(randomData.randomWords)
        TC_RegulatoryItemsPage.fillOption4()
        TC_RegulatoryItemsPage.fillOption5(randomData.randomWords)
        TC_RegulatoryItemsPage.fillOption6()
        TC_RegulatoryItemsPage.fillOption7(randomData.randomWords)
        TC_RegulatoryItemsPage.fillOption8()
        TC_RegulatoryItemsPage.fillOption9()
        TC_RegulatoryItemsPage.fillOption10()
        TC_RegulatoryItemsPage.fillOption11_Entity()
        TC_RegulatoryItemsPage.fillOption12_Entity()
        TC_RegulatoryItemsPage.fillDirectCommunication()
        TC_RegulatoryItemsPage.fillW8Ben_ForForeignAccounts(randomData.randomWords, randomData.city)  //W8 Ben For Foreign Accounts Only 
        TC_RegulatoryItemsPage.SaveAndContinue()
        waitForLoaderToDisappearUtils()
    
          
        cy.url().should('include', '#/account-entity-features')
        TC_AccountFeaturesPage.SaveAndContinue()
        TC_AccountFeaturesPage.ForEntityAccount_isQuestionnaireYes()  //Fill Entity Account Questionarie and Due Diligence Page will not appear '
        TC_AccountFeaturesPage.SaveAndContinue()
        CloseToasterIfAppearUtils();
        waitForLoaderToDisappearUtils()
    
    
        cy.url().should('include', '#/owners-officials')
        TC_OwnersAndOfficialsPage.AddEntityOfficers(randomData.fName, randomData.lName, randomData.dobYYYYMMDD, randomData.randomNumbers, randomData.address, randomData.city, randomData.randomNumbers1, randomData.randomNumbers2, randomData.randomWords)
        TC_OwnersAndOfficialsPage.AddBeneficialOwners(randomData.fName1, randomData.lName1, randomData.dobYYYYMMDD1, randomData.randomNumbers3, randomData.address1, randomData.city1, randomData.randomNumbers4, randomData.randomNumbers5)
        TC_OwnersAndOfficialsPage.SaveAndContinue()
        waitForLoaderToDisappearUtils()
    
    
        cy.url().should('include', '#/upload-entity-documents')
        TC_DocumentUploadPage.LPBrokerAgreementShouldBeVisibleFor_Entity_TypePartnership()
        TC_DocumentUploadPage.W8BenDocumentShouldBeVisibleFor_Entity()
        // TC_DocumentUploadPage.CorporateDocumentUploadFor_Entity_TypeCorporate()
        // TC_DocumentUploadPage.GovernmentIDUploadFor_Entity()
        TC_DocumentUploadPage.PassportIDUploadFor_Entity()
        TC_DocumentUploadPage.LPBrokerAgreementUploadFor_Entity_TypePartnership()
        TC_DocumentUploadPage.PassportIDUploadForBeneficialOwners_Entity()
        TC_DocumentUploadPage.W8BenDocumentUploadFor_Foreign_Entity()
        TC_DocumentUploadPage.ForeignQuestionnaireUploadFor_Foreign_Entity()
        // TC_DocumentUploadPage.Save()
        TC_DocumentUploadPage.SaveAndContinue()
        CloseToasterIfAppearUtils()
        waitForLoaderToDisappearUtils()
    
    
        cy.url().should('include', '#/disclosures-signatures')
        TC_DisclosureSignaturesPage.AccountAgreementCashAndMargin()
        cy.wait(1000)
        TC_DisclosureSignaturesPage.FullyPaidSecuritiesLoanAgreement()
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


})