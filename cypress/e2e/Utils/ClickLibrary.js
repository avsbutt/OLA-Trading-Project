// clickLibrary.js for Cypress

class ClickLibrary {
  
  // Click on an element with a timeout
  static click(locator, timeout = 5000) {
    console.log(`[ClickLibrary] Clicking on element...`);
    cy.get(locator, { timeout }).should('be.visible').click();
    console.log(`[ClickLibrary] Click completed.`);
  }

  // Click an element if it exists within the timeout
  static async clickIfExists(locator, timeout = 3000) {
    console.log(`[ClickLibrary] Trying to click if exists...`);
    const elementExists = await cy.get(locator, { timeout }).should('exist');
    if (elementExists) {
      cy.get(locator).click();
      console.log(`[ClickLibrary] Element clicked.`);
      return true;
    } else {
      console.log(`[ClickLibrary] Element not found.`);
      return false;
    }
  }

  // Click until another element appears (retry logic)
  static async clickTillExists(locatorToClick, locatorToWaitFor, maxAttempts = 5, timeout = 5000) {
    console.log(`[ClickLibrary] Trying to click until another element exists...`);
    for (let i = 0; i < maxAttempts; i++) {
      this.click(locatorToClick, timeout);
      try {
        cy.get(locatorToWaitFor, { timeout }).should('be.visible');
        console.log(`[ClickLibrary] Target element appeared.`);
        return true;
      } catch {
        console.log(`[ClickLibrary] Target element not visible, attempt ${i + 1} of ${maxAttempts}...`);
      }
    }
    console.log(`[ClickLibrary] Target element did not appear after ${maxAttempts} attempts.`);
    return false;
  }

  // Click until an element disappears (retry logic)
  static async clickTillDisappear(locatorToClick, locatorToDisappear, maxAttempts = 5, timeout = 5000) {
    console.log(`[ClickLibrary] Trying to click until element disappears...`);

    for (let i = 0; i < maxAttempts; i++) {
      this.click(locatorToClick, timeout);
      try {
        cy.get(locatorToDisappear, { timeout }).should('not.be.visible');
        console.log(`[ClickLibrary] Target element disappeared.`);
        return true;
      } catch {
        console.log(`[ClickLibrary] Target element still visible, attempt ${i + 1} of ${maxAttempts}...`);
      }
    }

    console.log(`[ClickLibrary] Target element did not disappear after ${maxAttempts} attempts.`);
    return false;
  }
}

module.exports = { ClickLibrary };
