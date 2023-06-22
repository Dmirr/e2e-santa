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
beforeEach(() => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
});

describe("user can create a box and run it", () => {
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  let maxAmount = 50;
  let currency = "Евро";
  let inviteLink;

  it("user logins and create a box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.contains("Создать коробку").click();
    cy.get(boxPage.boxNameField).type(newBoxName);
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
    cy.get(generalElements.lotteryButton).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(lotteryPage.lotteryParticipantName).type(users.user1.name);
    cy.get(lotteryPage.lotteryParticipantEmail).type(users.user1.email);
    cy.get(lotteryPage.lotteryParticipantName2).type(users.user2.name);
    cy.get(lotteryPage.lotteryParticipantEmail2).type(users.user2.email);
    cy.get(lotteryPage.lotteryParticipantName3).type(users.user3.name);
    cy.get(lotteryPage.lotteryParticipantEmail3).type(users.user3.email);
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(assertionData.lotteryIsDone)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Жеребьевка проведена!");
      });
    cy.clearCookies();
  });
  it("partisipants login and chek lottery results", () => {
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

  //   after("delete box", () => {
  //     cy.visit("/login");
  //     cy.login(users.userAutor.email, users.userAutor.password);
  //     cy.get(
  //       '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item > .header-item__text > .txt--med'
  //     ).click();
  //     cy.get(":nth-child(1) > a.base--clickable > .user-card").first().click();
  //     cy.get(
  //       ".layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__right-item > .toggle-menu-wrapper > .toggle-menu-button > .toggle-menu-button--inner"
  //     ).click();
  //     cy.contains("Архивация и удаление").click({ force: true });
  //     cy.get(":nth-child(2) > .form-page-group__main > .frm-wrapper > .frm").type(
  //       "Удалить коробку"
  //     );
  //     cy.get(".btn-service").click();
  //   });
});
