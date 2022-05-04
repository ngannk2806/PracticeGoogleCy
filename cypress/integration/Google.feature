Feature: Google Main Page

    I want to open a search engine

    @focus
    Scenario: Opening google page and searching
        Given I open Google page
        Then I see "Google" in the title
        When I input "cypress documentation" on searching box
        Then Search result should contain "cypress documentation"
        And Search result should be "21900000 results"