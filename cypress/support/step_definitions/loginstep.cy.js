import { Given, When } from "@badeball/cypress-cucumber-preprocessor";
const users = require("../../fixtures/users.json");

Given("user is on secret santa login page", function () {
  cy.visit("/login");
});
When("user logs in", function () {
  cy.login(users.userMain.email, users.userMain.password);
});

When("user logs in with table", function (dataTable) {
  cy.login(dataTable.hashes()[0].login, dataTable.hashes()[0].password);
});
