import { RegulatoryItemsLocators, DirectCommunicationLocators} from "../../../../../Locators/Personal/RegulatoryItemsLocators.json"
import { FormUsageButtons } from "../../../../../Locators/FormUsageButtons.json";

export class RegulatoryItemsPage{

fillOption1(){
    cy.xpath(RegulatoryItemsLocators.Option1No).check()
    //cy.xpath(RegulatoryItemsLocators.TickerSymbol).type(randomWords)
}
fillOption2(){
    cy.xpath(RegulatoryItemsLocators.Option2No).check()
    // cy.xpath(RegulatoryItemsLocators.PoliticalTitle).type(randomWords)
    // cy.xpath(RegulatoryItemsLocators.OfficialMembers).type(randomWords)
    // cy.xpath(RegulatoryItemsLocators.PoliticalOrganization).type(randomWords)
}
fillOption3(randomWords){
    cy.xpath(RegulatoryItemsLocators.Option3Yes).check()
    cy.xpath(RegulatoryItemsLocators.PoliticalTitle).type(randomWords)
    cy.xpath(RegulatoryItemsLocators.OfficialMembers).type(randomWords)
    cy.xpath(RegulatoryItemsLocators.PoliticalOrganization).type(randomWords)
}
fillOption4(){
    cy.xpath(RegulatoryItemsLocators.Option4No).check()
}
fillOption5(randomWords){
    cy.xpath(RegulatoryItemsLocators.Option5Yes).check()
    cy.xpath(RegulatoryItemsLocators.ProvideAgentName5).type(randomWords)
}
fillOption6(){
    cy.xpath(RegulatoryItemsLocators.Option6Yes).check()
}
fillOption7(randomWords){
    cy.xpath(RegulatoryItemsLocators.Option7Yes).check()
    cy.xpath(RegulatoryItemsLocators.ProvideAgentName7).type(randomWords)
}
fillOption8(){
    cy.xpath(RegulatoryItemsLocators.Option8No).check()
}
fillOption9(){
    cy.xpath(RegulatoryItemsLocators.Option9No).check()
}
fillOption10(){
    cy.xpath(RegulatoryItemsLocators.Option10No).check()
}
fillDirectCommunication(){
    cy.xpath(DirectCommunicationLocators.IObject).check()
}
SaveAndContinue(){
    cy.xpath(FormUsageButtons.SaveAndContinue).click();
}
}