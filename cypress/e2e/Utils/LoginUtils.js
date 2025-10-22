import { loginLocators } from "../Locators/loginLocators.json";
import { TypeLibrary } from "../utils/TypeLibrary";
import { ClickLibrary } from "../utils/ClickLibrary";
import { WaitLibrary } from "../utils/WaitLibrary";
import { CheckLibrary } from "../utils/CheckLibrary";
/**
 * Universal Login Utility
 * @param {string} userType - 'wd' or 'glendale'
 * @param {string} role - 'client', 'rr', 'superisor', 'broker', or 'operator'
 */
export function LoginUtils(userType = 'wd', role = 'client') {
  // Visit with basic auth
  cy.visit("", {
    failOnStatusCode: false,
    timeout: 20000,
    auth: {
      username: 'ola-staging',
      password: 'Atlasclear@123/',
    },
  });

  // Load user credentials
  cy.fixture('UsersCredential.json').then((data) => {
    const userGroup = userType === 'glendale' ? data.glendaleCredentials : data.wdCredentials;
    const roleKey = `${role}Crendetial`;

    const creds = userGroup[roleKey];

    if (!creds) {
      throw new Error(`❌ Invalid userType/role: ${userType}, ${role}`);
    }

    TypeLibrary.type(loginLocators.username, creds.username);
    TypeLibrary.type(loginLocators.password, creds.password);
  });

  ClickLibrary.click(loginLocators.loginBtn);
  WaitLibrary.waitUntilUrlContains('/dashboard')
  WaitLibrary.waitForLoader()
}
