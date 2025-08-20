import { DocumentUploadLocators, CoApplicantDocumentUploadLocators } from "@Locators/Personal/DocumentUploadLocators.json"
import { FormUsageButtons } from "@Locators/FormUsageButtons.json";



export class DocumentUploadPage{


  UploadDrivingLiscenceFor_Personal(){
    cy.xpath(DocumentUploadLocators.UploadDrivingLicensesFront).focus().attachFile('image.png')
    cy.xpath(DocumentUploadLocators.UploadDrivingLicensesBack).focus().attachFile('image.png')
  }

  UploadPassportFor_Personal(){
     cy.xpath(DocumentUploadLocators.UploadPassport).focus().attachFile('Doc.pdf' , { subjectType: 'input' });
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
     cy.xpath(DocumentUploadLocators.UploadGovernmentId).focus().attachFile('Doc.pdf')

  }

  GovernmentIDUploadFor_PersonalCoApplicant(){
    cy.xpath(CoApplicantDocumentUploadLocators.UploadGovernmentId).focus().attachFile('Doc.pdf')
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
    cy.xpath(DocumentUploadLocators.UploadW8Ben).focus().attachFile('Doc.pdf')
  }



  UploadForeignQuestionnaireFor_Foreign_Personal(){
    cy.xpath(DocumentUploadLocators.UploadForeignQuestions).focus().attachFile('image.jpeg')
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
    cy.xpath("//input[@name='filePartnershipAgreement']").focus().attachFile('Doc.pdf')
  }
  CorporateDocumentUploadFor_Entity_TypeCorporate(){
    cy.xpath("//input[@name='fileIncorporateArticles']").focus().attachFile('Doc.pdf')
  }
  TrustCertificateUplaodFor_Entity_TypeTrust(){
    cy.xpath("//input[@name='fileTrustCertificate']").focus().attachFile('Doc.pdf')
  }
  DriverLicenseUploadFor_Entity(){
    cy.xpath("//input[@name='fileDrivingLicenseSigner1']").focus().attachFile('Doc.pdf')
  }
  GovernmentIDUploadFor_Entity(){
    cy.xpath("//input[@name='fileGovtIssueIdSigner1']").focus().attachFile('Doc.pdf')
  }
  LLCAuthorizationUploadFor_Entity_TypeLLC(){
    cy.xpath("//input[@name='fileLLCArticles']").focus().attachFile('Doc.pdf')
  }
  PassportIDUploadFor_Entity(){
    cy.xpath("//input[@name='filePassportSigner1']").focus().attachFile('Doc.pdf')
  }
  PassportIDUploadForBeneficialOwners_Entity(){
    cy.xpath("//input[@name='fileGovtIssueIdMember1']").focus().attachFile('Doc.pdf')
  }
  W8BenDocumentUploadFor_Foreign_Entity(){
    cy.xpath("//input[@name='fileW8BENEntities']").focus().attachFile('Doc.pdf')
  }
  ForeignQuestionnaireUploadFor_Foreign_Entity(){
    cy.xpath("//input[@name='fileForeignQuestions']").focus().attachFile('Doc.pdf')
  }

  NonProfitEntityDocumentUpload(){
    cy.xpath("//input[@name='fileAOI']").focus().attachFile('Doc.pdf')   //  Articles of Incorporation
    cy.xpath("//input[@name='fileBylaws']").focus().attachFile('Doc.pdf')   //  Bylaws
    cy.xpath("//input[@name='fileOrgMinutes']").focus().attachFile('Doc.pdf')  //  Organizational Minutes: 
    cy.xpath("//input[@name='fileCOI']").focus().attachFile('Doc.pdf')  //  Conflict of Interest Policy:
    cy.xpath("//input[@name='fileJobDesc']").focus().attachFile('Doc.pdf')  //  Job Descriptions
  }

  //----####----FOR IRA APPLICATION ONLY----####----\\
  
  GovernmentIDUploadFor_IRA(){
    cy.xpath("//input[@name='fileGovIssuedIdLicense']").focus().attachFile('Doc.pdf')
  }


  Save(){
    cy.xpath(FormUsageButtons.Save).click()
  }
  SaveAndContinue(){
    cy.xpath(FormUsageButtons.SaveAndContinue).click({force: true})    
  }  

}
