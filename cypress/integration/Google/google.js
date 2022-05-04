import { Given, When, Then, Before } from "cypress-cucumber-preprocessor/steps";

var googleLocators

Before(() => {
    //#region getting locators' addresses
    cy.fixture('locators/google')
        .then(locators => {
            googleLocators = locators
        })
    //#endregion
})

Given('I open Google page', () => {
    cy.visit(googleLocators.homeUrl)
})


When('I input {string} on searching box', (searchStr) => {
    cy.get(googleLocators.searchTextBox).type(searchStr + '{enter}')
})

And('Search result should be {string}', (resultString) => {
    cy.get(googleLocators.resultNumber)
        .should('include.text', resultString)
})

Then('Search result should contain {string}', (searchStr) => {
    let nextPage = true
    let curPage = 1
    let maxPage = 3
    while (nextPage && curPage < maxPage) {
        let keys = searchStr.trim().toLowerCase().split(' ')
        //#region checking display string should be contain search key
        cy
            .get(googleLocators.searchResult)
            .invoke('text')
            .then(text => {
                expect(keys.includes(text.trim().toLowerCase()))
            })
        //#endregion
        //#region click to next page hyperlink
        cy.get('body').then(body => {
            if (body.find('> * ' + googleLocators.nextHyperlink)) {
                cy.get(googleLocators.nextHyperlink).click({ force: true })
                cy.wait(2000)
            } else {
                nextPage = false
            }
        })
        //#endregion
        curPage++
    }
})
