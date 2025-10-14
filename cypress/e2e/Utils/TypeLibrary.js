/// <reference types="cypress" />
import 'cypress-xpath';
import { DataLibrary } from './DataLibrary';
import { ClickLibrary } from './ClickLibrary';

export class TypeLibrary {
  /**
   * Type text into input field
   * @param {string} xpathSelector - XPath selector for input
   * @param {string} text - Text to type
   * @param {number} typingDelay - Typing delay per character (default 50ms)
   */
  static type(xpathSelector, text, typingDelay = 50) {
    const finalText = DataLibrary.getDataPrepared(text);
    cy.log(`[TypeLibrary] Typing into field with text: ${finalText}`);

    cy.xpath(xpathSelector)
      .should('be.visible')
      .clear({ force: true })
      .then(($el) => {
        if (text !== '_EMPTY_') {
          ClickLibrary.click(xpathSelector);
          cy.wrap($el).type(finalText, { delay: typingDelay });
        }
      });
  }

  /**
   * Type text and press Enter
   * @param {string} xpathSelector - XPath selector for input
   * @param {string} text - Text to type
   */
  static typeAndEnter(xpathSelector, text) {
    cy.log(`[TypeLibrary] Typing and pressing Enter with text: ${text}`);
    cy.xpath(xpathSelector)
      .should('be.visible')
      .clear({ force: true })
      .then(($el) => {
        ClickLibrary.click(xpathSelector);
        cy.wrap($el).type(`${text}{enter}`, { delay: 50 });
      });
  }

  /**
   * Type text and press Tab
   * @param {string} xpathSelector - XPath selector for input
   * @param {string} text - Text to type
   */
  static typeAndTab(xpathSelector, text) {
    cy.log(`[TypeLibrary] Typing and pressing Tab with text: ${text}`);
    cy.xpath(xpathSelector)
      .should('be.visible')
      .clear({ force: true })
      .then(($el) => {
        ClickLibrary.click(xpathSelector);
        cy.wrap($el).type(`${text}{tab}`, { delay: 50 });
      });
  }

  /**
   * Clear input and type sequentially with delay
   * @param {string} xpathSelector
   * @param {string} text
   * @param {number} typingDelay
   */
  static clearAndPressSequentially(xpathSelector, text, typingDelay = 50) {
    cy.log(`[TypeLibrary] Typing sequentially: ${text}`);
    cy.xpath(xpathSelector)
      .should('be.visible')
      .clear({ force: true })
      .type(text, { delay: typingDelay });
  }

  /**
   * Execute a keyboard shortcut like Ctrl+S, Alt+Shift+X, etc.
   * @param {string} shortcut - Keyboard combo (e.g., "ctrl+s")
   */
  static executeShortcut(shortcut) {
    const keys = shortcut.toLowerCase().split('+');
    cy.log(`[TypeLibrary] Executing keyboard shortcut: ${shortcut}`);

    cy.document().then((doc) => {
      const keyEventInit = {
        ctrlKey: keys.includes('ctrl'),
        altKey: keys.includes('alt'),
        shiftKey: keys.includes('shift'),
        metaKey: keys.includes('meta'),
        key: keys[keys.length - 1],
        code: keys[keys.length - 1].toUpperCase(),
      };

      doc.dispatchEvent(new KeyboardEvent('keydown', keyEventInit));
      cy.wait(100);
      doc.dispatchEvent(new KeyboardEvent('keyup', keyEventInit));
    });
  }
}
