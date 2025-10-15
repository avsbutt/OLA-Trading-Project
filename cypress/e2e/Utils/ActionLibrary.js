/// <reference types="cypress" />
import 'cypress-xpath';
import 'cypress-file-upload';
import { DataLibrary } from '../utils/DataLibrary';

export class ActionLibrary {
  /**
   * Detect whether selector is XPath or CSS
   * @param {string} selector
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  static resolveLocator(selector) {
    if (selector.trim().startsWith('//') || selector.trim().startsWith('(')) {
      return cy.xpath(selector);
    }
    return cy.get(selector);
  }
  // ✅ Count only visible elements
  static countVisibleElements(selector) {
    return this.resolveLocator(selector).then(($els) => {
      const visibleCount = Cypress.$($els).filter(':visible').length;
      cy.log(`👀 Visible elements: ${visibleCount}`);
      return visibleCount;
    });
  }

  // ✅ Hover on element
  static hoverOnElement(selector) {
    this.resolveLocator(selector)
      .scrollIntoView()
      .trigger('mouseover')
      .then(() => cy.log('✅ Hover successful using Cypress'))
      .catch((err) => cy.log(`⚠️ Hover failed: ${err.message}`));
  }

  // ✅ Scroll element into view
  static scrollToView(selector) {
    this.resolveLocator(selector).scrollIntoView();
  }

  // ✅ Scroll and click
  static scrollToViewAndClick(selector) {
    this.resolveLocator(selector).scrollIntoView().click({ force: true });
  }

  // ✅ Execute JavaScript code in browser
  static executeJsScript(jsCode) {
    cy.window().then((win) => {
      // eslint-disable-next-line no-eval
      return win.eval(jsCode);
    });
  }

  // ✅ Scroll by specific pixel amount
  static scrollByPixel(x, y) {
    cy.window().then((win) => win.scrollBy(x, y));
  }

  // ✅ Validate alert message
  static validateAlertMessage(expectedMessage) {
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain(expectedMessage);
    });
  }

  // ✅ Handle alerts (accept, dismiss, prompt)
  static handleAlert(action = 'accept', promptText = '') {
    cy.on('window:confirm', (msg) => {
      cy.log(`⚠️ Confirm dialog detected: ${msg}`);
      return action.toLowerCase() === 'accept';
    });

    cy.on('window:prompt', () => promptText || null);
  }

  // ⚠️ Not supported in Cypress (multi-window)
  static switchToWindowByTitle(title) {
    cy.log(`⚠️ Cypress does not support switching to window "${title}". Use cy.origin() instead.`);
  }

  static closeWindowByTitle(title) {
    cy.log(`⚠️ Cypress cannot close specific browser windows: "${title}"`);
  }

  // ✅ Upload file (supports multiple file types: PDF, JPG, PNG, DOCX, etc.)
  static uploadFile(selector, filePath) {
    // Auto-detect MIME type based on file extension
    const extension = filePath.split('.').pop().toLowerCase();

    let mimeType = 'application/octet-stream'; // default
    let encoding = 'utf8';

    switch (extension) {
      case 'pdf':
        mimeType = 'application/pdf';
        encoding = 'binary';
        break;
      case 'jpg':
      case 'jpeg':
        mimeType = 'image/jpeg';
        encoding = 'base64';
        break;
      case 'png':
        mimeType = 'image/png';
        encoding = 'base64';
        break;
      case 'doc':
        mimeType = 'application/msword';
        encoding = 'binary';
        break;
      case 'docx':
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        encoding = 'binary';
        break;
      case 'txt':
        mimeType = 'text/plain';
        break;
      default:
        cy.log(`⚠️ Unknown file type for "${filePath}", using default MIME type.`);
    }

    // Perform upload using the detected type
    this.resolveLocator(selector).focus().attachFile({
      filePath,
      encoding,
      mimeType,
    });

    cy.log(`📎 Uploaded file: ${filePath} (${mimeType})`);
  }

  // ✅ Check checkbox
  static checkCheckbox(selector) {
    this.resolveLocator(selector).then(($el) => {
      if (!$el.is(':checked')) {
        cy.wrap($el).check({ force: true });
        cy.log(`☑️ Checked checkbox: ${selector}`);
      } else {
        cy.log(`☑️ Checkbox already checked: ${selector}`);
      }
    });
  }

  // ✅ Uncheck checkbox
  static uncheckCheckbox(selector) {
    this.resolveLocator(selector).then(($el) => {
      if ($el.is(':checked')) {
        cy.wrap($el).uncheck({ force: true });
        cy.log(`🔲 Unchecked checkbox: ${selector}`);
      } else {
        cy.log(`🔲 Checkbox already unchecked: ${selector}`);
      }
    });
  }

  // ✅ Read input value
  static readInputValue(selector) {
    return this.resolveLocator(selector)
      .invoke('val')
      .then((val) => {
        cy.log(`📖 Input value: ${val}`);
        return val;
      });
  }

  /**
 * Select an option from a dropdown (works for <select> elements)
 * @param {string} selector - XPath or CSS selector for dropdown
 * @param {string} optionText - The visible text or value to select
 */
  static selectDropdown(selector, optionText) {
    const finalValue = DataLibrary.getDataPrepared(optionText);
    cy.log(`[TypeLibrary] Selecting dropdown value: ${finalValue}`);

    const element = selector.trim().startsWith('//') || selector.trim().startsWith('(')
      ? cy.xpath(selector)
      : cy.get(selector);

    element
      .should('be.visible')
      .focus()
      .select(finalValue, { force: true }).trigger('change')

    cy.log(`[TypeLibrary] ✅ Selected value: ${finalValue}`);
  }

}
