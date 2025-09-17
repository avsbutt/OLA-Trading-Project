import { clientLoginUtils,registerRepresentativeLoginUtils } from "@Utils/LoginUtils"
import { RegisterRepresentativePage } from "../../Pages/Register_Representative/registerRepresentative"

import { CloseToasterIfAppearUtils } from "@Utils/CloseToasterIfAppearUtils";
import { IfApplicationStatusNotCompletedThenCancelUtils } from "@Utils/IfApplicationStatusNotCompletedThenCancelUtils";
import { waitForLoaderToDisappearUtils } from "@Utils/waitForLoaderToDisappearUtils";


const TC_RegisterRepresentativePage = new RegisterRepresentativePage


describe('Register Representative', () => {


  beforeEach(() => {

    registerRepresentativeLoginUtils();
    waitForLoaderToDisappearUtils()
    IfApplicationStatusNotCompletedThenCancelUtils()
    CloseToasterIfAppearUtils()
 

  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  

  

  it('Verify that RR Can Download Application and Approved an Application', () => {
    waitForLoaderToDisappearUtils()
    TC_RegisterRepresentativePage.ApprovedApplicationFromQueue()



    // TC_RegisterRepresentativePage.selectOption('View Application');

    TC_RegisterRepresentativePage.selectOption('Start Review');
    TC_RegisterRepresentativePage.clickButtonFromPopup('Yes')

    cy.url().should('include', 'registerrep/review-application')
    TC_RegisterRepresentativePage.verifyApplication()
    TC_RegisterRepresentativePage.downloadPrintPdf()
    TC_RegisterRepresentativePage.clickButtonOnReviewPage('Action Required')
    TC_RegisterRepresentativePage.ChangeApplicationStatus('Approved')

    TC_RegisterRepresentativePage.clickButtonFromPopup('Change Status')
    
    waitForLoaderToDisappearUtils()

    cy.url().should('include', 'registerrep/applications')
    TC_RegisterRepresentativePage.verifyApplicationIsNotInQueue()
    TC_RegisterRepresentativePage.verifyApplicationStatus('Pending Review (Sup)')
    



  })

})