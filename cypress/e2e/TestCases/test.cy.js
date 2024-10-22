describe ('Test', ()=>{

    it('User can type signature', ()=>{
        cy.visit("", {
            failOnStatusCode: false,
            auth: {
              username: 'ola-staging',
              password: 'Atlasclear@123/'
            }
          })

          cy.get('#username').type('democlient')
          cy.get('#password').type('Pac@123456')
          cy.get('.btn').click()
          
          cy.get('#row-0 > #cell-6-undefined > .dropdown > #dropdown-basic > .fa').click()
          cy.visit("#/disclosures-signatures")
          cy.xpath('//*[@id="react-sketch-canvas__mask-background"]').should('be.visible') 
          .click({ force: true }); 
           
    })
})