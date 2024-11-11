import { clientLoginUtils } from "../../../../utils/clientLoginUtils"
import { waitForLoaderToDisappearUtils } from "../../../../utils/waitForLoaderToDisappearUtils"
import { IfApplicationStatusNotCompletedThenCancelUtils } from "../../../../utils/IfApplicationStatusNotCompletedThenCancelUtils"
import { dataGeneratorUtils } from "../../../../utils/dataGeneratorUtils"
import { CloseToasterIfAppearUtils } from "../../../../utils/CloseToasterIfAppearUtils"
import { CreateNewAccountPage } from "../../../../Pages/Client/createNewAccount/CreateNewAccountPage"
import { EntityInformationPage } from "../../../../Pages/Client/createNewAccount/Entity/EntityInformationPage"
import { InvestmentProfilePage } from "../../../../Pages/Client/createNewAccount/Personal/InvestorProfilePage"
import { RegulatoryItemsPage } from "../../../../Pages/Client/createNewAccount/Personal/RegulatoryItemsPage"
import { AccountFeaturesPage} from "../../../../Pages/Client/createNewAccount/Personal/AccountFeaturesPage"


const TC_CreateNewAccountPage = new CreateNewAccountPage
const TC_EntityInformationPage = new EntityInformationPage
const TC_InvestmentProfilePage = new InvestmentProfilePage
const TC_RegulatoryItemsPage = new RegulatoryItemsPage
const TC_AccountFeaturesPage = new AccountFeaturesPage

describe ('Client Side - Entity - Corporation', ()=>{
 
    beforeEach(() => {

        clientLoginUtils();
        waitForLoaderToDisappearUtils()
        IfApplicationStatusNotCompletedThenCancelUtils()
        CloseToasterIfAppearUtils() 
    });

    it('Verify that US Citizen User can Create an Entity Account ', ()=>{



      //  cy.visit("#/account-entity-features")
       
         const randomData= dataGeneratorUtils();
        TC_CreateNewAccountPage.CreateEntityAccount_TypeCorporation()
        CloseToasterIfAppearUtils();
 

        TC_EntityInformationPage.fillEntityInformation(randomData.fName, randomData.socialSecurityNo, randomData.primaryTelephone, randomData.city, randomData.address, randomData.address1, randomData.dobYYYYMMDD, randomData.postalCode)
        TC_EntityInformationPage.fillMailingPreference(randomData.address1, randomData.address2, randomData.city, randomData.postalCode, randomData.randomNumbers, randomData.randomNumbers2, randomData.dobYYYYMMDD)
        TC_EntityInformationPage.fillAuthorizedSigner(randomData.fName1, randomData.mName1, randomData.lName1, randomData.dobMMDDYYYY1, randomData.email1, randomData.randomNumbers3, randomData.randomNumbers4, randomData.idNumber, randomData.idIssueDate, randomData.idExpirationDate)
        TC_EntityInformationPage.fillAuthorizedSigner_isUSCitizenYes(randomData.randomNumbers1)
        TC_EntityInformationPage.fillIndustrialClassification()
        TC_EntityInformationPage.SaveAndContinue()
        waitForLoaderToDisappearUtils()
 

        cy.url().should('include', '#/investor-entity-profile')
        TC_InvestmentProfilePage.fillInvestmentProfileInfo()
        TC_InvestmentProfilePage.fillFinancialSuitability()
        TC_InvestmentProfilePage.fillPriorInvestmentExperience()
        TC_InvestmentProfilePage.SaveAndContinue()
        waitForLoaderToDisappearUtils()


        cy.url().should('include', '#/regulatory-entity-items')
        cy.wait(1000)
        TC_RegulatoryItemsPage.fillOption1()
        cy.wait(1000)
        TC_RegulatoryItemsPage.fillOption2_Entity()
        TC_RegulatoryItemsPage.fillOption3_Entity(randomData.randomWords)
        TC_RegulatoryItemsPage.fillOption4()
        TC_RegulatoryItemsPage.fillOption5(randomData.randomWords)
        TC_RegulatoryItemsPage.fillOption6()
        TC_RegulatoryItemsPage.fillOption7(randomData.randomWords)
        TC_RegulatoryItemsPage.fillOption8()
        TC_RegulatoryItemsPage.fillOption9()
        TC_RegulatoryItemsPage.fillOption10()
        TC_RegulatoryItemsPage.fillOption11_Entity()
        TC_RegulatoryItemsPage.fillOption12_Entity()
        TC_RegulatoryItemsPage.fillDirectCommunication()
        TC_RegulatoryItemsPage.SaveAndContinue()
        waitForLoaderToDisappearUtils()

          
        cy.url().should('include', '#/account-entity-features')
        TC_AccountFeaturesPage.SaveAndContinue()
        TC_AccountFeaturesPage.EntityAccountDueDiligenceQuestionnaire()
        TC_AccountFeaturesPage.SaveAndContinue()
        CloseToasterIfAppearUtils();
        waitForLoaderToDisappearUtils()


        
       

    })
})