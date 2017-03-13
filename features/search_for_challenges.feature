Feature: Searching for code challenges
  Scenario: Searching without parameters
    When I search for a code challenge without filters
    Then all of the code challenges should be listed

  Scenario: Searching by name
    When I search for a code challenge with a name filter
    Then all of the challenges matching the name should be listed

  Scenario: Searching for easy challenges
    When I search for a code challenge of easy difficulty without a name filter
    Then all coding challenges of easy difficulty should be listed

  Scenario: Searching for medium challenges
    When I search for a code challenge of medium difficulty without a name filter
    Then all coding challenges of medium difficulty should be listed

  Scenario: Searching for hard challenges
    When I search for a code challenge of hard difficulty without a name filter
    Then all coding challenges of hard difficulty should be listed

  Scenario: Searching for medium challenges by name
    When I search for a code challenge of medium difficulty with a name filter
    Then all coding challenges with medium difficulty that match the provided name should be listed
