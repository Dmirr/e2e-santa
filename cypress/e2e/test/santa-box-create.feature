Feature:user can create a box and start lottery
Scenario: user logins and create a box
Given user is on secret santa login page
When user logs in  
Given  user is on dashboard page and create box

Scenario: User add participants
Given add participants
Then approve as user1
Then approve as user2
Then approve as user3

Scenario: User logins and starts lottery
Given user is on secret santa login page
When user logs in with table
        | login              | password |
        | testdmirr@gmail.com | test2077 |
Then User starts lottery
Scenario: Participants check results
Given participants login and cheсk lottery results
Scenario: delete box
Then delete box





