import { clientLoginUtils } from "../../../../Utils/clientLoginUtils";
import { PersonalInformationPage } from "../../../../Pages/Client/createNewAccount/Personal/Individual/PersonalInformationPage"
import { generatePersonalInfoData } from "../../../../utils/dataGenerator";

const TC_PersonalInformationPage = new PersonalInformationPage
describe('Client Side - Create Account - Personal', () => {
    it('Verify that user can Create Personal Account With Type individual', () => {
        clientLoginUtils();
        TC_PersonalInformationPage.CreateNewAccountClick();
        TC_PersonalInformationPage.ClickPersonalAndSelectIndividual();
        TC_PersonalInformationPage.ClickNextBtn();

        const randomData= generatePersonalInfoData();
        cy.writeFile('cypress/e2e/fixtures/PersonInfoData.json', randomData).then(() => {
            // Confirm that the write operation was successful
            cy.readFile('cypress/e2e/fixtures/PersonInfoData.json').should('deep.equal', randomData);
        });
        TC_PersonalInformationPage.fillPersonalInfo(
            randomData.fName,
            randomData.mName,
            randomData.lName,
            randomData.email,
            randomData.nOfDependents,
            randomData.primaryTelephone,
            randomData.idNumber);
    });
});