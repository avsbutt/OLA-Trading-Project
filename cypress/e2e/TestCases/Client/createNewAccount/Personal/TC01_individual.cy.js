import { clientLoginUtils } from "../../../../Utils/clientLoginUtils";
import { PersonalInformationPage } from "../../../../Pages/Client/createNewAccount/Personal/Individual/PersonalInformationPage"
import { EmploymentInformationPage } from "../../../../Pages/Client/createNewAccount/Personal/Individual/EmploymentInfomationPage"
import { generatePersonalInfoData } from "../../../../utils/dataGenerator";
import { InvestmentProfilePage } from "../../../../Pages/Client/createNewAccount/Personal/Individual/InvestorProfilePage";
import { RegulatoryItemsPage } from "../../../../Pages/Client/createNewAccount/Personal/Individual/RegulatoryItemsPage"
import { AccountFeaturesPage} from "../../../../Pages/Client/createNewAccount/Personal/Individual/AccountFeaturesPage"

const TC_PersonalInformationPage = new PersonalInformationPage
const TC_EmploymentInformationPage = new EmploymentInformationPage
const TC_InvestmentProfilePage = new InvestmentProfilePage
const TC_RegulatoryItemsPage = new RegulatoryItemsPage
const TC_AccountFeaturesPage = new AccountFeaturesPage
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
        

       // ######  TC_EmploymentInformationPage.fillEmployedInfo(); // ########
       cy.url().should('include', '/employment-info');
       TC_EmploymentInformationPage.ClickOnUnemployed();   // Duplicate the test calling because one time its not working 
       TC_EmploymentInformationPage.SaveAndContinue();
 

       TC_InvestmentProfilePage.fillInvestmentProfileInfo();
       TC_InvestmentProfilePage.fillFinancialSuitability();
       TC_InvestmentProfilePage.fillPriorInvestmentExperience(); 
       TC_InvestmentProfilePage.SaveAndContinue();


       cy.url().should('include', '/regulatory-items')
       cy.wait(2000)
       TC_RegulatoryItemsPage.fillOption1()
       cy.wait(2000)
       TC_RegulatoryItemsPage.fillOption2()
 
       TC_RegulatoryItemsPage.fillOption3(randomData.randomWords)
 
       TC_RegulatoryItemsPage.fillOption4()
 
       TC_RegulatoryItemsPage.fillOption5(randomData.randomWords)
       TC_RegulatoryItemsPage.fillOption6()
       TC_RegulatoryItemsPage.fillOption7(randomData.randomWords)
       TC_RegulatoryItemsPage.fillOption8()
       TC_RegulatoryItemsPage.fillOption9()
       TC_RegulatoryItemsPage.fillOption10()
       TC_RegulatoryItemsPage.fillDirectCommunication()
       TC_RegulatoryItemsPage.SaveAndContinue()


       cy.url().should('include', '#/account-features')
       TC_AccountFeaturesPage.SaveAndContinue()

    });
});