import { DocumentUploadLocators } from "../../../../../Locators/Personal/DocumentUploadLocators.json"
import { FormUsageButtons } from "../../../../../Locators/FormUsageButtons.json";

export class DocumentUploadPage{
    UploadDrivingLiscenceIfVisible(){
        cy.xpath(DocumentUploadLocators.UploadDrivingLicenses)
    }
    UploadAuthorizationDocumentIfVisible(){
        cy.xpath(DocumentUploadLocators.UploadDrivingLicenses)
    }
    UploadUtilityBillIfVisible(){
        cy.xpath(DocumentUploadLocators.UploadDrivingLicenses)
    }
    SaveAndContinue(){
        cy.xpath(FormUsageButtons.SaveAndContinue).click({ force: true });
    }  

    
}
