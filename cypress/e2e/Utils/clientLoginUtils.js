import { loginLocators} from "../Locators/loginLocators.json";
import {P02_LoginClass} from "../Pages/P02_Login";

const Login= require('../../Locators/loginLocators.json');
const P02_LoginUtils = new P02_LoginClass;

export function clientLoginUtils() {
    cy.visit("", {failOnStatusCode: false,
        auth: {
          username: 'ola-staging',
          password: 'Atlasclear@123/'
        }
      })
      cy.readFile('cypress/e2e/fixtures/clientCredentials.json').then((data) => {
      cy.xpath(Login.loginLocators.username).type(data.username)
      cy.xpath(Login.loginLocators.password).type(password)
      })
      cy.xpath(Login.loginLocators.loginBtn).click()

}