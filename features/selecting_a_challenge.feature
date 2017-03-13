Feature: Selecting a code challenge
  Scenario: Selecting a code challenge
    When I select a challenge from the challenge list
    Then the selected challenge's name and description are displayed
