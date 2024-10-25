import { loginLocators} from "../Locators/loginLocators.json";

export function clientLoginUtils() {
    cy.visit("", {failOnStatusCode: false,
        auth: {
          username: 'ola-staging',
          password: 'Atlasclear@123/'
        }
      })
        cy.fixture('clientCredentials.json').then((data) => {
        cy.xpath(loginLocators.username).type(data.username);  
        cy.xpath(loginLocators.password).type(data.password); 
    });
      cy.xpath(loginLocators.loginBtn).click()
      cy.url().should('include', '/dashboard')
}