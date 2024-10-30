import { DisclosureSignaturesLocators } from "../../../../../Locators/Personal/DisclosureSignatureLocators.json"
import { FormUsageButtons } from "../../../../../Locators/FormUsageButtons.json";

export class DisclosureSignaturesPage{


  stubWindowOpen() {
    cy.window().then((win) => {
      if (!win.open.stubbed) {
        cy.stub(win, 'open').as('windowOpen');
        cy.stub(win, 'location').as('windowLocation');
        win.open.stubbed = true; // Mark as stubbed to prevent re-stubbing
      }
    });
  }



    AccountAgreementCashAndMargin(){
    // cy.xpath(DisclosureSignaturesLocators.AccountAgreementCashAndMarginYes).check()
      cy.document().then((doc) => {
        const element = doc.querySelector('input[value="true"][name="wdaccountAgreementCashMarginCheck"]');
        const element2 = doc.querySelector('input[value="false"][name="wdaccountAgreementCashMarginCheck"]');
    
        if (element) {
          cy.wrap(element).check({ force: true });
          cy.wrap(element2).check({ force: true });
          cy.wrap(element).check({ force: true });
          
        } 
      });


      this.stubWindowOpen();  // Call the helper function

   // Handle intermittent "Account Agreement" PDF link
    cy.document().then((doc) => {
    const pdfLink = doc.querySelector('div:nth-child(5) a:nth-child(1)');
    
    if (pdfLink) {
      cy.wrap(Cypress.$(pdfLink)).should('be.visible').click({ force: true });
      
      // Verify if `window.open` was called, confirming the link click would open a new tab
      cy.get('@windowOpen').should('have.been.called');
      cy.log('PDF link click simulated and intercepted by stub');
    } else {
      cy.log('PDF link not present in DOM');
    }
    });    
  }




    AccountAgreement(){
      // cy.xpath(DisclosureSignaturesLocators.AccountAgreementYes).check()
       cy.document().then((doc) => {
       const element = doc.querySelector('input[value="true"][name="wdaccountAgreementCashCheck"]');
          
        if (element) {
           cy.wrap(element).check({ force: true });
           cy.wait(2000)
            }
      });
  
  
      this.stubWindowOpen();  // Call the helper function
  
     // Handle intermittent "Account Agreement" PDF link
     cy.document().then((doc) => {
     const pdfLink = doc.querySelector('div:nth-child(3) a:nth-child(1)');
     if (pdfLink) {
      cy.wrap(Cypress.$(pdfLink)).should('be.visible').click({ force: true });
      
      // Verify if `window.open` was called, confirming the link click would open a new tab
      cy.get('@windowOpen').should('have.been.called');
      cy.log('PDF link click simulated and intercepted by stub');
     } else {
      cy.log('PDF link not present in DOM');
     }
     });
  
    }



    AccountLoanAgreement() {
        cy.document().then((doc) => {
        const element = doc.querySelector('input[value="true"][name="wdfullyPaidSecLoadAgreementCheck"]');
      
        if (element) {
            cy.wrap(element).check({ force: true });
          } 
          // else {
          //   // Element is not present, log a message and continue
          //   cy.log('Element input[value="true"][name="wdfullyPaidSecLoadAgreementCheck"] not found, test passed');
          // }
        });
         
 this.stubWindowOpen();  // Call the helper function

  // Handle intermittent "Account Agreement" PDF link
  cy.document().then((doc) => {
    const pdfLink = doc.querySelector('div:nth-child(7) a:nth-child(1)');
    
    if (pdfLink) {
      cy.wrap(Cypress.$(pdfLink)).should('be.visible').click({ force: true });
      
      // Verify if `window.open` was called, confirming the link click would open a new tab
      cy.get('@windowOpen').should('have.been.called');
      cy.log('PDF link click simulated and intercepted by stub');
    } else {
      cy.log('PDF link not present in DOM');
    }
  });
     
      }


    FillSignature(){
        cy.xpath(DisclosureSignaturesLocators.DigitalSignature).click()
        cy.xpath(DisclosureSignaturesLocators.CaptureSignature).click().click()
    }

    ClickSaveAndReview(){
      cy.xpath(FormUsageButtons.Save).click()
      cy.xpath(FormUsageButtons.Review).click()
    }
}