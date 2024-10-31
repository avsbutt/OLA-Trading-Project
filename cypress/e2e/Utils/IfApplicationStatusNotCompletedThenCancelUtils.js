import { FormUsageButtons, CancelApplicationLocators } from "../Locators/FormUsageButtons.json";

export function IfApplicationStatusNotCompletedThenCancelUtils() {
    // Wait until the loader disappears
    cy.document().then((doc) => {
        const loader = doc.querySelector("div.loader_loaderContainer");

        // Use a Cypress retry loop to wait for the loader to be removed or hidden
        cy.wrap(loader, { timeout: 10000 }).should('not.exist').then(() => {
            // After the loader disappears, proceed with checking the application status
            const applicationStatusElement = doc.querySelector("div[title='Not Completed']");

            if (applicationStatusElement && applicationStatusElement.offsetParent !== null) {
                // If the application status element exists and is visible
                cy.xpath(CancelApplicationLocators.Settings).click();
                cy.xpath(CancelApplicationLocators.CancelApplication).click();
                cy.xpath(CancelApplicationLocators.CancelApplicationYes).click();
            } else {
                // If not present or not visible, print a message
                cy.log("There is No Application with Not Completed status");
            }
        });
    });
}
