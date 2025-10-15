/// <reference types="cypress" />


/**
 * ✅ Cypress-compatible version of DataLibrary
 * Uses Cypress.env() and cy.task() for filesystem & environment operations
 */
export class DataLibrary {

  // ===================== ENV =====================
  static getRunProperty(propertyName) {
    return Cypress.env(propertyName) || '';
  }

  static getEnvPropertyByKey(key) {
    const env = Cypress.env('ENV') || 'rec';
    const config = Cypress.env('config') || {};
    const parts = key.split('.');

    let value = config[env];
    if (!value) {
      cy.log(`⚠️ No config found for environment '${env}'`);
      return '';
    }

    for (const part of parts) {
      if (value && Object.prototype.hasOwnProperty.call(value, part)) {
        value = value[part];
      } else {
        cy.log(`⚠️ Key '${key}' not found in config`);
        return '';
      }
    }
    return value;
  }

  // ===================== STORAGE (use cy.task for fs ops) =====================
  static storeTempData(key, value) {
    cy.task('storeTempData', { key, value });
  }

  static fetchTempData(key) {
    return cy.task('fetchTempData', key);
  }

  static getContentFromFile(filePath) {
    return cy.task('readFileContent', filePath);
  }

  // ===================== TEXT UTILS =====================
  static prepareInput(input) {
    if (!input || input.trim().toUpperCase() === 'NA') return '0.00';
    return this.getDataPrepared(input);
  }

  static getAllMatchesByPattern(text, pattern) {
    const matches = [];
    const regex = new RegExp(pattern, 'g');
    let match;
    while ((match = regex.exec(text)) !== null) matches.push(match[0]);
    return matches;
  }

  static cleanVariable(variable) {
    return variable.replace(/[${}()[\]]/g, '');
  }

  static generateRandom(characters, length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // ===================== DATE UTILS =====================
  static compareValues(cellValue, operation, expectedValue) {
    try {
      const a = isNaN(cellValue) ? cellValue : parseFloat(cellValue);
      const b = isNaN(expectedValue) ? expectedValue : parseFloat(expectedValue);
      switch (operation) {
        case '=': return a === b;
        case '!=': return a !== b;
        case '>': return a > b;
        case '<': return a < b;
        case '>=': return a >= b;
        case '<=': return a <= b;
        case 'contains': return String(a).includes(String(b));
        default: throw new Error(`Unsupported operation: ${operation}`);
      }
    } catch (err) {
      cy.log(`[compareValues] Error comparing '${cellValue}' ${operation} '${expectedValue}': ${err.message}`);
      return false;
    }
  }

  static generateDate(daysToAdd, pattern) {
    const date = new Date();
    const offset = parseInt(daysToAdd);
    if (isNaN(offset)) throw new Error(`Invalid date offset: "${daysToAdd}"`);
    date.setDate(date.getDate() + offset);
    return this.formatDate(date, pattern);
  }

  static generateDateUTC(daysToAdd, pattern) {
    const offset = parseInt(daysToAdd);
    if (isNaN(offset)) throw new Error(`Invalid date offset: "${daysToAdd}"`);
    const date = new Date(Date.now() + offset * 24 * 60 * 60 * 1000);
    return this.formatDate(date, pattern);
  }

  static generateTimeUTC(minutesToAdd, pattern) {
    const offset = parseInt(minutesToAdd) || 0;
    const date = new Date(Date.now() + offset * 60 * 1000);

    const map = {
      'HH': String(date.getUTCHours()).padStart(2, '0'),
      'mm': String(date.getUTCMinutes()).padStart(2, '0'),
      'ss': String(date.getUTCSeconds()).padStart(2, '0'),
    };

    let formatted = pattern;
    for (const key in map) formatted = formatted.replace(key, map[key]);
    return formatted;
  }

  static formatDate(date, format = 'MM/dd/yyyy') {
    const pad = (n) => (n < 10 ? '0' + n : n);
    const map = {
      'MM': pad(date.getMonth() + 1),
      'dd': pad(date.getDate()),
      'yyyy': date.getFullYear(),
      'YYYY': date.getFullYear(),
    };
    return format.replace(/MM|dd|yyyy|YYYY/g, (match) => map[match]);
  }

  // ===================== CALCULATION =====================
  static isArithmeticOperation(expression) {
    const regex = /^\d+(\.\d+)?\s*[+\-*/]\s*\d+(\.\d+)?$/;
    return regex.test(expression.trim());
  }

  static calculateValue(expressionToCalculate) {
    try {
      // eslint-disable-next-line no-eval
      return eval(expressionToCalculate.replace(',', '.')).toString();
    } catch {
      return expressionToCalculate;
    }
  }

  static calculateResult(v1, operator, v2) {
    const a = parseFloat(v1);
    const b = parseFloat(v2);
    switch (operator) {
      case '+': return (a + b).toFixed(2);
      case '-': return (a - b).toFixed(2);
      case '*': return (a * b).toFixed(2);
      case '/': return (a / b).toFixed(2);
      case '%': return (a % b).toFixed(2);
      case '^': return Math.pow(a, b).toFixed(2);
      default: return 'NaN';
    }
  }

  static formatResult(result, format, operator) {
    if (operator === '<' || operator === '>') {
      return result === '1.00' ? 'true' : 'false';
    }
    return format === 'NA' ? result.replace('.', ',') : result;
  }

  // ===================== VALIDATION =====================
  static evaluateCondition(actual, operator, expected) {
    switch (operator) {
      case '=': return actual === expected;
      case '!=': return actual !== expected;
      case '>': return parseFloat(actual) > parseFloat(expected);
      case '<': return parseFloat(actual) < parseFloat(expected);
      case 'contains': return actual.includes(expected);
      default: return false;
    }
  }

  static validateResult(actual, expected, operator) {
    if (operator === '<' || operator === '>') {
      return actual === expected;
    }
    return actual.replace(/\s+/g, '') === expected.replace(/\s+/g, '');
  }

  // ===================== JSON UTILS =====================
  static processJsonValue(value) {
    if (!value) return '';
    if (value.startsWith('"') && value.endsWith('"')) return value.slice(1, -1);
    return value;
  }

  static getDataFromResponse(responseText, tokenPath) {
    try {
      const parsed = JSON.parse(responseText);
      const token = tokenPath.split('.').reduce((obj, key) => obj && obj[key], parsed);
      return typeof token === 'object' ? JSON.stringify(token) : String(token);
    } catch {
      return '';
    }
  }

  static prepareJsonForDisplay(jsonStr) {
    try {
      return JSON.stringify(JSON.parse(jsonStr), null, 2);
    } catch {
      return jsonStr;
    }
  }

  static replaceJsonVariables(template, data) {
    let result = template;
    for (const { Key, Value } of data) {
      const resolved = this.getDataPrepared(Value);
      result = result.replace(Key, resolved);
    }
    return result;
  }

  // ===================== MAIN =====================
  static getDataPrepared(textToPrepare) {
    if (!textToPrepare || textToPrepare === '') return textToPrepare;
    if (textToPrepare.toUpperCase() === '$EMPTYSTRING') return '';

    textToPrepare = textToPrepare.replace(/{space}/g, ' ');

    const patternVariable = /\$\{[a-zA-Z0-9._-]+\}/g;
    const patternSettings = /\$\[[a-zA-Z0-9._-]+\]/g;
    const patternRun = /\$\([a-zA-Z0-9._-]+\)/g;

    // handle stored temp values
    (textToPrepare.match(patternVariable) || []).forEach((variable) => {
      cy.task('fetchTempData', this.cleanVariable(variable)).then((value) => {
        textToPrepare = textToPrepare.replace(variable, value);
      });
    });

    // handle env config values
    (textToPrepare.match(patternSettings) || []).forEach((variable) => {
      const value = this.getEnvPropertyByKey(this.cleanVariable(variable));
      textToPrepare = textToPrepare.replace(variable, value);
    });

    // handle Cypress.env values
    (textToPrepare.match(patternRun) || []).forEach((variable) => {
      const value = this.getRunProperty(this.cleanVariable(variable));
      textToPrepare = textToPrepare.replace(variable, value);
    });

    return textToPrepare.toString();
  }

}

