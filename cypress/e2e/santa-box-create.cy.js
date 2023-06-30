Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
const users = require("../fixtures/users.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
const assertionData = require("../fixtures/pages/assertionsData.json");
const lotteryPage = require("../fixtures/pages/lotteryPage.json");
import { faker } from "@faker-js/faker";

describe("user can create a box and run it", () => {
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  let maxAmount = 50;
  let currency = "Евро";
  let inviteLink;
  let boxKey;
  let loginCookie = {
    Cookie:
      "_ym_uid=16734548431002114789; _ym_d=1673454843; adtech_uid=eb12ecd9-da63-486d-a791-3be86eeeb88b%3Asanta-secret.ru; top100_id=t1.7627570.2108586738.1680379156247; _ohmybid_cmf=1; last_visit=1687454209642%3A%3A1687461409642; t3_sid_7627570=s1.890954796.1687461409640.1687461412636.9.3; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5MTk3NzksImlhdCI6MTY4NzUzNzUxMSwiZXhwIjoxNjkwMTI5NTExfQ.R-nFjxjp8wYtKPgNAO1bfPPaMiyRPpjAPT324BP-4Lw",
  };

  it("user logins and create a box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.contains("Создать коробку").click();
    cy.get(boxPage.boxNameField).type(newBoxName);
    cy.get(boxPage.boxKeyField).then((key) => {
      boxKey = Cypress.$(key).val();
    });
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.sixthIcon).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.giftPriceToggle).check({ force: true });
    cy.get(boxPage.maxAnount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
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

  it("add participants", () => {
    cy.get(generalElements.submitButton).click({ force: true });
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
      });
    cy.clearCookies();
  });
  it("approve as user1", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click({ force: true });
    cy.contains("войдите").click();
    cy.login(users.user1.email, users.user1.password);
    cy.contains("Создать карточку участника").should("exist");
    cy.get(generalElements.submitButton).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeBoxPage.wishesInput).type(wishes);
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
  });

  it("approve as user2", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click({ force: true });
    cy.contains("войдите").click();
    cy.login(users.user2.email, users.user2.password);
    cy.contains("Создать карточку участника").should("exist");
    cy.get(generalElements.submitButton).click();
    cy.get(generalElements.arrowRight).click({ force: true });
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeBoxPage.wishesInput).type(wishes);
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
  });

  it("approve as user3", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click({ force: true });
    cy.contains("войдите").click();
    cy.login(users.user3.email, users.user3.password);
    cy.contains("Создать карточку участника").should("exist");
    cy.get(generalElements.submitButton).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeBoxPage.wishesInput).type(wishes);
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
  });
  it("user logins and starts lottery", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.visit(`/box/${boxKey}`);
    cy.startLottery();
    cy.get(assertionData.lotteryIsDone)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Жеребьевка проведена!");
      });
    cy.clearCookies();
  });

  it("participants login and chek lottery results", () => {
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
  after("delete box", () => {
    cy.request({
      method: "DELETE",
      headers: loginCookie,
      url: `/api/box/${boxKey}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
