import { DocumentUploadLocators, CoApplicantDocumentUploadLocators } from "../../../../Locators/Personal/DocumentUploadLocators.json"
import { FormUsageButtons } from "../../../../Locators/FormUsageButtons.json";



export class DocumentUploadPage{


  UploadDrivingLiscenceFor_Personal(){
    cy.xpath(DocumentUploadLocators.UploadDrivingLicenses).focus().attachFile('Doc.pdf')
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
    cy.xpath(DocumentUploadLocators.UploadForeignQuestions).attachFile('Doc.pdf')
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
