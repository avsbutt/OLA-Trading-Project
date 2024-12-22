const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@Pages': path.resolve(__dirname, 'cypress/e2e/Pages'),
      '@Locators': path.resolve(__dirname, 'cypress/e2e/Locators'),
      '@Utils': path.resolve(__dirname, 'cypress/e2e/utils'),
      '@Fixtures': path.resolve(__dirname, 'cypress/e2e/fixtures'),
    },
    extensions: ['.js', '.json'],
  },
};
