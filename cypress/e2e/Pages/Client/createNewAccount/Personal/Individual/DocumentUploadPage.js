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
    UploadAuthorizationDocumentIfVisible(){
        //cy.xpath(DocumentUploadLocators.UploadAuthorizationDocument).attachFile('Doc.pdf')
        cy.document().then((doc) => {
          const element = doc.querySelector('input[name="fileDividentAuth"]');
          
          if (element) {
            // Element is present, upload the file
            cy.wrap(element).attachFile('Doc.pdf', { subjectType: 'input' });
          } 
        });
    }


    UploadGovernmentIdIfVisible(){
      cy.document().then((doc) => {
        const element = doc.querySelector('input[name="fileGovIssuedIdLicense"]');
        if (element) {
          // Element is present, proceed with file upload
          cy.wrap(element).attachFile('Doc.pdf', { subjectType: 'input' });
        } 
      });
    }


    UploadUtilityBillIfVisible(){
       // cy.xpath(DocumentUploadLocators.UploadUtilityBill).attachFile('Doc.pdf')
       cy.document().then((doc) => {
        const element = doc.querySelector('input[name="filePrimaryBankStatement"]');
        
        if (element) {
          // Element is present, upload the file
          cy.wrap(element).attachFile('Doc.pdf', { subjectType: 'input' });
        }// else {
          // Element is not present, log message and pass test
         // cy.log('Element input[name="filePrimaryBankStatement"] not found, test passed');
        //}
      });
    }

    
    SaveAndContinue(){
        cy.xpath(FormUsageButtons.SaveAndContinue).click({ force: true });
    }  

    
}
