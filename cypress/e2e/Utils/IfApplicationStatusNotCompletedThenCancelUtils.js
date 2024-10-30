import { FormUsageButtons, CancelApplicationLocators } from "../Locators/FormUsageButtons.json";

export function IfApplicationStatusNotCompletedThenCancelUtils() {
    // Use cy.document to access the DOM
    cy.document().then((doc) => {
        // Check if the application status element is present in the DOM
        const applicationStatusElement = doc.querySelector("div[title='Not Completed']");

        if (applicationStatusElement) {
            // If the application status element exists, check its visibility
            cy.wrap(applicationStatusElement).should('be.visible').then(() => {
                // Perform the actions if visible
                cy.xpath(CancelApplicationLocators.Settings).click();
                cy.xpath(CancelApplicationLocators.CancelApplication).click();
                cy.xpath(CancelApplicationLocators.CancelApplicationYes).click();
            });
        } else {
            // If not present, print a message
            cy.log("There is No Application with Not Completed status");
        }
    });
}
