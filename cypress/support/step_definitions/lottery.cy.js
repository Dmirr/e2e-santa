import { After, Given, Then } from "@badeball/cypress-cucumber-preprocessor";
const assertionData = require("../../fixtures/pages/assertionsData.json");
const users = require("../../fixtures/users.json");
const generalElements = require("../../fixtures/pages/general.json");
let boxKey;
let Cookie = generalElements.cookie;
Then("User starts lottery", () => {
  cy.visit(`/box/${boxKey}`);
  cy.startLottery();
  cy.get(assertionData.lotteryIsDone)
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("Жеребьевка проведена!");
    });
  cy.clearCookies();
});
Given("participants login and cheсk lottery results", () => {
  cy.visit("/login");
  cy.login(users.user1.email, users.user1.password);
  cy.get(assertionData.lotteryResultPage).click();
  cy.get(assertionData.lotteryResultMessage)
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("У тебя появился подопечный в коробке");
    });
  cy.clearCookies();
  cy.visit("/login");
  cy.login(users.user2.email, users.user2.password);
  cy.get(assertionData.lotteryResultPage).click();
  cy.get(assertionData.lotteryResultMessage)
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("У тебя появился подопечный в коробке");
    });
  cy.clearCookies();
  cy.visit("/login");
  cy.login(users.user3.email, users.user3.password);
  cy.get(assertionData.lotteryResultPage).click();
  cy.get(assertionData.lotteryResultMessage)
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("У тебя появился подопечный в коробке");
    });
  cy.clearCookies();
});
Then("delete box", () => {
  cy.request({
    method: "DELETE",
    headers: Cookie,
    url: `/api/box/${boxKey}`,
  }).then((response) => {
    expect(response.status).to.equal(200);
  });
});
