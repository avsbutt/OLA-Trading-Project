//THIS FUNCTION LOGIN THE APPLICATION AND ALSO LOGIN THE AUTHENTICATION APPLIED IN OUR SITE
import { loginLocators} from "../Locators/loginLocators.json";

export function clientLoginUtils() {

 // const captchaKey = Cypress.env('CAPTCHA_KEY');


  cy.visit("", {failOnStatusCode: false, timeout: 20000,
   auth: {
     username: 'ola-staging',
     password: 'Atlasclear@123/'
    }
  })

  cy.fixture('UsersCredential.json').then((data) => {
   cy.xpath(loginLocators.username).type(data.wdCredentials.clientCrendetial.username)  
   cy.xpath(loginLocators.password).type(data.wdCredentials.clientCrendetial.password) 
  })

  cy.xpath(loginLocators.loginBtn).click()
  cy.url().should('include', '/dashboard')
}

export function glendaleClientLoginUtils() {

 // const captchaKey = Cypress.env('CAPTCHA_KEY');


  cy.visit("", {failOnStatusCode: false, timeout: 20000,
   auth: {
     username: 'ola-staging',
     password: 'Atlasclear@123/'
    }
  })

  cy.fixture('UsersCredential.json').then((data) => {
   cy.xpath(loginLocators.username).type(data.glendaleCredentials.clientCrendetial.username)  
   cy.xpath(loginLocators.password).type(data.glendaleCredentials.clientCrendetial.password) 
  })

  cy.xpath(loginLocators.loginBtn).click()
  cy.url().should('include', '/dashboard')
}

export function registerRepresentativeLoginUtils(){
  cy.visit("", {failOnStatusCode: false, timeout: 20000,
    auth: {
      username: 'ola-staging',
      password: 'Atlasclear@123/'
     }
  })
 
   cy.fixture('UsersCredential.json').then((data) => {
      cy.xpath(loginLocators.username).type(data.wdCredentials.rrCredential.username)  
      cy.xpath(loginLocators.password).type(data.wdCredentials.rrCredential.password)
   })
  cy.xpath(loginLocators.loginBtn).click()
  cy.url().should('include', '/dashboard')

  
}

export function supervsorLoginUtils(){
  cy.visit("", {failOnStatusCode: false, timeout: 20000,
    auth: {
      username: 'ola-staging',
      password: 'Atlasclear@123/'
     }
  })
 
   cy.fixture('UsersCredential.json').then((data) => {
      cy.xpath(loginLocators.username).type(data.wdCredentials.superisorCredential.username)  
      cy.xpath(loginLocators.password).type(data.wdCredentials.superisorCredential.password)
   })
  cy.xpath(loginLocators.loginBtn).click()
  cy.url().should('include', '/dashboard')

  
}