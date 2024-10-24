import { clientLoginUtils } from "../../../../Utils/clientLoginUtils";
import { PersonalInformationPage } from "../../../../Pages/Client/createNewAccount/Personal/Individual/PersonalInformationPage"
import { EmploymentInformationPage } from "../../../../Pages/Client/createNewAccount/Personal/Individual/EmploymentInfomationPage"
import { generatePersonalInfoData } from "../../../../utils/dataGenerator";
import { InvestmentProfilePage } from "../../../../Pages/Client/createNewAccount/Personal/Individual/InvestorProfilePage";

const TC_PersonalInformationPage = new PersonalInformationPage
const TC_EmploymentInformationPage = new EmploymentInformationPage
const TC_InvestmentProfilePage = new InvestmentProfilePage
describe('Client Side - Create Account - Personal', () => {
    it('Verify that user can Create Personal Account With Type individual', () => {
        clientLoginUtils();
        TC_PersonalInformationPage.CreateNewAccountClick();
        TC_PersonalInformationPage.ClickPersonalAndSelectIndividual();
        TC_PersonalInformationPage.ClickNextBtn();

        const randomData= generatePersonalInfoData();
        cy.writeFile('cypress/e2e/fixtures/PersonInfoData.json', randomData)
        TC_PersonalInformationPage.fillPersonalInfo(
            randomData.fName,
            randomData.mName,
            randomData.lName,
            randomData.email,
            randomData.nOfDependents,
            randomData.primaryTelephone,
            randomData.idNumber,
            randomData.dobYYYYMMDD,
            randomData.idIssueDate,
            randomData.idExpirationDate,
            randomData.socialSecurityNo);

        TC_PersonalInformationPage.fillPhysicalAddress(
                randomData.address,
                randomData.city,
                randomData.postalCode);

        TC_PersonalInformationPage.fillTrustedContact(
            randomData.trustedFirstName,
            randomData.trustedLastName,
            randomData.trustedTelephone,
            randomData.trustedEmail,
            randomData.trustedMailingAddress1,
            randomData.trustedCity,
            randomData.trustedPostalCode);
        TC_PersonalInformationPage.SaveAndContinue();
        cy.url().should('include', '/employment-info');

       // ######  TC_EmploymentInformationPage.fillEmployedInfo(); // ########
       TC_EmploymentInformationPage.ClickOnUnemployed();   // Duplicate the test calling because one time its not working 
       TC_EmploymentInformationPage.SaveAndContinue();
 
       TC_InvestmentProfilePage.fillInvestmentProfileInfo();
       TC_InvestmentProfilePage.fillFinancialSuitability();
       TC_InvestmentProfilePage.fillPriorInvestmentExperience(); 

    });
});