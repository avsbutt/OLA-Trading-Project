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
   cy.xpath(loginLocators.username).type(data.clientCrendetial.username)  
   cy.xpath(loginLocators.password).type(data.clientCrendetial.password) 
  })

  cy.xpath(loginLocators.loginBtn).click()
  cy.url().should('include', '/dashboard')
}

export function RegisterRepresentativeLoginUtils(){
  cy.visit("", {failOnStatusCode: false, timeout: 20000,
    auth: {
      username: 'ola-staging',
      password: 'Atlasclear@123/'
     }
  })
 
   cy.fixture('UsersCredential.json').then((data) => {
      cy.xpath(loginLocators.username).type(data.rrCredential.username)  
      cy.xpath(loginLocators.password).type(data.rrCredential.password)
   })
  
}