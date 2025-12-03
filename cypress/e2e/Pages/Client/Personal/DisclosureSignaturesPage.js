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
  
  cy.get('input:is([value="true"][name="glCashandMargin"], [value="true"][name="wdaccountAgreementCashMarginCheck"])')
    .click({ force: true });
    // cy.document().then((doc) => {
    //   const element = doc.querySelector('input:is([value="true"][name="glCashandMargin"], [value="true"][name="wdaccountAgreementCashMarginCheck"])')
    //   const element2 = doc.querySelector('input:is([value="false"][name="glCashandMargin"], [value="false"][name="wdaccountAgreementCashMarginCheck"])')
    //   if (element) {
    //     cy.wrap(element).focus().check({ force: true })
    //     cy.wrap(element2).focus().check({ force: true })
    //     cy.wrap(element).focus().check({ force: true })    
    //   } 
    // })

    this.stubWindowOpen();  // Call the helper function to open link in a another hidden tab

 
    cy.xpath(DisclosureSignaturesLocators.AccountAgreementCashAndMargin).should('be.visible').click({ force: true })     // PDF Link
    cy.get('@windowOpen').should('have.been.called');   // Verify if window.open was called, confirming the link click would open a new tab
    cy.log('PDF link click simulated and intercepted by stub');
  }

  //---------------------------------------------------\\

  AccountAgreement(){
    // cy.document().then((doc) => {
    //   const element = doc.querySelector('input[value="true"][name="wdaccountAgreementCashCheck"]');
          
    //   if (element) {
    //     cy.wrap(element).focus().check({ force: true })
    //     cy.wait(2000)
    //     }
    // })
  cy.get('input[value="true"][name="wdaccountAgreementCashCheck"]')
    .click({ force: true })
    .wait(2000);
   this.stubWindowOpen();  // Call the helper function
  
  
   cy.xpath(DisclosureSignaturesLocators.AccountAgreement).should('be.visible').click({ force: true })   // PDF Link
   cy.get('@windowOpen').should('have.been.called')   // Verify if window.open was called, confirming the link click would open a new tab
   cy.log('PDF link click simulated and intercepted by stub')
  }

  //---------------------------------------------------\\

  FormCRSAgreement(){
    // cy.document().then((doc) => {
    //   const element = doc.querySelector('input:is([value="true"][name="glFormCRS"], [value="true"][name="wdFormCRSAgreementCheck"])');
    //   if (element) {
    //     cy.wrap(element).focus().check({ force: true }) 
    //   } 
    // })
    cy.get('input:is([value="true"][name="glFormCRS"], [value="true"][name="wdFormCRSAgreementCheck"])')
     .click({ force: true });
    this.stubWindowOpen();
    
    cy.xpath(DisclosureSignaturesLocators.FormCRSAgreement).should('be.visible').click({ force: true })   // PDF Link
    cy.get('@windowOpen').should('have.been.called')   // Verify if window.open was called, confirming the link click would open a new tab
    cy.log('PDF link click simulated and intercepted by stub')
  }

  //---------------------------------------------------\\

  FullyPaidSecuritiesLoanAgreement() {
    // cy.document().then((doc) => {
    //   const element = doc.querySelector('input:is([value="true"][name="wdfullyPaidSecLoadAgreementCheck"], [value="true"][name="wdFullyPaidSecLoadAgreementCheck"])');
    //   if (element) {
    //     cy.wrap(element).focus().check({ force: true })
    //   } 
    // });
     cy.get('input:is([value="true"][name="wdfullyPaidSecLoadAgreementCheck"], [value="true"][name="wdFullyPaidSecLoadAgreementCheck"])')
    .click({ force: true });
         
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

  

  //---------------------------------------------------\\

  FundingYourAccountAgreement(){
    // cy.document().then((doc) => {
    //   const element = doc.querySelector('input[value="true"][name="glFundingYourAccount"]');
    //   if (element) {
    //     cy.wrap(element).focus().check({ force: true }) 
    //   } 
    // })
     cy.get('input[value="true"][name="glFundingYourAccount"]')
     .click({ force: true });
    this.stubWindowOpen();
    
    cy.xpath(DisclosureSignaturesLocators.FundingYourAccount).should('be.visible').click({ force: true })   // PDF Link
    cy.get('@windowOpen').should('have.been.called')   // Verify if window.open was called, confirming the link click would open a new tab
    cy.log('PDF link click simulated and intercepted by stub')
  }
  
  
  //---------------------------------------------------\\
  
  AcknowledgeCheckbox(){
    cy.xpath("//input[@id='signatureCheck']").click()
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
    cy.wait(1000)
    cy.xpath(FormUsageButtons.Save).focus().click()
    cy.wait(1000)
    cy.xpath(FormUsageButtons.Review).focus().click()
  }

}
