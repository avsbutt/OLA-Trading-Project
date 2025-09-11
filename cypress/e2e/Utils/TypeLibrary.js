// typeLibrary.js for Cypress

const { DataLibrary } = require('@utils/DataLibrary');
const { ClickLibrary } = require('./ClickLibrary');

class TypeLibrary {
  
  // Type text into a field with a typing delay
  static type(locator, text, typingDelay = 50) {
    const finalText = DataLibrary.getDataPrepared(text);
    console.log(`[TypeLibrary] Typing into field with text: ${finalText}`);
    
    // Wait for the element to be visible
    cy.get(locator).should('be.visible').clear();

    // Type the text if it's not empty
    if (text !== '_EMPTY_') {
      ClickLibrary.click(locator); // Trigger click (if required before typing)
      cy.get(locator).type(finalText, { delay: typingDelay }); // Typing with delay per character
    }
  }

  // Type text and press Enter key
  static typeAndEnter(locator, text) {
    console.log(`[TypeLibrary] Typing and pressing Enter with text: ${text}`);
    cy.get(locator).should('be.visible').clear();
    ClickLibrary.click(locator); // Trigger click (if required before typing)
    cy.get(locator).type(text).type('{enter}'); // Type and press Enter key
  }

  // Type text and press Tab key
  static typeAndTab(locator, text) {
    console.log(`[TypeLibrary] Typing and pressing Tab with text: ${text}`);
    cy.get(locator).should('be.visible').clear();
    ClickLibrary.click(locator); // Trigger click (if required before typing)
    cy.get(locator).type(text).type('{tab}'); // Type and press Tab key
  }

  // Clear text and type sequentially (for example: numbers, special characters, etc.)
  static clearAndPressSequentially(locator, text, typingDelay = 50) {
    console.log(`[TypeLibrary] Typing into field with text: ${text}`);
    cy.get(locator).should('be.visible').clear();
    cy.get(locator).type(text, { delay: typingDelay }); // Cypress automatically types sequentially
  }

  // Execute a keyboard shortcut (like Ctrl+C, Ctrl+V)
  static executeShortcut(page, shortcut) {
    console.log(`[TypeLibrary] Executing keyboard shortcut: ${shortcut}`);
    const keys = shortcut.toUpperCase().split('+');
    
    // Simulate keyboard shortcut
    keys.forEach(key => {
      cy.get('body').type(`{${key}}`, { release: false }); // Hold down the keys
    });
    keys.reverse().forEach(key => {
      cy.get('body').type(`{${key}}`); // Release the keys
    });
  }
}

module.exports = { TypeLibrary };
