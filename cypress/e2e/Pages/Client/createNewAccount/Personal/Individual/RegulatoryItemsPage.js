import { RegulatoryItemsLocators, DirectCommunicationLocators} from "../../../../../Locators/Personal/RegulatoryItems.json"
import { FormUsageButtons } from "../../../../../Locators/FormUsageButtons.json";

export class RegulatoryItemsPage{

fillOption1(randomWords){
    cy.xpath(RegulatoryItemsLocators.Option1Yes).click()
    cy.xpath(RegulatoryItemsLocators.TickerSymbol).type(randomWords)
}
fillOption2(){
    cy.xpath(RegulatoryItemsLocators.Option2Yes).click()
}
fillOption3(randomWords){
    cy.xpath(RegulatoryItemsLocators.Option3Yes).click()
    cy.xpath(RegulatoryItemsLocators.PoliticalTitle).type(randomWords)
    cy.xpath(RegulatoryItemsLocators.OfficialMembers).type(randomWords)
    cy.xpath(RegulatoryItemsLocators.PoliticalOrganization).type(randomWords)
}
fillOption4(){
    cy.xpath(RegulatoryItemsLocators.Option4Yes).click()
}
fillOption5(){
    cy.xpath(RegulatoryItemsLocators.Option5Yes).click()
}
fillOption6(){
    cy.xpath(RegulatoryItemsLocators.Option6Yes).click()
}
fillOption7(){
    cy.xpath(RegulatoryItemsLocators.Option7Yes).click()
}
fillOption8(){
    cy.xpath(RegulatoryItemsLocators.Option8Yes).click()
}
fillOption9(){
    cy.xpath(RegulatoryItemsLocators.Option9Yes).click()
}
fillOption10(){
    cy.xpath(RegulatoryItemsLocators.Option10Yes).click()
}
}