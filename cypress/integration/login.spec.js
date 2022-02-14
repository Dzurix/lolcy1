"use strict";

const locators = require("../fixtures/locators.json");
const phaker = require("phaker");
// REGISTER

// describe("registering ", () => {
//   it("visit gallery app", () => {
//     cy.visit("");
//   });

//   it("click Register button", () => {
//     cy.get(locators.header.registerBtn).click();
//   });

//   it("registering first time", () => {
//     cy.get(locators.register.firstName).type("Andrija");
//     cy.get(locators.register.lastName).type("QA");
//     cy.get(locators.register.emailReg).type("andrija124@gmail.com");
//     cy.get(locators.register.passwordReg).type("sifra123");
//     cy.get(locators.register.confirmedPass).type("sifra123");
//     cy.get(locators.register.acceptedTerms).click();
//     cy.get(locators.register.submitBtn).click();
//   });
// });

// LOGIN

describe("login case", () => {
  it("visit gallery app", () => {
    cy.visit("");
  });

  it("click login button", () => {
    cy.get(locators.header.loginBtn).click();
  });

  it("login with valid credentials", () => {
    cy.get(locators.login.emailInput).type(phaker.internet.email());
    cy.get(locators.login.passwordInput).type(phaker.internet.password());
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