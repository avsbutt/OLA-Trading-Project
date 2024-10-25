import { RegulatoryItemsLocators, DirectCommunicationLocators} from "../../../../../Locators/Personal/RegulatoryItemsLocators.json"
import { FormUsageButtons } from "../../../../../Locators/FormUsageButtons.json";

export class RegulatoryItemsPage{

fillOption1(){
    cy.xpath(RegulatoryItemsLocators.Option1No).click({force: true})
    //cy.xpath(RegulatoryItemsLocators.TickerSymbol).type(randomWords)
}
fillOption2(){
    cy.xpath(RegulatoryItemsLocators.Option2No).click({force: true})
    // cy.xpath(RegulatoryItemsLocators.PoliticalTitle).type(randomWords)
    // cy.xpath(RegulatoryItemsLocators.OfficialMembers).type(randomWords)
    // cy.xpath(RegulatoryItemsLocators.PoliticalOrganization).type(randomWords)
}
fillOption3(randomWords){
    cy.xpath(RegulatoryItemsLocators.Option3Yes).click({force: true})
    cy.xpath(RegulatoryItemsLocators.PoliticalTitle).type(randomWords)
    cy.xpath(RegulatoryItemsLocators.OfficialMembers).type(randomWords)
    cy.xpath(RegulatoryItemsLocators.PoliticalOrganization).type(randomWords)
}
fillOption4(){
    cy.xpath(RegulatoryItemsLocators.Option4No).click({force: true})
}
fillOption5(randomWords){
    cy.xpath(RegulatoryItemsLocators.Option5Yes).click({force: true})
    cy.xpath(RegulatoryItemsLocators.ProvideAgentName5).type(randomWords)
}
fillOption6(){
    cy.xpath(RegulatoryItemsLocators.Option6Yes).click({force: true})
}
fillOption7(randomWords){
    cy.xpath(RegulatoryItemsLocators.Option7Yes).click({force: true})
    cy.xpath(RegulatoryItemsLocators.ProvideAgentName7).type(randomWords)
}
fillOption8(){
    cy.xpath(RegulatoryItemsLocators.Option8No).click({force: true})
}
fillOption9(){
    cy.xpath(RegulatoryItemsLocators.Option9No).click({force: true})
}
fillOption10(){
    cy.xpath(RegulatoryItemsLocators.Option10No).click({force: true})
}
fillDirectCommunication(){
    cy.xpath(DirectCommunicationLocators.IObject).click({force: true})
}
SaveAndContinue(){
    cy.xpath(FormUsageButtons.SaveAndContinue).click();
}
}