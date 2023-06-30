import { Given } from "@badeball/cypress-cucumber-preprocessor";
const boxPage = require("../../fixtures/pages/boxPage.json");
const generalElements = require("../../fixtures/pages/general.json");
const assertionData = require("../../fixtures/pages/assertionsData.json");
const dashboardPage = require("../../fixtures/pages/dashboardPage.json");
import { faker } from "@faker-js/faker";
let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
let maxAmount = 50;
let currency = "Евро";
let boxKey;

Given("user is on dashboard page and create box", function () {
  cy.contains("Создать коробку").click();
  cy.get(boxPage.boxNameField).type(newBoxName);
  cy.get(boxPage.boxKeyField).then((key) => {
    boxKey = Cypress.$(key).val();
    cy.log(boxKey);
  });
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(boxPage.sixthIcon).click({ force: true });
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(boxPage.giftPriceToggle).check({ force: true });
  cy.get(boxPage.maxAnount).type(maxAmount);
  cy.get(boxPage.currency).select(currency);
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
  cy.get(assertionData.assertionBoxPage)
    .invoke("text")
    .then((text) => {
      expect(text).to.include("Участники");
      expect(text).to.include("Моя карточка");
      expect(text).to.include("Подопечный");
    });
});
