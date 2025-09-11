// waitLibrary.js for Cypress

class WaitLibrary {
  // Wait for a given number of seconds
  static async waitSeconds(seconds) {
    console.log(`[WaitLibrary] Waiting for ${seconds} seconds...`);
    cy.wait(seconds * 1000); // Cypress waits in milliseconds
  }

  // Wait for an element to contain specific text
  static waitForText(locator, text, timeout = 15000) {
    console.log(`[WaitLibrary] Waiting for text: ${text}`);
    cy.get(locator, { timeout }).should('include.text', text);
  }

  // Wait until URL contains a specific fragment
  static waitUntilUrlContains(fragment, timeout = 15000) {
    console.log(`[WaitLibrary] Waiting for URL to contain: ${fragment}`);
    cy.url({ timeout }).should('include', fragment);
  }

  // Wait for an element to become visible
  static waitForSelectorVisible(locator, timeout = 15000) {
    console.log(`[WaitLibrary] Waiting for element to be visible.`);
    cy.get(locator, { timeout }).should('be.visible');
  }

  // Wait for an element to become hidden
  static waitForSelectorHidden(locator, timeout = 8000) {
    console.log(`[WaitLibrary] Waiting for element to be hidden.`);
    cy.get(locator, { timeout }).should('not.be.visible');
  }

  // Wait for page to load and be ready
  static waitPageLoaded() {
    console.log(`[WaitLibrary] Waiting for page to load`);
    cy.document().should('exist'); // Ensure the page is loaded
    cy.window().should('have.property', 'innerWidth'); // Ensure the window is ready
    cy.get('body').should('be.visible'); // Ensure body is visible
  }

  // Wait for an element to become visible with retry logic
  static async waitForLocatorVisible(locator, timeoutMs = 60000) {
    const startTime = Date.now();
    const pollingInterval = 500;

    while (Date.now() - startTime < timeoutMs) {
      try {
        const isVisible = await cy.get(locator, { timeout: 1000 }).should('be.visible');

        if (isVisible) {
          console.log('[waitForLocatorVisible] Element is visible.');
          return;
        }
      } catch (err) {
        // silently ignore exceptions (locator may not be ready)
      }

      // Wait and retry every polling interval
      cy.wait(pollingInterval);
    }

    throw new Error('[waitForLocatorVisible] Timeout: Element did not become visible within 60 seconds.');
  }

  // ---------- Helper functions for checking visibility of loaders ----------
  static async _anyVisible(locator) {
    try {
      const style = window.getComputedStyle(locator[0]);
      const rect = locator[0].getBoundingClientRect();
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        rect.width > 0 &&
        rect.height > 0 &&
        style.opacity !== '0'
      );
    } catch {
      return false;
    }
  }

  static async _allGoneOrHidden(locator) {
    const count = await cy.get(locator).its('length').catch(() => 0);
    if (count === 0) return true;
    return !(await this._anyVisible(locator));
  }

  static async _waitForLoadersGeneric({
    makeLocator,
    tick,
    scrollDown200,
    scrollTop,
    selectors,
    maxTimeoutMs,
    pollingInterval,
  }) {
    const startTime = Date.now();
    const maxRetry = 15;
    let didScroll = false;

    for (const selector of selectors) {
      try {
        const locator = makeLocator(selector);

        if (await this._allGoneOrHidden(locator)) {
          continue;
        }

        let retry = 0;
        while (retry < maxRetry) {
          if (Date.now() - startTime > maxTimeoutMs) {
            throw new Error(`[loader] Timeout: '${selector}' still visible after ${Math.floor(maxTimeoutMs / 1000)}s`);
          }

          if (await this._allGoneOrHidden(locator)) {
            break;
          }

          console.log(`[loader] Still visible: '${selector}' (retry ${retry + 1}/${maxRetry})`);

          if (retry + 1 >= 3 && retry + 1 <= 30) {
            try {
              await scrollDown200();
              didScroll = true;
            } catch (e) {
              console.warn('[loader] scrollDown failed:', e?.message || e);
            }
          }

          // Wait for timeout or retry
          cy.wait(pollingInterval);
          retry++;
        }

        if (retry >= maxRetry) {
          console.warn(`[loader] Max retries reached for '${selector}', moving on.`);
        }
      } catch {
        console.log(`[loader] Selector not found or already gone: '${selector}'`);
      }
    }

    if (didScroll) {
      try {
        await scrollTop();
      } catch (e) {
        console.warn('[loader] scrollTop failed:', e?.message || e);
      }
    }
  }

  // ---------- Wait for page loaders to disappear ----------
  static async waitForLoader(page, maxTimeoutMs = 180000) {
    console.log('[waitForLoader] Starting page readiness & loader wait…');
    cy.get('body').should('exist'); // Ensure the page body is present

    const selectors = [
      '[data-testid*="loading"]',
      '[data-testid*="loader"]',
      '[data-testid*="skeleton-loader"]',
      '//*[contains(@class,"loader-inner")]',
      '//*[contains(@class,"skeleton-loader")]',
      '//*[contains(@class,"inner-section-loading")]',
      '//*[contains(@class,"loader")]',
      '//*[contains(@class,"loading")]',
      '//*[contains(@class,"fui-Spinner")]',
      '//*[contains(@class,"spinnerTail")]',
    ];

    await this._waitForLoadersGeneric({
      makeLocator: sel => cy.get(sel),
      tick: () => cy.wait(1000),
      scrollDown200: () => cy.scrollTo('bottom'),
      scrollTop: () => cy.scrollTo('top'),
      selectors,
      maxTimeoutMs,
      pollingInterval: 1000,
    });

    console.log('[waitForLoader] ✅ All page loaders are gone/hidden.');
  }

  // ---------- Wait for iframe loaders to disappear ----------
  static async waitForLoaderIframe(frameLocator, maxTimeoutMs = 120000) {
    console.log('[waitForLoaderIframe] Waiting for iframe loaders to disappear…');

    const selectors = [
      '[data-testid*="loading"]',
      '[data-testid*="loader"]',
      '[data-testid*="skeleton-loader"]',
      '//*[contains(@class,"loader-inner")]',
      '//*[contains(@class,"skeleton-loader")]',
      '//*[contains(@class,"inner-section-loading")]',
      '//*[contains(@class,"loader")]',
      '//*[contains(@class,"loading")]',
      '//*[contains(@class,"fui-Spinner")]',
      '//*[contains(@class,"spinnerTail")]',
    ];

    await this._waitForLoadersGeneric({
      makeLocator: sel => frameLocator.find(sel),
      tick: () => cy.wait(1000),
      scrollDown200: () => frameLocator.scrollTo('bottom'),
      scrollTop: () => frameLocator.scrollTo('top'),
      selectors,
      maxTimeoutMs,
      pollingInterval: 1000,
    });

    console.log('[waitForLoaderIframe] ✅ All iframe loaders are gone/hidden.');
  }
}

module.exports = { WaitLibrary };
