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



  UploadForeignQuestion_ForForeignAccount(){
    // cy.xpath(DocumentUploadLocators.UploadForeignQuestions).attachFile('Doc.pdf')
    cy.document().then((doc) => {
      const element = doc.querySelector('input[name="filePrimaryForeignQuestions"]');
      if (element) {
        cy.wrap(element).focus().attachFile('Doc.pdf', { subjectType: 'input' });
      }   
    });
  }

  DocumentsForForeignAccountShouldBeVisible(){
    cy.xpath("//span[normalize-space()='Foreign Questionnaire']").should('be.visible')
    cy.xpath("//span[normalize-space()='W-8BEN (Individuals)']").should('be.visible')

  }

  SaveAndContinue(){
    cy.xpath(FormUsageButtons.SaveAndContinue).click({force: true})    
  }  

}
