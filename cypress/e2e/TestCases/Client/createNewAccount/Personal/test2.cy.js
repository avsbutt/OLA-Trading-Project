import { clientLoginUtils } from "@Utils/LoginUtils"


describe('Import Handle', () => {
    it('Mock reCAPTCHA and Log In Successfully',  { tags: ['@smoke']}, () => {
      // Visit the page
      cy.visit('', {
        failOnStatusCode: false,
        auth: {
          username: 'ola-staging',
          password: 'Atlasclear@123/'
        }
      })
  clientLoginUtils()
     
  
    })
  })