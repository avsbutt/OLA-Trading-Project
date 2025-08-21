import { DisclosureSignaturesLocators, DisclosureSignaturesCoApplicantLocators } from "@Locators/Personal/DisclosureSignatureLocators.json"
import { FormUsageButtons } from "@Locators/FormUsageButtons.json";

export class DisclosureSignaturesPage{


  stubWindowOpen() {
    cy.window().then((win) => {
      if (!win.open.stubbed) {
        cy.stub(win, 'open').as('windowOpen')
        // cy.stub(win, 'location').as('windowLocation');
        win.open.stubbed = true; // Mark as stubbed to prevent re-stubbing
      }
    });
  }



  AccountAgreementCashAndMargin(){
    // cy.xpath(DisclosureSignaturesLocators.AccountAgreementCashAndMarginYes).focus().check({ force: true })
    cy.document().then((doc) => {
      const element = doc.querySelector('input[value="true"][name="wdaccountAgreementCashMarginCheck"]');
      const element2 = doc.querySelector('input[value="false"][name="wdaccountAgreementCashMarginCheck"]');
    
      if (element) {
        cy.wrap(element).focus().check({ force: true })
        cy.wrap(element2).focus().check({ force: true })
        cy.wrap(element).focus().check({ force: true })    
      } 
    })

    this.stubWindowOpen();  // Call the helper function to open link in a another hidden tab

 
    cy.xpath(DisclosureSignaturesLocators.AccountAgreementCashAndMargin).should('be.visible').click({ force: true })     // PDF Link
    cy.get('@windowOpen').should('have.been.called');   // Verify if window.open was called, confirming the link click would open a new tab
    cy.log('PDF link click simulated and intercepted by stub');

    // cy.document().then((doc) => {
    //   const pdfLink = doc.querySelector('div:nth-child(5) a:nth-child(1)')
    
    //   if (pdfLink) {
    //    cy.wrap(Cypress.$(pdfLink)).should('be.visible').click({ force: true })
      
    //    // Verify if `window.open` was called, confirming the link click would open a new tab
    //    cy.get('@windowOpen').should('have.been.called')
    //    cy.log('PDF link click simulated and intercepted by stub')
    //   } 
    //   else {
    //    cy.log('PDF link not present in DOM')
    //   }
    // })
  }




  AccountAgreement(){
    // cy.xpath(DisclosureSignaturesLocators.AccountAgreementYes).check()
    cy.document().then((doc) => {
      const element = doc.querySelector('input[value="true"][name="wdaccountAgreementCashCheck"]');
          
      if (element) {
        cy.wrap(element).focus().check({ force: true })
        cy.wait(2000)
        }
    })
  
   this.stubWindowOpen();  // Call the helper function
  
  
   cy.xpath(DisclosureSignaturesLocators.AccountAgreement).should('be.visible').click({ force: true })   // PDF Link
   cy.get('@windowOpen').should('have.been.called')   // Verify if window.open was called, confirming the link click would open a new tab
   cy.log('PDF link click simulated and intercepted by stub')
  }



  //---------------------------------------------------\\

  FormCRSAgreement(){
    cy.document().then((doc) => {
      const element = doc.querySelector('input[value="true"][name="wdFormCRSAgreementCheck"]');
      const element2 = doc.querySelector('input[value="false"][name="wdFormCRSAgreementCheck"]');
    
      if (element) {
        cy.wrap(element).focus().check({ force: true }) 
      } 
    })
    
    this.stubWindowOpen();
    
    cy.xpath(DisclosureSignaturesLocators.FormCRSAgreement).should('be.visible').click({ force: true })   // PDF Link
    cy.get('@windowOpen').should('have.been.called')   // Verify if window.open was called, confirming the link click would open a new tab
    cy.log('PDF link click simulated and intercepted by stub')
  }

  //---------------------------------------------------\\

  FullyPaidSecuritiesLoanAgreement() {
    cy.document().then((doc) => {
      const element = doc.querySelector('input[value="true"][name="wdfullyPaidSecLoadAgreementCheck"]')
      if (element) {
        cy.wrap(element).focus().check({ force: true })
      } 
      // else {
      //   // Element is not present, log a message and continue
      //   cy.log('Element input[value="true"][name="wdfullyPaidSecLoadAgreementCheck"] not found, test passed');
      // }
    });
         
    this.stubWindowOpen();

    //PDF LINK
    cy.xpath(DisclosureSignaturesLocators.FullyPaidSecuritiesLoanAgreement).should('be.visible').click({ force: true });   
    cy.get('@windowOpen').should('have.been.called');   // Verify if window.open was called, confirming the link click would open a new tab
    cy.log('PDF link click simulated and intercepted by stub');
  }

  //a[normalize-space()='Account Agreement Cash & Margin Domestic']

  AccountAgreementCashAndMarginDomestic_ShouldNotBeVisibleOnlyForAllRetirementIRAApplications(){
    cy.xpath("//a[normalize-space()='Account Agreement Cash & Margin Domestic']")
    .should('not.exist') // Ensure the element not exists in the DOM
    
  }






  //----####----FOR FILL SIGNATURE----####----\\

  FillSignature(){
    cy.xpath(DisclosureSignaturesLocators.DigitalSignature).click()
    cy.xpath(DisclosureSignaturesLocators.CaptureSignature).click().click()
  }

  FillCoApplicantSignature(){
    cy.xpath(DisclosureSignaturesCoApplicantLocators.DigitalSignature).click()
    cy.xpath(DisclosureSignaturesCoApplicantLocators.CaptureSignature).click().click()
  }

  ClickSaveAndReview(){
    cy.xpath(FormUsageButtons.Save).focus().click()
    cy.xpath(FormUsageButtons.Review).focus().click()
  }

}
