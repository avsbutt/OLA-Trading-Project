//THIS FUNCTION LOGIN THE APPLICATION AMD ALSO LOGIN THE AUTHENTICATION APPLIED IN OUR SITE
import { loginLocators} from "../Locators/loginLocators.json";

export function clientLoginUtils() {
  cy.visit("", {failOnStatusCode: false,
   auth: {
     username: 'ola-staging',
     password: 'Atlasclear@123/'
    }
  })

  cy.fixture('UsersCredential.json').then((data) => {
   cy.xpath(loginLocators.username).type(data.clientCrendetial.username);  
   cy.xpath(loginLocators.password).type(data.clientCrendetial.password); 
  });

  cy.xpath(loginLocators.loginBtn).click()
  cy.url().should('include', '/dashboard')
}

export function brokerLoginUtils(){
  
}