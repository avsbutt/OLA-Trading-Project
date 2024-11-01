// Function to wait until loader disappears

export function waitForLoaderToDisappearUtils() {
    cy.get('div.loader_loaderContainer', { timeout: 70000 }) 
        .should('not.exist');
        cy.wait(2000)
}
