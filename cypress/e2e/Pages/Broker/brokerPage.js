import { BrokerLocators } from "../../Locators/registerRepresentative.json";
import { waitForLoaderToDisappearUtils } from "../../utils/waitForLoaderToDisappearUtils";
import { downloadAndVerify } from "../../utils/downloadUtils";
import { RegisterRepresentativeLocators } from "../../Locators/registerRepresentative.json";

export class BrokerPage {
  VerifyNoAssigneeFromQueue() {
    cy.xpath(RegisterRepresentativeLocators.ApprovalQueue).click({
      force: true,
    });
    cy.fixture("PersonInfoData.json").then((person) => {
      const fullName = `${person.fName}`;

      cy.get("#row-0")
        .find('[role="cell"]')
        .contains(fullName)
        .then(($el) => {
          if ($el.length > 0) {
            cy.get("#row-0")
              .find('#cell-6-undefined [data-tag="allowRowEvents"]')
              .invoke("text")
              .should("eq", ""); // ✅ must be empty
          } else {
            cy.log(`❌ Name ${fullName} not found in row 0`);
          }
        });
    });
  }

  VerifyAssigneeFromQueue(assigneeName) {
    cy.xpath(RegisterRepresentativeLocators.ApprovalQueue).click({
      force: true,
    });
    cy.fixture("PersonInfoData.json").then((person) => {
      const fullName = `${person.fName}`;

      cy.get("#row-0")
        .find('[role="cell"]')
        .contains(fullName)
        .then(($el) => {
          if ($el.length > 0) {
            cy.get("#row-0")
              .find('#cell-6-undefined [data-tag="allowRowEvents"]')
              .should("contain.text", assigneeName); // ✅ dynamic check
          } else {
            cy.log(`❌ Name ${fullName} not found in row 0`);
          }
        });
    });
  }

    ClickButton(type) {
        const validButtons = ["Assign to", "Re-Assign to"];

        if (!validButtons.includes(type)) {
            throw new Error(`❌ Invalid button type: ${type}. Use "Assign to" or "Re-Assign to".`);
        }

        cy.fixture("PersonInfoData.json").then((person) => {
            const fullName = `${person.fName}`;

            cy.get("#row-0")
            .find('[role="cell"]')
            .contains(fullName)
            .then(($el) => {
                if ($el.length > 0) {
                cy.get("#row-0")
                    .find('#cell-7-undefined .table_btns button')
                    .contains(type)   // ✅ only "Assign to" or "Re-Assign to"
                    .click({ force: true });
                } else {
                cy.log(`❌ Name ${fullName} not found in row 0`);
                }
            });
        });
    }

    SelectRegisterRep(optionText) {
     cy.xpath(RegisterRepresentativeLocators.selectRR).select(optionText);
    }
}
