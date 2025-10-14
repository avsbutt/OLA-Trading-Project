/// <reference types="cypress" />
import 'cypress-xpath';
import pdfParse from 'pdf-parse';

export class CheckLibrary {

  // ------------------ Utility Helpers ------------------

  static _toStr(v) {
    return v == null ? 'null' : String(v);
  }

  static _stripNbsp(s) {
    return s.replace(/\u00A0/g, ' ');
  }

  static _normText(s) {
    return this._stripNbsp(this._toStr(s)).trim();
  }

  static _toNumber(s) {
    const t = this._normText(s)
      .replace(/\s/g, '')
      .replace(/[€$£%]/g, '')
      .replace(/,/g, '');
    const n = parseFloat(t);
    return Number.isNaN(n) ? NaN : n;
  }

  static _parseDateLoose(s) {
    const v = this._normText(s);
    if (!v) return null;

    const m = v.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (m) {
      let a = parseInt(m[1], 10);
      let b = parseInt(m[2], 10);
      const y = parseInt(m[3], 10);
      let mm, dd;
      if (a > 12) { dd = a; mm = b; }
      else if (b > 12) { mm = a; dd = b; }
      else { mm = a; dd = b; }
      const d = new Date(Date.UTC(y, mm - 1, dd, 0, 0, 0));
      return Number.isNaN(d.getTime()) ? null : d;
    }

    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? null :
      new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  }

  static _sameYMD(d1, d2) {
    return (
      d1 &&
      d2 &&
      d1.getUTCFullYear() === d2.getUTCFullYear() &&
      d1.getUTCMonth() === d2.getUTCMonth() &&
      d1.getUTCDate() === d2.getUTCDate()
    );
  }

  // ✅ Unified element resolver (detects XPath vs CSS)
  static resolveLocator(selector, options = {}) {
    if (selector.startsWith('//') || selector.startsWith('(')) {
      return cy.xpath(selector, options);
    }
    return cy.get(selector, options);
  }

  // ------------------ Assertions ------------------

  static validateField(path, actual, expected, assertType) {
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
    cy.log(`${status} [${path}] Expected ${assertType} => ${expected}, Actual => ${actualStr}`);
    expect(result, `Validation for ${path}`).to.be.true;
  }

  // ------------------ Element & URL Checks ------------------

  static checkUrlContains(partialUrl) {
    cy.url().should('include', partialUrl);
  }

  static checkElementVisible(selector, timeout = 5000) {
    this.resolveLocator(selector, { timeout }).should('be.visible');
  }

  static checkElementNotVisible(selector, timeout = 5000) {
    this.resolveLocator(selector, { timeout }).should('not.be.visible');
  }

  static checkTextEquals(selector, expected, path = 'Field') {
    this.resolveLocator(selector)
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        this.validateField(path, text.trim(), expected, 'equal');
      });
  }

  static checkDate(selector, expectedDate, path = 'Date') {
    this.resolveLocator(selector)
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        this.validateField(path, text.trim(), expectedDate, 'date');
      });
  }

  static checkAttributeContains(selector, attribute, expectedValue, timeout = 15000) {
    this.resolveLocator(selector, { timeout })
      .should('have.attr', attribute)
      .and(($attr) => {
        expect($attr).to.match(new RegExp(expectedValue));
      });
  }

  static checkTextPresent(text, timeout = 5000) {
    cy.xpath(`//body//*[contains(text(),'${text}')]`, { timeout })
      .should('be.visible')
      .then(() => cy.log(`✅ The text [${text}] exists`));
  }

  // ------------------ PDF Content Check ------------------

  /**
   * Verifies PDF contains or does not contain text
   * @param {string} pdfUrl - full PDF URL
   * @param {string} text - text to verify
   * @param {boolean} isNegativeCheck - true = assert NOT contains
   */
  static verifyPdfText(pdfUrl, text, isNegativeCheck = false) {
    cy.task('fetchPdfText', pdfUrl).then((pdfText) => {
      if (isNegativeCheck) {
        expect(pdfText).not.to.contain(text);
      } else {
        expect(pdfText).to.contain(text);
      }
    });
  }
}
