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
  // Step 1️⃣ — Visit base URL with Basic Auth
  cy.visit('', {
    failOnStatusCode: false,
    timeout: 20000,
    auth: {
      username: 'ola-staging',
      password: 'Atlasclear@123/',
    },
  });

  // Step 2️⃣ — Load credentials and handle all roles dynamically
  cy.fixture('UsersCredential.json').then((data) => {
    // Select correct group: wd or glendale
    const userGroup =
      userType === 'glendale' ? data.glendaleCredentials : data.wdCredentials;

    // Normalize role name and handle typos
    const normalizedRole = role.toLowerCase();
    const possibleKeys = [
      `${normalizedRole}Credential`,
      `${normalizedRole}Crendetial`, // handles old typo
      normalizedRole === 'supervisor' ? 'superisorCredential' : null, // typo handling
    ].filter(Boolean);

    // Try each possible key until one is found
    const credsKey = possibleKeys.find((key) => userGroup[key]);
    const creds = credsKey ? userGroup[credsKey] : null;

    // Validation: throw descriptive error if not found
    if (!creds) {
      throw new Error(
        `❌ Invalid userType/role combination:
         userType = "${userType}", role = "${role}"
         Available keys: ${Object.keys(userGroup).join(', ')}`
      );
    }

    // Step 3️⃣ — Enter credentials
    TypeLibrary.type(loginLocators.username, creds.username);
    TypeLibrary.type(loginLocators.password, creds.password);

    // Step 4️⃣ — Submit login form
    ClickLibrary.click(loginLocators.loginBtn);
    WaitLibrary.waitUntilUrlContains('/dashboard');
    WaitLibrary.waitForLoader();
  });
}

