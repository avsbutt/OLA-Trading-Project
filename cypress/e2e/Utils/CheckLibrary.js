// cypress/support/checkLibrary.js
// Usage: import { CheckLibrary } from '../support/checkLibrary';

/// <reference types="cypress" />
// If you're using the Allure plugin (@shelex/cypress-allure-plugin), the optional
// attachments below will work. They’re wrapped in try/catch so they won’t break if absent.

export class CheckLibrary {
  // ---------- Core validator (runs in Cypress test context) ----------
  static _validateField(path, actual, expected, assertType) {
    const actualStr = this._toStr(actual);
    let result = false;

    switch ((assertType || '').toLowerCase()) {
      case 'equal':
        result = (this._toStr(expected).toLowerCase() === 'not null')
          ? actual != null && actualStr !== 'null'
          : this._normText(actualStr) === this._normText(expected);
        break;

      case 'contains':
        result = this._normText(actualStr).includes(this._normText(expected));
        break;

      case 'length':
        result = this._normText(actualStr).length === parseInt(expected, 10);
        break;

      case 'pattern':
        result = new RegExp(expected).test(actualStr);
        break;

      case 'uppercase': {
        const shouldBeUpper = this._toStr(expected).toLowerCase() === 'true';
        const isUpper = actualStr === actualStr.toUpperCase();
        result = shouldBeUpper ? isUpper : !isUpper;
        break;
      }

      case 'superior':
        result = this._toNumber(actualStr) > this._toNumber(expected);
        break;

      case 'inferior':
        result = this._toNumber(actualStr) < this._toNumber(expected);
        break;

      case 'date': {
        const a = this._parseDateLoose(actualStr);
        const e = this._parseDateLoose(expected);
        result = this._sameYMD(a, e);
        break;
      }

      default:
        throw new Error(`Unknown assertion type: ${assertType}`);
    }

    const status = result ? '✅ PASS' : '❌ FAIL';
    const message = `${status} [${path}] Expected ${assertType} => ${expected}, Actual => ${actualStr}`;

    this._attach(`Validation [${path}] - Status`, status);
    this._attach(`Validation [${path}] - Expected`, this._toStr(expected));
    this._attach(`Validation [${path}] - Actual`, actualStr);
    this._attach(`Validation [${path}] - AssertType`, this._toStr(assertType));
    // also log to runner
    // eslint-disable-next-line no-console
    console.log(message);

    if (!result) {
      throw new Error(`Validation failed [${path}] → Expected ${assertType} "${expected}" but got "${actualStr}"`);
    }
  }

  // ---------- Cypress helpers ----------
  static checkUrlContains(partialUrl) {
    cy.url().should('include', partialUrl).then((url) => {
      this._attach('Current URL', url);
      this._attach('Expected fragment', partialUrl);
    });
  }

  static checkElementVisible(selectorOrChainable, timeout = 5000) {
    const el = typeof selectorOrChainable === 'string'
      ? cy.get(selectorOrChainable, { timeout })
      : selectorOrChainable;
    el.should('be.visible');
  }

  static checkElementNotVisible(selectorOrChainable, timeout = 5000) {
    const el = typeof selectorOrChainable === 'string'
      ? cy.get(selectorOrChainable, { timeout })
      : selectorOrChainable;
    el.should('not.be.visible');
  }

  static checkTextEquals(selectorOrChainable, expected, path = 'Field') {
    const el = typeof selectorOrChainable === 'string'
      ? cy.get(selectorOrChainable)
      : selectorOrChainable;

    el.then(($el) => {
      const aria = $el.attr('aria-label');
      const text = $el.text();
      const actual = aria ?? text ?? '';
      this._validateField(path, actual, expected, 'equal');
    });
  }

  static checkDate(selectorOrChainable, expectedDate, path = 'Date') {
    const el = typeof selectorOrChainable === 'string'
      ? cy.get(selectorOrChainable)
      : selectorOrChainable;

    el.then(($el) => {
      const aria = $el.attr('aria-label');
      const text = $el.text();
      const actual = aria ?? text ?? '';
      this._validateField(path, actual, expectedDate, 'date');
    });
  }

  static checkAttributeContains(selectorOrChainable, attribute, expectedValue, timeout = 15000) {
    const el = typeof selectorOrChainable === 'string'
      ? cy.get(selectorOrChainable, { timeout })
      : selectorOrChainable;

    el.invoke('attr', attribute).then((val) => {
      expect(val, `[attr ${attribute}] should match /${expectedValue}/`).to.match(new RegExp(expectedValue));
      this._attach('Selector', typeof selectorOrChainable === 'string' ? selectorOrChainable : '<chainable>');
      this._attach('Attribute', attribute);
      this._attach('Expected Value (partial)', expectedValue);
    });
  }

  static checkTextPresent(text, timeout = 5000) {
    // Broad search in the body for any element containing the text
    cy.contains('body *', text, { timeout }).should('be.visible').then(() => {
      // eslint-disable-next-line no-console
      console.log(`✅ The text [${text}] exists`);
    });
  }

  /**
   * Verify text inside a PDF by URL.
   * @param {string} pdfUrl - Absolute URL to the PDF (e.g., from an href or response)
   * @param {string} text - Text to check
   * @param {boolean} isNegativeCheck - true => assert NOT contains; false => assert contains
   * @param {object} pdfTextCacheObj - optional cache object { text: '...' }
   */
  static verifyPdfText(pdfUrl, text, isNegativeCheck = false, pdfTextCacheObj = {}) {
    // We’ll fetch the PDF and parse it via a cy.task (Node side) using pdf-parse
    if (pdfTextCacheObj.text) {
      const content = pdfTextCacheObj.text;
      if (isNegativeCheck) {
        expect(content).not.to.include(text);
      } else {
        expect(content).to.include(text);
      }
      return;
    }

    // Fetch as binary then send Buffer to task
    cy.request({
      url: pdfUrl,
      encoding: 'binary',
      // If auth/cookies are needed, adapt as required:
      // headers: { Cookie: '...' }
    }).then((resp) => {
      const buf = Buffer.from(resp.body, 'binary');
      return cy.task('parsePdfBuffer', buf);
    }).then((parsed) => {
      // parsed = { text, info, metadata } from pdf-parse
      pdfTextCacheObj.text = parsed.text || '';
      if (isNegativeCheck) {
        expect(pdfTextCacheObj.text).not.to.include(text);
      } else {
        expect(pdfTextCacheObj.text).to.include(text);
      }
    });
  }
}
