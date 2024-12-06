Create Folder for Projext
run this cmd to install package.json file... npm init -y
run this cmd to install CYPRESS... npm install cypress --save-dev
run this command to run the NPM cmd locally on system ... npx cypress -v
run this command to verify CYPRESS dependecies... npx cypress verify
Open Cypress Command ... npx Cypress open
Create Locators, fixtures, pages, TestCases, screenshots, vedios, and fixtures folder in e2e, and setup their path to the cypress.config.js file


Necessary Installation:

Xpath: 
npm install cypress-xpath --save-dev     
Modify the cypress/support/e2e.js:        require('cypress-xpath')
--------------------


iFrame:
npm install -D cypress-iframe
Add the following line to your cypress/support/commands.js file:      import 'cypress-iframe';
Usage Example:
cy.frameLoaded('#your-iframe-id');
cy.iframe('#your-iframe-id').find('selector-within-iframe').click();
--------------------
Mocha-Allure-Reporter:
npm install allure-commandline --save-dev
npm install mocha-allure-reporter --save-dev

install this to clear previous Data (Allure result,report):      npm install rimraf --save-dev  
rm -rf allure-results allure-report
OR you can delete manually by deleting the folder.

Run this command to generate allure Report through result:
allure generate allure-results --clean 
After allure result are generated run this command to open report
To view the report, run:         
allure open

--------------------
Real-Events:
If Hover/drag-drop is not working with trigger real-events is used.
npm install cypress-real-events
Add the following line to your cypress/support/commands.js file:        import 'cypress-real-events';
so you can use with realDrag,realHover

--------------------
File upload:
npm install --save-dev cypress-file-upload
Add this command in support/commands.js:      require('cypress-file-uoload');
Add this command in support/e2e.js:           import 'cypress-file-upload';

--------------------
Faker:  
To generate random data like email, first name, last name, and telephone in Cypress, Faker is used.
npm install @faker-js/faker --save-dev
Used this in file where faker is required...     const { faker } = require('@faker-js/faker');

--------------------
Testomat.io
npm i --save-dev @testomatio/reporter
To use this add this command in setupNodeEvents in cypress.config.js file...     require('@testomatio/reporter/lib/adapter/cypress-plugin')(on, config);


To use testomat first Create a Project in Testomat
Then import Automated Test Testomat Generate API Link Paste this in Cypress and Run with TC directory API >>>(TESTOMATIO=tstmt_PrER07IFwDX6WpcfTo3aZGCcgnAS1xF5RA1725132035 npx check-tests@latest Cypress.io "**/*{.,_}{test,spec,cy}.js" --dir "/Users/awaismumtaz/Desktop/E-Commerce Automation Cypress/cypress/e2e/TestCases"
)
For Every Project Api will be different.
After Running this command in terminal check Testomat Your test are imported in Testomat.