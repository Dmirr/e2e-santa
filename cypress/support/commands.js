// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const loginPage = require("../fixtures/pages/loginPage.json");
const generalElements = require("../fixtures/pages/general.json");
const lotteryPage = require("../fixtures/pages/lotteryPage.json");
const users = require("../fixtures/users.json");

Cypress.Commands.add("login", (userName, password) => {
  cy.get(loginPage.loginField).type(userName);
  cy.get(loginPage.passwordField).type(password);
  cy.get(generalElements.submitButton).click({ force: true });
});
Cypress.Commands.add("startLottery", () => {
  cy.get(generalElements.lotteryButton).click();
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(lotteryPage.lotteryParticipantName).type(users.user1.name);
  cy.get(lotteryPage.lotteryParticipantEmail).type(users.user1.email);
  cy.get(lotteryPage.lotteryParticipantName2).type(users.user2.name);
  cy.get(lotteryPage.lotteryParticipantEmail2).type(users.user2.email);
  cy.get(lotteryPage.lotteryParticipantName3).type(users.user3.name);
  cy.get(lotteryPage.lotteryParticipantEmail3).type(users.user3.email);
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(generalElements.arrowRight).click({ force: true });
});
