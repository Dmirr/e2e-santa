import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
const users = require("../../fixtures/users.json");
const invitePage = require("../../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../../fixtures/pages/inviteeDashboardPage.json");
const generalElements = require("../../fixtures/pages/general.json");
import { faker } from "@faker-js/faker";
let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
let inviteLink;

Given("add participants", () => {
  cy.get(generalElements.submitButton).click({ force: true });
  cy.get(invitePage.inviteLink)
    .invoke("text")
    .then((link) => {
      inviteLink = link;
    });
  cy.clearCookies();
});

Then("approve as user1", () => {
  cy.visit(inviteLink);
  cy.get(generalElements.submitButton).click({ force: true });
  cy.contains("войдите").click();
  cy.login(users.user1.email, users.user1.password);
  cy.contains("Создать карточку участника").should("exist");
  cy.get(generalElements.submitButton).click();
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(inviteeBoxPage.wishesInput).type(wishes);
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(inviteeDashboardPage.noticeForInvitee)
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
    });
  cy.clearCookies();
});
Then("approve as user2", () => {
  cy.visit(inviteLink);
  cy.get(generalElements.submitButton).click({ force: true });
  cy.contains("войдите").click();
  cy.login(users.user2.email, users.user2.password);
  cy.contains("Создать карточку участника").should("exist");
  cy.get(generalElements.submitButton).click();
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(inviteeBoxPage.wishesInput).type(wishes);
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(inviteeDashboardPage.noticeForInvitee)
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
    });
  cy.clearCookies();
});
Then("approve as user3", () => {
  cy.visit(inviteLink);
  cy.get(generalElements.submitButton).click({ force: true });
  cy.contains("войдите").click();
  cy.login(users.user3.email, users.user3.password);
  cy.contains("Создать карточку участника").should("exist");
  cy.get(generalElements.submitButton).click();
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(inviteeBoxPage.wishesInput).type(wishes);
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(inviteeDashboardPage.noticeForInvitee)
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
    });
  cy.clearCookies();
});
