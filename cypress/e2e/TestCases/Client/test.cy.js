
import { EmploymentInformationPage } from "@Pages/Client/Personal/EmploymentInfomationPage"
import { RegulatoryItemsLocators} from "@Locators/createNewAccountLocators.json"
import { RegulatoryItemsPage } from "@Pages/Client/Personal/RegulatoryItemsPage"
import { dataGeneratorUtils } from "@Utils/dataGeneratorUtils"
import { FormUsageButtons } from "@Locators/FormUsageButtons.json";
import { DocumentUploadPage } from "@Pages/Client/Personal/DocumentUploadPage"
import { DisclosureSignaturesPage } from "@Pages/Client/Personal/DisclosureSignaturesPage"
import { PersonalInformationPage} from "@Pages/Client/Personal/PersonalInformationPage"
import { CloseToasterIfAppearUtils } from "@Utils/CloseToasterIfAppearUtils";
import { IfApplicationStatusNotCompletedThenCancelUtils } from "@Utils/IfApplicationStatusNotCompletedThenCancelUtils";



// Test setup
//const testInvestor = new InvestmentProfilePage
const testemploy = new EmploymentInformationPage
const reg = new RegulatoryItemsPage
const doc = new DocumentUploadPage
const sig = new DisclosureSignaturesPage
const perspnal = new PersonalInformationPage
const randomData = dataGeneratorUtils();
const countries = require("../../fixtures/CountryAndStates.json")

import 'cypress-iframe';  // Importing iframe plugin
// beforeEach(() => {


  
//   cy.intercept('POST', 'www.google.com/recaptcha/api2/reload?k=6LeVTZcqAAAAAGZlnkWxSND3sD1imTmfDktzj0DZ', (req) => {
//     req.reply({ captchaPassed: true });
//   });

// });


describe('Handle reCAPTCHA Mocking on Frontend', () => {
  it('Mock reCAPTCHA and Log In Successfully',  { tags: ['@smoke']}, () => {
    // Visit the page
    cy.visit('', {
      failOnStatusCode: false,
      auth: {
        username: 'ola-staging',
        password: 'Atlasclear@123/'
      }
    })

    cy.frameLoaded('iframe[src*="recaptcha/api2/anchor"]'); 
    cy.iframe('iframe[src*="recaptcha/api2/anchor"]').find('.recaptcha-checkbox').click(); 



    cy.xpath("//input[@id='username']").type('democlient');
    cy.xpath("//input[@id='password']").type('Pac@123456');
    cy.xpath('//button[normalize-space()="Login"]').click();
    cy.wait(4000)
    
    cy.url().should('include', '/dashboard')

  })
})

//-----------------------------------------------------------------------------

describe.skip('Handle reCAPTCHA Mocking on Frontend', () => {


  it('Mock reCAPTCHA and Log In Successfully', () => {
    // Visit the page
    cy.visit('', {
      failOnStatusCode: false,
      auth: {
        username: 'ola-staging',
        password: 'Atlasclear@123/'
      }
    });


    cy.window().then((win) => {
      win.grecaptcha = {
        execute: cy.stub().returns('mocked-token'),
        getResponse: cy.stub().returns('mocked-token'),
        render: cy.stub().returns(true),
      };
    })

    cy.intercept('POST', 'https://www.google.com/recaptcha/api2/reload?k=6LeVTZcqAAAAAGZlnkWxSND3sD1imTmfDktzj0DZ', {
      statusCode: 200,
      body: {
        success: true,
        challenge_ts: new Date().toISOString(),
        hostname: 'localhost', 
      },
    }).as('recaptchaReload');


    cy.frameLoaded('iframe[src*="recaptcha/api2/anchor"]'); 
    cy.iframe('iframe[src*="recaptcha/api2/anchor"]').find('.recaptcha-checkbox').click();  

  
    cy.get('textarea[name="g-recaptcha-response"]')
      .should('exist')  
      .invoke('val', 'mocked-token')

    
      cy.iframe('iframe[src*="recaptcha/api2/anchor"]')
      .should('exist')
      .then(($checkbox) => {
        $checkbox.addClass('recaptcha-checkbox-checked')
        $checkbox.attr('aria-checked', 'true')
      });

    cy.xpath("//input[@id='username']").type('democlient');
    cy.xpath("//input[@id='password']").type('Pac@123456');
    cy.xpath('//button[normalize-space()="Login"]').click();
    cy.wait('@recaptchaReload');

  })
})