const { fa } = require("@faker-js/faker");
const cypress = require("cypress");
const { defineConfig } = require("cypress");
const webpack = require('@cypress/webpack-preprocessor');
const webpackOptions = require('./webpack.config.js');
const options = {
  webpackOptions,
  watchOptions: {},
};

module.exports = defineConfig({

  e2e: {
    projectId: "9wgqhu",   // This ID is set from Cypress Dashboard
    specPattern: "cypress/e2e/TestCases/**/*.cy.js",     //The specPattern tells Cypress where to find your test files.
    baseUrl: "https://ola-staging.wilsondavisclearing.com/",
    // baseUrl: "https://glendalestg.wilsondavisclearing.com/",


    setupNodeEvents(on, config) {

      on('file:preprocessor', webpack(options));   // Set Alias Import in webpack.config.js file

      require('@testomatio/reporter/lib/adapter/cypress-plugin')(on, config);    // testomat.io reporter plugin

      require('@cypress/grep/src/plugin')(config);   // Grep tags plugin

      return config; 
    },

    env: {
      // Grep options for triggering tests
      grepFilterSpecs: true,
      grepOmitFiltered: true,
      grepOmitFiltered:true,
      grepIntegrationFolder: '../../'
    },
    
    numTestsKeptInMemory: 1,   //This will save sanpshot when cypress is run in Ui Mode.
    chromeWebSecurity: false,
    
    fixturesFolder: 'cypress/e2e/fixtures',
    tsc: 'cypress/support/commands.ts',
    defaultCommandTimeout: 30000,
    defaultTimeout: 30000,

    video: true,
    videosFolder: 'cypress/e2e/videos',
    screenshotsFolder: 'cypress/e2e/screenshots',
    pageLoadTimeout:30000 ,
    screenshots: true,
    
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
