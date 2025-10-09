import { RegisterRepresentativeLocators } from "../../Locators/registerRepresentative.json";
import { waitForLoaderToDisappearUtils } from "../../utils/waitForLoaderToDisappearUtils";
import { downloadAndVerify } from "../../utils/downloadUtils";

export class RegisterRepresentativePage {
  ApprovedApplicationFromQueue() {
    cy.xpath(RegisterRepresentativeLocators.ApprovalQueue).click({
      force: true,
    });
    waitForLoaderToDisappearUtils();
    cy.fixture("PersonInfoData.json").then((person) => {
      const fullName = `${person.fName}`;

      cy.get("#row-0")
        .find('[role="cell"]')
        .contains(fullName)
        .then(($el) => {
          if ($el.length > 0) {
            // if match found, click dropdown
            cy.get("#row-0")
              .find(RegisterRepresentativeLocators.settingIcon)
              .first()
              .click();
          } else {
            cy.log(`❌ Name ${fullName} not found in row 1`);
          }
        });
    });
  }

  selectOption(optionText) {
    const optionXpath = `${RegisterRepresentativeLocators.dropdownOptions}[normalize-space(text())='${optionText}']`;
    cy.xpath(optionXpath).should("be.visible").click();
  }

  clickButtonFromPopup(buttonText) {
    const btnXpath = `${RegisterRepresentativeLocators.popupButtons}[normalize-space(text())='${buttonText}']`;
    cy.xpath(btnXpath)
      .should("be.visible")
      .focus()
      .click({ force: true })
  }

  verifyApplication() {
    cy.fixture("PersonInfoData.json").then((person) => {
      cy.contains(person.fName).should("be.visible");
      //cy.contains(person.lName).should("be.visible");
    });
  }

  clickButtonOnReviewPage(buttonText) {
    const btnXpath = `${RegisterRepresentativeLocators.ReviewButtons}[normalize-space(text())='${buttonText}']`;
    cy.xpath(btnXpath).should("be.visible").click();
  }

  downloadPrintPdf() {
    return downloadAndVerify(
      () => {
        this.clickButtonOnReviewPage("Print"); // existing click
      },
      { pattern: "*.pdf" }
    );
  }

  ChangeApplicationStatus(partialText) {
    // Replace placeholder {TEXT} dynamically
    const optionXpath = RegisterRepresentativeLocators.statusOption.replace(
      "{TEXT}",
      partialText
    );

    cy.xpath(optionXpath).then((option) => {
      cy.xpath(RegisterRepresentativeLocators.statusDropdown)
        .select(option.text(), { force: true })
        .focus()
        .trigger('input')
        .trigger('change')
        .trigger('blur');
    });

    cy.xpath(RegisterRepresentativeLocators.statusDropdownInput).click();

  }

  verifyApplicationIsNotInQueue() {
    cy.xpath(RegisterRepresentativeLocators.ApprovalQueue).click({
      force: true,
    });
    waitForLoaderToDisappearUtils();

    cy.document().then((doc) => {
      const noRecordElement = doc.evaluate(
        "//div[normalize-space(text())='No record found']",
        doc,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (noRecordElement) {
        cy.log("No record found");
      } else {
        cy.fixture("PersonInfoData.json").then((person) => {
          const fullName = `${person.fName}`;
          cy.get("#row-0")
            .find('[role="cell"]')
            .should("not.contain", fullName);
        });
      }
    })
  }

  verifyApplicationStatus(expectedTitle) {
    // cy.xpath(RegisterRepresentativeLocators.Dashboard).click({ force: true });

    cy.fixture("PersonInfoData.json").then((person) => {
      const fullName = `${person.fName}`;

      cy.get("#row-0")
        .find('[role="cell"]')
        .contains(fullName)
        .then(($el) => {
          if ($el.length > 0) {
            // if match found, Check Status
            cy.get("#row-0")
              .find('[data-tag="allowRowEvents"] .acc-status')
              .should("be.visible")
              // .and("have.attr", "title", expectedTitle)
              .and("contain.text", expectedTitle);
          } else {
            cy.log(`❌ Name ${fullName} not found in row 1`);
          }
        });
    });
  }
  clickOnDashboard(){
    cy.xpath(RegisterRepresentativeLocators.Dashboard).click({ force: true });
  }
  clickOnApprovalQueue(){
    cy.xpath(RegisterRepresentativeLocators.ApprovalQueue).click()
  }
}
