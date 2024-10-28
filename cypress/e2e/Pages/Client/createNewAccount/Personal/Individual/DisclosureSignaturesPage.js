import { DisclosureSignaturesLocators } from "../../../../../Locators/Personal/DisclosureSignatureLocators.json"
import { FormUsageButtons } from "../../../../../Locators/FormUsageButtons.json";

export class DisclosureSignaturesPage{

    AccountAgreement(){
    // cy.xpath(DisclosureSignaturesLocators.AccountAgreementYes).check()
     cy.document().then((doc) => {
     const element = doc.querySelector('input[value="true"][name="wdaccountAgreementCashCheck"]');
        
      if (element) {
         cy.wrap(element).check();
          }
    });


   // Stub window.open to prevent new tab navigation for the PDF link
   cy.window().then((win) => {
   if (!win.open.stubbed) {
    cy.stub(win, 'open').as('windowOpen');
    win.open.stubbed = true;
   }
   });

   // Handle intermittent "Account Agreement" PDF link
   cy.document().then((doc) => {
   const pdfLink = doc.querySelector('div:nth-child(3) a:nth-child(1)');
   if (pdfLink) {
    cy.wrap(pdfLink).click();
    
    // Verify if `window.open` was called, confirming the link click would open a new tab
    cy.get('@windowOpen').should('have.been.called');
    cy.log('PDF link click simulated and intercepted by stub');
   } else {
    cy.log('PDF link not present in DOM');
   }
   });


  }

    AccountAgreementCashAndMargin(){
    // cy.xpath(DisclosureSignaturesLocators.AccountAgreementCashAndMarginYes).check()
      cy.document().then((doc) => {
        const element = doc.querySelector('input[value="true"][name="wdaccountAgreementCashMarginCheck"]');
    
        if (element) {
          cy.wrap(element).check();
        } 
      });


  // Stub window.open to prevent new tab navigation for the PDF link
  cy.window().then((win) => {
    if (!win.open.stubbed) {
      cy.stub(win, 'open').as('windowOpen');
      win.open.stubbed = true;
    }
  });

  // Handle intermittent "Account Agreement" PDF link
  cy.document().then((doc) => {
    const pdfLink = doc.querySelector('div:nth-child(5) a:nth-child(1)');
    
    if (pdfLink) {
      cy.wrap(pdfLink).click();
      
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
            cy.wrap(element).check();
          } 
          // else {
          //   // Element is not present, log a message and continue
          //   cy.log('Element input[value="true"][name="wdfullyPaidSecLoadAgreementCheck"] not found, test passed');
          // }
        });
         
          // Stub window.open to prevent new tab navigation for the PDF link
  cy.window().then((win) => {
    if (!win.open.stubbed) {
      cy.stub(win, 'open').as('windowOpen');
      win.open.stubbed = true;
    }
  });

  // Handle intermittent "Account Agreement" PDF link
  cy.document().then((doc) => {
    const pdfLink = doc.querySelector('div:nth-child(7) a:nth-child(1)');
    
    if (pdfLink) {
      cy.wrap(pdfLink).click();
      
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