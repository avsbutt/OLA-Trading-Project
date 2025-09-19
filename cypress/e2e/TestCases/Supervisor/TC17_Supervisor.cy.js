import { clientLoginUtils,registerRepresentativeLoginUtils,supervsorLoginUtils } from "@Utils/LoginUtils"
import { RegisterRepresentativePage } from "../../Pages/Register_Representative/registerRepresentative"
import { dataGeneratorUtils } from "@Utils/dataGeneratorUtils";

import { CloseToasterIfAppearUtils } from "@Utils/CloseToasterIfAppearUtils";
import { IfApplicationStatusNotCompletedThenCancelUtils } from "@Utils/IfApplicationStatusNotCompletedThenCancelUtils";
import { waitForLoaderToDisappearUtils } from "@Utils/waitForLoaderToDisappearUtils";


const TC_RegisterRepresentativePage = new RegisterRepresentativePage


describe('Register Representative', () => {


  beforeEach(() => {

    supervsorLoginUtils();
    waitForLoaderToDisappearUtils()
    IfApplicationStatusNotCompletedThenCancelUtils()
    CloseToasterIfAppearUtils()
 

  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  

  

  it("Verify that Supervisor Can Download and Approved an Application", () => {
    supervsorLoginUtils();
    waitForLoaderToDisappearUtils();
    CloseToasterIfAppearUtils();

    TC_RegisterRepresentativePage.ApprovedApplicationFromQueue();

    // TC_RegisterRepresentativePage.selectOption('View Application');

    TC_RegisterRepresentativePage.selectOption("Start Review");
    TC_RegisterRepresentativePage.clickButtonFromPopup("Yes");

    cy.url().should("include", "supervisor/review-application");
    TC_RegisterRepresentativePage.verifyApplication();
    TC_RegisterRepresentativePage.downloadPrintPdf();
    TC_RegisterRepresentativePage.clickButtonOnReviewPage("Action Required");
    TC_RegisterRepresentativePage.ChangeApplicationStatus("Approved (Sup)");
    TC_RegisterRepresentativePage.clickButtonFromPopup("Change Status");
    waitForLoaderToDisappearUtils();

    cy.url().should("include", "supervisor/applications");
    TC_RegisterRepresentativePage.verifyApplicationIsNotInQueue();
    TC_RegisterRepresentativePage.clickOnDashboard()
    TC_RegisterRepresentativePage.verifyApplicationStatus("Approved");
  })

})