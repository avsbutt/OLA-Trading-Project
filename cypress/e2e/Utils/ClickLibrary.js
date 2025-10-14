/// <reference types="cypress" />
import 'cypress-xpath';

export class ClickLibrary {
  /**
   * Detects if selector is XPath or CSS and returns the proper Cypress locator
   * @param {string} selector
   */
  static resolveLocator(selector) {
    if (selector.trim().startsWith('//') || selector.trim().startsWith('(')) {
      return cy.xpath(selector);
    }
    return cy.get(selector);
  }

  /**
   * Click on an element (waits until visible & enabled)
   * @param {string} selector - XPath or CSS selector of element
   * @param {number} timeout - Wait time before failing (default 5000ms)
   */
  static click(selector, timeout = 5000) {
    cy.log(`[ClickLibrary] Clicking on element: ${selector}`);

    // Resolve whether selector is XPath or CSS
    this.resolveLocator(selector, { timeout })
      .should('exist')         // Wait until element is present in the DOM
      .should('be.visible')    // Wait until it’s visible
      .and('not.be.disabled')  // Ensure it’s enabled
      .then(($el) => {
        if ($el.is(':visible') && !$el.is(':disabled')) {
          cy.wrap($el).click({ force: true });
          cy.log(`[ClickLibrary] ✅ Click completed successfully.`);
        } else {
          cy.log(`[ClickLibrary] ⚠️ Element found but not interactable: ${selector}`);
        }
      });
  }


  /**
   * Click on element if it exists and visible, otherwise skip
   * @param {string} selector - XPath or CSS selector
   * @param {number} timeout - Time to wait for visibility
   * @returns {Cypress.Chainable<boolean>}
   */
  static clickIfExists(selector, timeout = 3000) {
    cy.log(`[ClickLibrary] Trying to click if element exists: ${selector}`);

    return this.resolveLocator(selector, { timeout })
      .then(($el) => {
        if ($el.length > 0 && $el.is(':visible')) {
          cy.wrap($el).click({ force: true });
          cy.log(`[ClickLibrary] Element clicked.`);
          return true;
        } else {
          cy.log(`[ClickLibrary] Element not visible or not found.`);
          return false;
        }
      })
      .catch(() => {
        cy.log(`[ClickLibrary] Element not found.`);
        return false;
      });
  }

  /**
   * Keep clicking an element until another element becomes visible (with retry)
   * @param {string} selectorToClick - XPath or CSS selector of clickable element
   * @param {string} selectorToWaitFor - XPath or CSS selector of element to appear
   * @param {number} maxAttempts - Number of click attempts
   * @param {number} timeout - Wait time for each check
   * @returns {Cypress.Chainable<boolean>}
   */
  static clickTillExists(selectorToClick, selectorToWaitFor, maxAttempts = 5, timeout = 5000) {
    cy.log(`[ClickLibrary] Clicking until target element exists...`);
    let attempt = 0;

    const tryClick = () => {
      if (attempt >= maxAttempts) {
        cy.log(`[ClickLibrary] Target element did not appear after ${maxAttempts} attempts.`);
        return false;
      }

      attempt++;
      ClickLibrary.click(selectorToClick, timeout);

      return ClickLibrary.resolveLocator(selectorToWaitFor, { timeout })
        .then(($target) => {
          if ($target.length > 0 && $target.is(':visible')) {
            cy.log(`[ClickLibrary] Target element appeared.`);
            return true;
          } else {
            cy.log(`[ClickLibrary] Attempt ${attempt}/${maxAttempts} failed, retrying...`);
            return tryClick();
          }
        })
        .catch(() => {
          cy.log(`[ClickLibrary] Target element not visible, retrying attempt ${attempt}/${maxAttempts}...`);
          return tryClick();
        });
    };

    return tryClick();
  }

  /**
   * Keep clicking until another element disappears
   * @param {string} selectorToClick - XPath or CSS selector to click
   * @param {string} selectorToDisappear - XPath or CSS selector to wait for disappearance
   * @param {number} maxAttempts
   * @param {number} timeout
   * @returns {Cypress.Chainable<boolean>}
   */
  static clickTillDisappear(selectorToClick, selectorToDisappear, maxAttempts = 5, timeout = 5000) {
    cy.log(`[ClickLibrary] Clicking until element disappears...`);
    let attempt = 0;

    const tryClick = () => {
      if (attempt >= maxAttempts) {
        cy.log(`[ClickLibrary] Target element did not disappear after ${maxAttempts} attempts.`);
        return false;
      }

      attempt++;
      ClickLibrary.click(selectorToClick, timeout);

      return ClickLibrary.resolveLocator(selectorToDisappear, { timeout })
        .should('not.exist')
        .then(() => {
          cy.log(`[ClickLibrary] Target element disappeared.`);
          return true;
        })
        .catch(() => {
          cy.log(`[ClickLibrary] Attempt ${attempt}/${maxAttempts} - still visible, retrying...`);
          return tryClick();
        });
    };

    return tryClick();
  }
}
