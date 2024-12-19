const { fa } = require("@faker-js/faker");
const cypress = require("cypress");
const { defineConfig } = require("cypress");
module.exports = defineConfig({

  e2e: {
    projectId: "9wgqhu",

    specPattern: "cypress/e2e/TestCases/**/*.cy.js",     //The specPattern tells Cypress where to find your test files.
    
    baseUrl: "https://ola-staging.wilsondavisclearing.com/",

    setupNodeEvents(on, config) {
      // implement node event listeners here

       // testomat.io reporter plugin:
      require('@testomatio/reporter/lib/adapter/cypress-plugin')(on, config);
      
      require('@cypress/grep/src/plugin')(config);
      return config;
      
    },

    env: {
      // Grep options for triggering tests
      grepFilterSpecs: true,
      grepOmitFiltered: true,
      grepOmitFiltered:true,
      grepIntegrationFolder: '../../'
    },
    
    numTestsKeptInMemory: 1,
    chromeWebSecurity: false,
    
    fixturesFolder: 'cypress/e2e/fixtures',
    tsc: 'cypress/support/commands.ts',
    defaultCommandTimeout: 10000,
    defaultTimeout: 20000,

    video: false,
    videosFolder: 'cypress/e2e/videos',
    screenshotsFolder: 'cypress/e2e/screenshots',
    pageLoadTimeout:30000 ,
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
