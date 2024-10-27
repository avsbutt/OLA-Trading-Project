const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "qs3ie3",

    specPattern: "cypress/e2e/TestCases/**/*.cy.js",     //The specPattern tells Cypress where to find your test files.
    
    baseUrl: "https://ola-staging.atlascleartrading.com/",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    
    fixturesFolder: 'cypress/e2e/fixtures',
    tsc: 'cypress/support/commands.ts',
    defaultCommandTimeout: 60000,

    video: false,
    videosFolder: 'cypress/e2e/videos',
    screenshotsFolder: 'cypress/e2e/screenshots',
    pageLoadTimeout:60000 ,
    screenshots: false,
    
    viewportWidth: 1920,
    viewportHeight: 1080,

    screenshotOnRunFailure: true,
    reporter: 'mocha-allure-reporter',
    reporterOptions: {
      targetDir: 'allure-results',
      "viewportWidth":1280

    }
  },
});
