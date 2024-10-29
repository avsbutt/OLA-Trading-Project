import { DocumentUploadLocators } from "../../../../../Locators/Personal/DocumentUploadLocators.json"
import { FormUsageButtons } from "../../../../../Locators/FormUsageButtons.json";

export class DocumentUploadPage{
    UploadDrivingLiscenceIfVisible(){
      // cy.xpath(DocumentUploadLocators.UploadDrivingLicenses).attachFile('Doc.pdf')
       cy.document().then((doc) => {
        const element = doc.querySelector('input[name="filePrimaryDL"]');
     
        if (element) {
          // Element is present, upload the file
          cy.wrap(element).attachFile('Doc.pdf', { subjectType: 'input' });
        } 
      });

    }

    UploadPassportIfVisible(){
      cy.xpath(DocumentUploadLocators.UploadPassport).attachFile('image.jpeg' , { subjectType: 'input' });
      // cy.document().then((doc) => {
      //   const element = doc.querySelector('input[name="filePrimaryPassport"]');       
      //   if (element) {
      //     cy.wrap(element).attachFile('image.jpeg')
      //   } 
      // });

    }
    UploadAuthorizationDocumentIfVisible(){
        //cy.xpath(DocumentUploadLocators.UploadAuthorizationDocument).attachFile('Doc.pdf')
        cy.document().then((doc) => {
          const element = doc.querySelector('input[name="fileDividentAuth"]');
          if (element) {
            cy.wrap(element).attachFile('Doc.pdf', { subjectType: 'input' });
          } 
        });
    }


    UploadGovernmentIdIfVisible(){
   // cy.get('input[name="fileGovIssuedIdLicense"]').attachFile('image.jpeg')

    cy.xpath(DocumentUploadLocators.UploadGovernmentId).then(input => {
      cy.wrap(input)
          .focus() 
          .selectFile('C:/Users/awais.m/Desktop/Automation Projects/Cypress/OLA/cypress/e2e/fixtures/Doc.pdf', { action: 'select' })
          .trigger('change');
    })
   

      //   const element = doc.querySelector('input[name="fileGovIssuedIdLicense"]');
      //   if (element) {
      //     cy.wrap(element).attachFile('Doc.pdf', { subjectType: 'input' });     
      //   } 
      // });
    }


    UploadUtilityBillIfVisible(){
     //   cy.xpath(DocumentUploadLocators.UploadUtilityBill).attachFile('Doc.pdf')
       cy.document().then((doc) => {
        const element = doc.querySelector('input[name="filePrimaryBankStatement"]');
    
        if (element) {
          cy.wrap(element).attachFile('Doc.pdf', { subjectType: 'input' });
        }
         // else {
          // Element is not present, log message and pass test
          // cy.log('Element input[name="filePrimaryBankStatement"] not found, test passed');
          //}
      });
    }

    
    SaveAndContinue(){
        cy.xpath(FormUsageButtons.SaveAndContinue).click({force: true})
        
    }  

    
}
