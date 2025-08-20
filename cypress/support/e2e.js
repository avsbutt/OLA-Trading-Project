// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
require('cypress-xpath');
import 'cypress-real-events';
import '@cypress/grep';
require('@cypress/grep')();


// const registerCypressGrep = require('@cypress/grep');
// registerCypressGrep();



// import 'cypress-slow-down/commands';
// Cypress.SlowDown.defaults({
//     delay: 600  // Delay in milliseconds between each command
//   });

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
})

//--------------

// Cypress.on('fail', (error, runnable) => {
//   // Capture full-page screenshot on test failure
//   cy.screenshot('failure-full-page', { capture: 'fullPage' });
//   throw error; // Rethrow the error to ensure the failure is logged properly
// })