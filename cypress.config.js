const { fa } = require("@faker-js/faker");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "qs3ie3",

    specPattern: "cypress/e2e/TestCases/**/*.cy.js",     //The specPattern tells Cypress where to find your test files.
    
    baseUrl: "https://ola-staging.wilsondavisclearing.com/",

    setupNodeEvents(on, config) {
      // implement node event listeners here

       // testomat.io reporter plugin:
      require('@testomatio/reporter/lib/adapter/cypress-plugin')(on, config);
    },
    
    fixturesFolder: 'cypress/e2e/fixtures',
    tsc: 'cypress/support/commands.ts',
    defaultCommandTimeout: 10000,

    video: false,
    videosFolder: 'cypress/e2e/videos',
    screenshotsFolder: 'cypress/e2e/screenshots',
    pageLoadTimeout:60000 ,
    screenshots: false,
    
    viewportWidth: 1920,
    viewportHeight: 1080,

    screenshotOnRunFailure: true,
    videoUploadOnPasses: false, // Only save videos on failure
    
    reporter: 'mocha-allure-reporter',
    reporterOptions: {
      targetDir: 'allure-results',
      "viewportWidth":1280

    }
  },
});
