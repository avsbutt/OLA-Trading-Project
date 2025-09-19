import { glendaleBrokerLoginUtils } from "@Utils/LoginUtils"
import { BrokerPage } from "../../Pages/Broker/brokerPage"
import { RegisterRepresentativePage } from "@Pages/Register_Representative/registerRepresentative";

import { dataGeneratorUtils } from "@Utils/dataGeneratorUtils";

import { CloseToasterIfAppearUtils } from "@Utils/CloseToasterIfAppearUtils";
import { IfApplicationStatusNotCompletedThenCancelUtils } from "@Utils/IfApplicationStatusNotCompletedThenCancelUtils";
import { waitForLoaderToDisappearUtils } from "@Utils/waitForLoaderToDisappearUtils";


const TC_BrokerPage = new BrokerPage
const TC_RegisterRepresentativePage = new RegisterRepresentativePage();



describe('Register Representative', () => {


  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });



  it('Verify that Broker Can Download and Assign an Application to RR', () => {
    glendaleBrokerLoginUtils();
    CloseToasterIfAppearUtils()
    waitForLoaderToDisappearUtils()
    // TC_BrokerPage.VerifyNoAssigneeFromQueue();
    TC_RegisterRepresentativePage.ApprovedApplicationFromQueue();
    TC_RegisterRepresentativePage.selectOption('View Application');
    cy.url().should("include", "broker/review-application");
    TC_RegisterRepresentativePage.verifyApplication();
    TC_RegisterRepresentativePage.downloadPrintPdf();
    TC_RegisterRepresentativePage.clickButtonOnReviewPage("OK");
    TC_RegisterRepresentativePage.clickOnApprovalQueue()
    TC_BrokerPage.VerifyNoAssigneeFromQueue()
    TC_RegisterRepresentativePage.verifyApplicationStatus('Submitted Pending Approval')
    TC_BrokerPage.ClickButton('Assign to')
    TC_BrokerPage.SelectRegisterRep('Glendale RR')
    TC_RegisterRepresentativePage.clickButtonFromPopup("Assign to RR");
    waitForLoaderToDisappearUtils()
    TC_BrokerPage.VerifyAssigneeFromQueue('Glendale RR')
    TC_RegisterRepresentativePage.verifyApplicationStatus('Pending Review (Rr)')

  })

})