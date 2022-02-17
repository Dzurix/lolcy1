"use strict";

import { navigation } from "../pageObjects/navigation";
import { loginPage } from "../pageObjects/loginPage";
const locators = require("../fixtures/locators.json");
const phaker = require("phaker");

// LOGIN

describe("login case", () => {
  beforeEach(() => {
    cy.visit("");
    cy.get(locators.header.loginBtn).click();
  });

  it("login with bad credentials", () => {
    cy.get(locators.login.emailInput).type(phaker.internet.email());
    cy.get(locators.login.passwordInput).type(phaker.internet.password());
    cy.get(locators.login.submitBtn).click();
  });

  it("login with wrong password", () => {
    cy.get(locators.login.emailInput).type("andrija124@gmail.com");
    cy.get(locators.login.passwordInput).type("wololo");
    cy.get(locators.login.submitBtn).click();
  });

  it("login with wrong email", () => {
    cy.get(locators.login.emailInput).type("upoje@glisi");
    cy.get(locators.login.passwordInput).type("sifra123");
    cy.get(locators.login.submitBtn).click();
  });

  it("login with space as password", () => {
    cy.get(locators.login.emailInput).type("andrija124@gmail.com");
    cy.get(locators.login.passwordInput).type(" ");
    cy.get(locators.login.submitBtn).click();
  });

  it("login with space as email", () => {
    cy.get(locators.login.emailInput).type(" ");
    cy.get(locators.login.passwordInput).type("sifra123");
    cy.get(locators.login.submitBtn).click();
  });

  it("login with number as a email", () => {
    cy.get(locators.login.emailInput).type("1");
    cy.get(locators.login.passwordInput).type("sifra123");
    cy.get(locators.login.submitBtn).click();
  });

  it("login with number as a password", () => {
    cy.get(locators.login.emailInput).type("andrija124@gmail.com");
    cy.get(locators.login.passwordInput).type("1");
    cy.get(locators.login.submitBtn).click();
  });

  it("login with cirilic", () => {
    cy.get(locators.login.emailInput).type("ћдфддфдклсфј@gmail.com");
    cy.get(locators.login.passwordInput).type("шифра123");
    cy.get(locators.login.submitBtn).click();
  });

  it("login with space ", () => {
    cy.get(locators.login.emailInput).type(" c");
    cy.get(locators.login.passwordInput).type(" ");
    cy.get(locators.login.submitBtn).click();
  });

  it('login without "@"special character', () => {
    cy.get(locators.login.emailInput).type("andrija124gmail.com");
    cy.get(locators.login.passwordInput).type("sifra123");
    cy.get(locators.login.submitBtn).click();
  });

  it('login with special character "#" email', () => {
    cy.get(locators.login.emailInput).type("andrija124#gmail.com");
    cy.get(locators.login.passwordInput).type("sifra123");
    cy.get(locators.login.submitBtn).click();
  });

  it('login with special characher "#" password', () => {
    cy.get(locators.login.emailInput).type("andrija124@gmail.com");
    cy.get(locators.login.passwordInput).type("sifra#123");
    cy.get(locators.login.submitBtn).click();
  });

  it("login with inactive acoount", () => {
    cy.get(locators.login.emailInput).type("andrija123@gmail.com");
    cy.get(locators.login.passwordInput).type("sifra123");
    cy.get(locators.login.submitBtn).click();
  });

  it("login with valid credentials", () => {
    cy.get(locators.login.emailInput).type("andrija124@gmail.com");
    cy.get(locators.login.passwordInput).type("sifra123");
    cy.get(locators.login.submitBtn).click();
  });
});
// LOGOUT

describe("logout from account", () => {
  it("logout", () => {
    cy.wait(2000);
    cy.get(locators.header.logoutBtn).eq(2).click();
  });
});
