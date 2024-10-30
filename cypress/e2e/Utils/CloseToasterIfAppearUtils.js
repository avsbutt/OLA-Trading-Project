// THIS FUNCTION WILL CLOSE THE TOASTER IF IT WILL APPEAR
export function CloseToasterIfAppearUtils() {
    // Access the document and conditionally look for the toast container
    cy.document().then((doc) => {
        const toast = doc.querySelector(".Toastify__toast-container--top-right");

        // If toast exists, proceed to close it
        if (toast) {
            cy.log("Toaster Appeared");

            // Locate the close button and check for visibility
            cy.xpath("//button[@class='Toastify__close-button Toastify__close-button--colored']")
                .should('exist') // Ensure it exists
                .then(($btn) => {
                    if ($btn.length) { // Ensure button exists
                        cy.log("Scrolling to close button");
                        cy.wrap($btn[0]).scrollIntoView() // Scroll to the button
                            //.should('be.visible') // Check if it's visible
                            .click({ force: true }); // Click the button

                        // Wait for the toaster to disappear
                        // cy.get(".Toastify__toast-container--top-right", { timeout: 10000 }).should('not.exist')
                        //     .then(() => {
                        //         cy.log("Toaster Closed");
                        //     });
                    } else {
                        cy.log("Close button not found.");
                    }
                });
        } else {
            // Log if toaster did not appear
            cy.log("Toaster does not appear");
        }
    });
}
