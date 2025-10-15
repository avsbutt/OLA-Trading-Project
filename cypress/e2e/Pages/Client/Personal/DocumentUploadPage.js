import { DocumentUploadLocators, CoApplicantDocumentUploadLocators } from "@Locators/Personal/DocumentUploadLocators.json"
import { FormUsageButtons } from "@Locators/FormUsageButtons.json";
import { ActionLibrary } from '../../../utils/ActionLibrary';



export class DocumentUploadPage{


  UploadDrivingLiscenceFor_Personal(){
    ActionLibrary.uploadFile(DocumentUploadLocators.UploadDrivingLicensesFront, 'PrimaryFront-DL.jpg')
    ActionLibrary.uploadFile(DocumentUploadLocators.UploadDrivingLicensesBack, 'Primaryback-DL.jpg')
  }

  UploadPassportFor_Personal(){
     ActionLibrary.uploadFile(DocumentUploadLocators.UploadPassport, 'PrimaryPassport.jpg');
  }



  UploadAuthorizationDocumentIfVisible(){
   // cy.xpath(DocumentUploadLocators.UploadAuthorizationDocument).focus().attachFile('Doc.pdf')
   cy.document().then((doc) => {
     const element = doc.querySelector('input[name="fileDividentAuth"]');
     if (element) {
       cy.wrap(element).focus().attachFile('Doc.pdf', { subjectType: 'input' });
      } 
    });
  }


  
  GovernmentIDUploadFor_Personal(){
  // Upload front side of Government ID
    ActionLibrary.uploadFile(DocumentUploadLocators.UploadGovernmentIdFront, 'PrimaryFront-GOV-ID.jpg');

    // Upload back side of Government ID
    ActionLibrary.uploadFile(DocumentUploadLocators.UploadGovernmentIdBack, 'Primaryback-GOV-ID.jpg');
  }

  GovernmentIDUploadFor_PersonalCoApplicant(){
    ActionLibrary.uploadFile(CoApplicantDocumentUploadLocators.UploadGovernmentIdFront, 'SecondaryFront-GOV-ID.jpg')
    ActionLibrary.uploadFile(CoApplicantDocumentUploadLocators.UploadGovernmentIdBack, 'SecondaryBack-GOV-ID.jpg')
  }



  UploadUtilityBillIfVisible(){
    // cy.xpath(DocumentUploadLocators.UploadUtilityBill).focus().attachFile('Doc.pdf')
    cy.document().then((doc) => {
      const element = doc.querySelector('input[name="filePrimaryBankStatement"]');
      if (element) {
        cy.wrap(element).focus().attachFile('Doc.pdf', { subjectType: 'input' });
      }   
    });
  }



  UploadSelfieIfVisible(){
    // cy.xpath(DocumentUploadLocators.UploadSelfie).focus().attachFile('Doc.pdf')
    cy.document().then((doc) => {
      const element = doc.querySelector('input[name="filePrimarySelfie"]');
      if (element) {
        cy.wrap(element).focus().attachFile('Doc.pdf', { subjectType: 'input' });
      }   
    });
  }

  UploadW8BenForForeign_Personal(){
    ActionLibrary.uploadFile(DocumentUploadLocators.UploadW8Ben, 'W-8_Individual.pdf')
  }

  UploadForeignQuestionnaireFor_Foreign_Personal(){
    ActionLibrary.uploadFile(DocumentUploadLocators.UploadForeignQuestions, 'Foreign_Questionnaire.pdf')
  }
  DocumentsShouldBeVisibleFor_ForeignAccount_Personal_TypeIndividual(){
    cy.xpath("//span[normalize-space()='Foreign Questionnaire']").should('be.visible')
    cy.xpath("//span[normalize-space()='W-8BEN (Individuals)']").should('be.visible')
  }

  //----####----FOR ENTITY APPLICATION ONLY----####----\\

  //----DOCUMENT THAT SHOULD BE VISIBLE 

  CorporateResolutionDocumentShouldBeVisibleFor_Entity_TypeCorporate(){
    cy.xpath("//span[normalize-space()='Corporate Resolution']").should('be.visible')
  } 

  LLCAuthorizationDocumentShouldBeVisibleFor_Entity_TypeLLC(){
    cy.xpath("//span[normalize-space()='LLC Authorization']").should('be.visible')
  } 

  W8BenDocumentShouldBeVisibleFor_Entity(){
    cy.xpath("//span[normalize-space()='W-8BEN-E (Entities)']").should('be.visible')
  } 

  LPBrokerAgreementShouldBeVisibleFor_Entity_TypePartnership(){
    cy.xpath("//span[normalize-space()='LP Broker Agreement']").should('be.visible')
  }



  //----MANDATORY DOCUMENT THAT SHOULD BE UPLOADED 

  LPBrokerAgreementUploadFor_Entity_TypePartnership(){
    cy.xpath("//input[@name='filePartnershipAgreement']", 'LP_Broker_Agreement.pdf')
  }
  CorporateDocumentUploadFor_Entity_TypeCorporate(){
    ActionLibrary.uploadFile("//input[@name='fileIncorporateArticles']", 'Corporate_Resolution.pdf');
  }
  TrustCertificateUplaodFor_Entity_TypeTrust(){
    ActionLibrary.uploadFile("//input[@name='fileTrustCertificate']", 'Trust_Cretificate.pdf')
  }
  DriverLicenseUploadFor_Entity(){
    ActionLibrary.uploadFile("//input[@name='fileDrivingLicenseSigner1Front']", 'PrimaryFront-DL.jpg')
    ActionLibrary.uploadFile("//input[@name='fileDrivingLicenseSigner1Back']", 'Primaryback-DL.jpg')

  }
  GovernmentIDUploadFor_Entity(){
    ActionLibrary.uploadFile("//input[@name='fileGovtIssueIdSigner1Front']", 'PrimaryFront-GOV-ID.jpg')
    ActionLibrary.uploadFile("//input[@name='fileGovtIssueIdSigner1Back']", 'Primaryback-GOV-ID.jpg')

  }
  LLCAuthorizationUploadFor_Entity_TypeLLC(){
    ActionLibrary.uploadFile("//input[@name='fileLLCArticles']", 'LLC_Authorization.pdf')
  }
  PassportIDUploadFor_Entity(){
    ActionLibrary.uploadFile("//input[@name='filePassportSigner1']", 'PrimaryPassport.jpg')
  }
  PassportIDUploadForBeneficialOwners_Entity(){
   ActionLibrary.uploadFile("//input[@name='fileGovtIssueIdMember1']", 'SecondaryPassport.jpg')
  }
  W8BenDocumentUploadFor_Foreign_Entity(){
   ActionLibrary.uploadFile("//input[@name='fileW8BENEntities']", 'W-8_Individual.pdf')
  }
  ForeignQuestionnaireUploadFor_Foreign_Entity(){
   ActionLibrary.uploadFile("//input[@name='fileForeignQuestions']", 'Foreign_Questionnaire.pdf')
  }

  NonProfitEntityDocumentUpload(){
   ActionLibrary.uploadFile("//input[@name='fileAOI']", 'Doc.pdf')   //  Articles of Incorporation
   ActionLibrary.uploadFile("//input[@name='fileBylaws']", 'Doc.pdf')   //  Bylaws
   ActionLibrary.uploadFile("//input[@name='fileOrgMinutes']", 'Doc.pdf')  //  Organizational Minutes: 
   ActionLibrary.uploadFile("//input[@name='fileCOI']", 'Doc.pdf')  //  Conflict of Interest Policy:
   ActionLibrary.uploadFile("//input[@name='fileJobDesc']", 'Doc.pdf')  //  Job Descriptions
  }

  //----####----FOR IRA APPLICATION ONLY----####----\\
  
  GovernmentIDUploadFor_IRA(){
   ActionLibrary.uploadFile("//input[@name='fileGovIssuedIdLicenseA']", 'PrimaryFront-GOV-ID.jpg')
   ActionLibrary.uploadFile("//input[@name='fileGovIssuedIdLicenseB']", 'Primaryback-GOV-ID.jpg')

  }


  Save(){
    cy.xpath(FormUsageButtons.Save).click()
  }
  SaveAndContinue(){
    cy.xpath(FormUsageButtons.SaveAndContinue).click({force: true})    
  }  

}
