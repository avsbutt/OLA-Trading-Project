//THIS FUNCTION SELECT RANDOM VALUE FROM DROPDOWN AND DOEST NOT ACCEPT THE FIRST ONE 

export function selectRandomOption(locator) {
    cy.xpath(locator).should('be.visible').then($select => {
        cy.wrap($select).children('option').should('have.length.greaterThan', 1).then(options => {
            // Start random selection from index 1, skipping the first "Select" option
            const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;
            const value = options[randomIndex].value;
            cy.wrap($select).select(value, {force: true}); // Select the value of the randomly selected option
        });
    });
}