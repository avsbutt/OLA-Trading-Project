export function CloseToasterIfAppear() {
    // Access the document and conditionally look for the toast container
    cy.document().then((doc) => {
        const toast = doc.querySelector(".Toastify__toast-container--top-right");

        // If toast exists, proceed to close it
        if (toast) {
            cy.log("Toaster Appeared");

            // Now locate and click the close button within the toast container
            cy.xpath("//button[@class='Toastify__close-button Toastify__close-button--colored']")
                .should('be.visible')
                .click({ force: true });

            cy.log("Toaster Closed");
        } else {
            // Log if toaster did not appear
            cy.log("Toaster does not appear");
        }
    });
}
