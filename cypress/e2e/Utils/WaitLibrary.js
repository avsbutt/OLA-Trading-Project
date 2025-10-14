/// <reference types="cypress" />
import 'cypress-xpath';

export class WaitLibrary {
  /**
   * Detects whether a selector is XPath or CSS and returns the appropriate locator
   * @param {string} selector
   */
  static resolveLocator(selector) {
    if (selector.trim().startsWith('//') || selector.trim().startsWith('(')) {
      return cy.xpath(selector);
    }
    return cy.get(selector);
  }

  // Wait for a given number of seconds
  static waitSeconds(seconds) {
    cy.log(`[WaitLibrary] Waiting for ${seconds} seconds...`);
    cy.wait(seconds * 1000);
  }

  // Wait for an element to contain specific text
  static waitForText(selector, text, timeout = 15000) {
    cy.log(`[WaitLibrary] Waiting for text: ${text}`);
    this.resolveLocator(selector, { timeout }).should('include.text', text);
  }

  // Wait until URL contains a specific fragment
  static waitUntilUrlContains(fragment, timeout = 15000) {
    cy.log(`[WaitLibrary] Waiting for URL to contain: ${fragment}`);
    cy.url({ timeout }).should('include', fragment);
  }

  // Wait for an element to become visible
  static waitForSelectorVisible(selector, timeout = 15000) {
    cy.log(`[WaitLibrary] Waiting for element to be visible: ${selector}`);
    this.resolveLocator(selector, { timeout }).should('be.visible');
  }

  // Wait for an element to become hidden or not exist
  static waitForSelectorHidden(selector, timeout = 8000) {
    cy.log(`[WaitLibrary] Waiting for element to be hidden: ${selector}`);
    this.resolveLocator(selector, { timeout }).should('not.exist');
  }

  // Wait for page to load completely
  static waitPageLoaded() {
    cy.log(`[WaitLibrary] Waiting for page to load...`);
    cy.document().should('exist');
    cy.window().should('have.property', 'innerWidth');
    cy.get('body').should('be.visible');
  }

  // Wait for an element to become visible (manual retry)
  static waitForLocatorVisible(selector, timeoutMs = 60000, pollingInterval = 500) {
    cy.log(`[WaitLibrary] Waiting for locator to be visible: ${selector}`);
    const start = Date.now();

    const checkVisibility = () => {
      if (Date.now() - start > timeoutMs) {
        throw new Error(`[waitForLocatorVisible] Timeout: Element not visible within ${timeoutMs / 1000}s`);
      }

      this.resolveLocator(selector)
        .then(($el) => {
          if ($el.length > 0 && $el.is(':visible')) {
            cy.log('[waitForLocatorVisible] ✅ Element is visible.');
          } else {
            cy.wait(pollingInterval);
            checkVisibility();
          }
        })
        .catch(() => {
          cy.wait(pollingInterval);
          checkVisibility();
        });
    };

    checkVisibility();
  }

  // ---------- Wait for custom loader ".loader_loaderContainer" ----------
  /**
   * Wait for ".loader_loaderContainer" to disappear
   */
  static waitForLoader(timeout = 60000) {
    cy.log('[WaitLibrary] Waiting for .loader_loaderContainer to disappear...');

    cy.get('body').then(($body) => {
      if ($body.find('.loader_loaderContainer').length > 0) {
        cy.get('.loader_loaderContainer', { timeout })
          .should('not.exist')
          .then(() => cy.log('[WaitLibrary] ✅ Loader disappeared successfully.'));
      } else {
        cy.log('[WaitLibrary] ⚡ No loader found, continuing.');
      }
    });
  }

  // ---------- Wait for loaders inside iframe ----------
  static waitForLoaderIframe(iframeSelector, timeout = 120000) {
    cy.log('[WaitLibrary] Waiting for iframe loaders to disappear...');
    const start = Date.now();

    const checkIframeLoaders = (doc) => {
      if (Date.now() - start > timeout) {
        throw new Error('[WaitLibrary] Timeout: iframe loader still visible after 120s');
      }

      const loaderVisible = doc.querySelectorAll('.loader_loaderContainer').length > 0;
      if (loaderVisible) {
        cy.wait(1000);
        checkIframeLoaders(doc);
      } else {
        cy.log('[WaitLibrary] ✅ All iframe loaders are gone.');
      }
    };

    cy.get(iframeSelector)
      .its('0.contentDocument')
      .should('exist')
      .then((doc) => {
        checkIframeLoaders(doc);
      });
  }
}
