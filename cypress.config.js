// Cypress configuration file

module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx}',
    supportFile: false,
    video: false,
    screenshotOnRunFailure: false,
  },
};