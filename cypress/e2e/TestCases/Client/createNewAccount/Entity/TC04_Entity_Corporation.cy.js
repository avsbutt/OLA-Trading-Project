import { clientLoginUtils } from "../../../../utils/clientLoginUtils"
import { waitForLoaderToDisappearUtils } from "../../../../utils/waitForLoaderToDisappearUtils"
import { IfApplicationStatusNotCompletedThenCancelUtils } from "../../../../utils/IfApplicationStatusNotCompletedThenCancelUtils"
import { CloseToasterIfAppearUtils } from "../../../../utils/CloseToasterIfAppearUtils"
import { CreateNewAccountPage } from "../../../../Pages/Client/createNewAccount/CreateNewAccountPage"
import { EntityInformationPage } from "../../../../Pages/Client/createNewAccount/Entity/EntityInformationPage"
import { dataGeneratorUtils } from "../../../../utils/dataGeneratorUtils"

const TC_CreateNewAccountPage = new CreateNewAccountPage
const TC_EntityInformationPage = new EntityInformationPage


describe ('Create Entity Account', ()=>{
 


    beforeEach(() => {

        clientLoginUtils();
        // waitForLoaderToDisappearUtils()
        // IfApplicationStatusNotCompletedThenCancelUtils()
        // CloseToasterIfAppearUtils() 
    });

    it('Retire', ()=>{
        cy.visit("#/entity-info")
       const randomData= dataGeneratorUtils();
      // TC_CreateNewAccountPage.CreateEntityAccount_TypeCorporation()
      //TC_EntityInformationPage.fillEntityInformation(randomData.fName, randomData.socialSecurityNo, randomData.primaryTelephone, randomData.city, randomData.address, randomData.address1, randomData.dobYYYYMMDD, randomData.postalCode)
      //cy.log('DOB', randomData.dobYYYYMMDD) 
      //TC_EntityInformationPage.fillMailingPreference(randomData.address1, randomData.address2, randomData.city, randomData.postalCode, randomData.randomNumbers, randomData.randomNumbers2, randomData.dobYYYYMMDD)

      TC_EntityInformationPage.fillAuthorizedSigner(randomData.fName1, randomData.mName1, randomData.lName1, randomData.dobYYYYMMDD, randomData.email1, randomData.randomNumbers3, randomData.randomNumbers4, randomData.idNumber)

       //TC_EntityInformationPage.fillAuthorizedSigner_isUSCitizenYes(randomData.randomNumbers1)
       






    })
})