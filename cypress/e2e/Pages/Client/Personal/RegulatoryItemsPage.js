import { RegulatoryItemsLocators, DirectCommunicationLocators, W8BenLocators} from "@Locators/Personal/RegulatoryItemsLocators.json"
import { FormUsageButtons } from "@Locators/FormUsageButtons.json";

export class RegulatoryItemsPage{

    fillOption1(){
        cy.xpath(RegulatoryItemsLocators.Option1No).focus().click({force: true})
        //cy.xpath(RegulatoryItemsLocators.TickerSymbol).type(randomWords)
    }
    fillOption2(){
        cy.xpath(RegulatoryItemsLocators.Option2No).focus().check()
        // cy.xpath(RegulatoryItemsLocators.PoliticalTitle).type(randomWords)
        // cy.xpath(RegulatoryItemsLocators.OfficialMembers).type(randomWords)
        // cy.xpath(RegulatoryItemsLocators.PoliticalOrganization).type(randomWords)
    }

    fillOption3(randomWords){
        cy.xpath(RegulatoryItemsLocators.Option3Yes).focus().check()
        cy.xpath(RegulatoryItemsLocators.PoliticalTitle).focus().type(randomWords)
        cy.xpath(RegulatoryItemsLocators.OfficialMembers).focus().type(randomWords)
        cy.xpath(RegulatoryItemsLocators.PoliticalOrganization).focus().type(randomWords)
    }

    fillOption4(){
        cy.xpath(RegulatoryItemsLocators.Option4No).focus().check()
    }
    fillOption5(randomWords){
        cy.xpath(RegulatoryItemsLocators.Option5Yes).focus().check()
        cy.xpath(RegulatoryItemsLocators.ProvideAgentName5).focus().type(randomWords)
    }
    fillOption6(){
        cy.xpath(RegulatoryItemsLocators.Option6Yes).focus().check()
    }
    fillOption7(randomWords, ){
        cy.xpath(RegulatoryItemsLocators.Option7Yes).focus().check()
        cy.xpath(RegulatoryItemsLocators.ProvideAgentName7).focus().type(randomWords)
    }
    fillOption8(){
        cy.xpath(RegulatoryItemsLocators.Option8No).focus().check()
    }
    fillOption9(){
        cy.xpath(RegulatoryItemsLocators.Option9No).focus().check()
    }
    fillOption10(){
        cy.xpath(RegulatoryItemsLocators.Option10No).focus().check()
    }
    fillDirectCommunication(){
        cy.xpath(DirectCommunicationLocators.IObject).focus().check()
    }
    fillW8Ben_ForForeignAccounts(randomWords, city){
        cy.xpath(W8BenLocators.Field1).clear().focus().type(city)
        cy.xpath(W8BenLocators.Field2).clear().focus().type(randomWords)
        cy.xpath(W8BenLocators.Field3).clear().focus().type(randomWords)
        cy.xpath(W8BenLocators.Field4).clear().focus().type(randomWords) 
    }


    //###-------FOR ENTITY OPTIONS ONLY-------###

    fillOption2_Entity(){
        cy.xpath(RegulatoryItemsLocators.Option2No_Entity).focus().check()
    }

    fillOption3_Entity(randomWords){
        cy.xpath(RegulatoryItemsLocators.Option3Yes).focus().check()
        cy.xpath(RegulatoryItemsLocators.PoliticallyExposedPersonName3_Entity).focus().type(randomWords)
        cy.xpath(RegulatoryItemsLocators.PoliticallyExposedPersonRole3_Entity).focus().type(randomWords)
        cy.xpath(RegulatoryItemsLocators.PoliticalTitle).focus().type(randomWords)
        cy.xpath(RegulatoryItemsLocators.OfficialMembers).focus().type(randomWords)
        cy.xpath(RegulatoryItemsLocators.PoliticalOrganization).focus().type(randomWords)
    }
    fillOption11_Entity(){
        cy.xpath(RegulatoryItemsLocators.Option11Yes_Entity).focus().check()

    }
    fillOption12_Entity(){
        cy.xpath(RegulatoryItemsLocators.Option12No_Entity).focus().check()
    }

    SaveAndContinue(){
        cy.xpath(FormUsageButtons.SaveAndContinue).focus().click({force:true});
    }
}