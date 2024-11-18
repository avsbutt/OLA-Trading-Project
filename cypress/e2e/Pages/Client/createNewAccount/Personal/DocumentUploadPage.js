import { DocumentUploadLocators, CoApplicantDocumentUploadLocators } from "../../../../Locators/Personal/DocumentUploadLocators.json"
import { FormUsageButtons } from "../../../../Locators/FormUsageButtons.json";



export class DocumentUploadPage{


  UploadDrivingLiscenceIfVisible(){
    // cy.xpath(DocumentUploadLocators.UploadDrivingLicenses).attachFile('Doc.pdf')
    cy.document().then((doc) => {
      const element = doc.querySelector('input[name="filePrimaryDL"]');
      if (element) {
       cy.wrap(element).focus().attachFile('Doc.pdf', { subjectType: 'input' });    // Element is present, upload the file
      } 
    });
  }



  UploadPassportIfVisible(){
    // cy.xpath(DocumentUploadLocators.UploadPassport).attachFile('image.jpeg' , { subjectType: 'input' });
    cy.document().then((doc) => {
     const element = doc.querySelector('input[name="filePrimaryPassport"]');       
     if (element) {
        cy.wrap(element).focus().attachFile('image.jpeg')
      } 
    });
  }



  UploadAuthorizationDocumentIfVisible(){
   // cy.xpath(DocumentUploadLocators.UploadAuthorizationDocument).attachFile('Doc.pdf')
   cy.document().then((doc) => {
     const element = doc.querySelector('input[name="fileDividentAuth"]');
     if (element) {
       cy.wrap(element).focus().attachFile('Doc.pdf', { subjectType: 'input' });
      } 
    });
  }


  
  UploadGovernmentIdIfVisible(){
    // cy.xpath(DocumentUploadLocators.UploadGovernmentId).attachFile('image.jpeg')
    // cy.xpath(DocumentUploadLocators.UploadGovernmentId).then(input => {
    //   cy.wrap(input)
    //       .focus() 
    //       .selectFile('cypress/fixtures/Doc.pdf', { action: 'select' })
    //       .trigger('change');

   cy.document().then((doc) => {
     const element = doc.querySelector('input[name="fileGovIssuedIdLicense"]');
     if (element) {
       cy.wrap(element).focus().attachFile('Doc.pdf', { subjectType: 'input' });
      }
    })
  }



  UploadGovernmentIdIfVisibleCoApplicant(){
    // cy.xpath(CoApplicantDocumentUploadLocators.UploadGovernmentId).attachFile('image.jpeg')

   cy.document().then((doc) => {
     const element = doc.querySelector('input[name="coAppfileGovIssuedIdLicense"]');
     if (element) {
       cy.wrap(element).focus().attachFile('Doc.pdf', { subjectType: 'input' });
      }
    })
  }



  UploadUtilityBillIfVisible(){
    // cy.xpath(DocumentUploadLocators.UploadUtilityBill).attachFile('Doc.pdf')
    cy.document().then((doc) => {
      const element = doc.querySelector('input[name="filePrimaryBankStatement"]');
      if (element) {
        cy.wrap(element).focus().attachFile('Doc.pdf', { subjectType: 'input' });
      }   
    });
  }



  UploadSelfieIfVisible(){
    // cy.xpath(DocumentUploadLocators.UploadSelfie).attachFile('Doc.pdf')
    cy.document().then((doc) => {
      const element = doc.querySelector('input[name="filePrimarySelfie"]');
      if (element) {
        cy.wrap(element).focus().attachFile('Doc.pdf', { subjectType: 'input' });
      }   
    });
  }



  UploadW8Ben_ForForeignAccount(){
    // cy.xpath(DocumentUploadLocators.UploadW8Ben).attachFile('Doc.pdf')
    cy.document().then((doc) => {
      const element = doc.querySelector('input[name="filePrimaryW8BENIndividuals"]');
      if (element) {
        cy.wrap(element).focus().attachFile('Doc.pdf', { subjectType: 'input' });
      }   
    });
  }



  UploadForeignQuestionFor_ForeignAccount(){
    // cy.xpath(DocumentUploadLocators.UploadForeignQuestions).attachFile('Doc.pdf')
    cy.document().then((doc) => {
      const element = doc.querySelector('input[name="filePrimaryForeignQuestions"]');
      if (element) {
        cy.wrap(element).focus().attachFile('Doc.pdf', { subjectType: 'input' });
      }   
    });
  }

  DocumentsShouldBeVisibleFor_ForeignAccount_Personal_TypeIndividual(){
    cy.xpath("//span[normalize-space()='Foreign Questionnaire']").should('be.visible')
    cy.xpath("//span[normalize-space()='W-8BEN (Individuals)']").should('be.visible')

  }

  //----####----FOR ENTITY APPLICATION ONLY----####----\\
  CorporateResolutionDocumentShouldBeVisibleFor_Entity_TypeCorporate(){
    cy.xpath("//span[normalize-space()='Corporate Resolution']").should('be.visible')
  } 
  W8BenDocumentShouldBeVisibleFor_Entity_TypeCorporate(){
    cy.xpath("//span[normalize-space()='W-8BEN-E (Entities)']").should('be.visible')
  } 

  CorporateDocumentUploadFor_Entity_TypeCorporate(){
    cy.xpath("//input[@name='fileIncorporateArticles']").focus().attachFile('Doc.pdf')
  }

  DriverLicenseUploadFor_Entity_TypeCorporate(){
    cy.xpath("//input[@name='fileDrivingLicenseSigner1']").focus().attachFile('Doc.pdf')
  }

  GovernmentIDUploadFor_Entity_TypeCorporate(){
    cy.xpath("//input[@name='fileGovtIssueIdSigner1']").focus().attachFile('Doc.pdf')
  }
  PassportIDUploadFor_Entity_TypeCorporate(){
    cy.xpath("//input[@name='filePassportSigner1']").focus().attachFile('Doc.pdf')
  }
  PassportIDUploadForBeneficialOwners_Entity_TypeCorporate(){
    cy.xpath("//input[@name='fileGovtIssueIdMember1']").focus().attachFile('Doc.pdf')
  }

  W8BenDocumentUploadFor_Foreign_Entity_TypeCorporate(){
    cy.xpath("//input[@name='fileW8BENEntities']").focus().attachFile('Doc.pdf')
  }

  ForeignQuestionnaireUploadFor_Foreign_Entity_TypeCorporate(){
    cy.xpath("//input[@name='fileForeignQuestions']").focus().attachFile('Doc.pdf')
  }

  


  Save(){
    cy.xpath(FormUsageButtons.Save).click()
  }
  SaveAndContinue(){
    cy.xpath(FormUsageButtons.SaveAndContinue).click({force: true})    
  }  

}
