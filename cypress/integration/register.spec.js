"use strict";

import { navigation } from "../pageObjects/navigation";
import { loginPage } from "../pageObjects/loginPage";
//import { it } from "phaker/lib/locales";    ovo automatski dodaje, ne znam zasto, mozda ovako resim ako ga izolujem
import { registerPage } from "../pageObjects/registerPage";
const locators = require("../fixtures/locators.json");
const phaker = require("phaker");

let randomUser = {
  userEmail: phaker.internet.email(),
  userPassword: phaker.internet.password(),
  userFirstName: phaker.name.firstName(),
  userLastName: phaker.name.lastName(),
};

// REGISTER

describe("registering ", () => {
  beforeEach(() => {
    cy.visit("");
    cy.get(locators.header.registerBtn).click();
  });

  //negative registration

  // using POM
  it("registering without '@' in email", () => {
    registerPage.register(
      "Andrija",
      "QA",
      "andrija124gmail.com",
      "sifra123",
      "sifra 123"
    );
  });

  // it.only("registering using phaker", () => {
  //   registerPage.register(
  //     "Andrija",
  //     "QA",
  //     randomUser.userEmail,
  //     randomUser.userPassword,
  //     randomUser.userPassword
  //   );
  // });

  //  using locators

  //   it("registering without '@' in email", () => {
  //     cy.get(locators.register.firstName).type("Andrija");
  //     cy.get(locators.register.lastName).type("QA");
  //     cy.get(locators.register.emailReg).type("andrija124gmail.com");
  //     cy.get(locators.register.passwordReg).type("sifra123");
  //     cy.get(locators.register.confirmedPass).type("sifra123");
  //     cy.get(locators.register.acceptedTerms).click();
  //     cy.get(locators.register.submitBtn).click();
  //   });

  it("registering withot text after '@'", () => {
    registerPage.register(
      "Andrija",
      "QA",
      "andrija124@",
      "sifra123",
      "sifra123"
    );
  });

  it("registering without '.' in email", () => {
    registerPage.register(
      "Andrija",
      "QA",
      "andrija124@gmailcom",
      "sifra123",
      "sifra123"
    );
  });

  it("registering with one ' ' space character in pass", () => {
    registerPage.register("Andrija", "QA", "andrija124@gmailcom", " ", " ");
  });

  it("registering with one character in pass", () => {
    registerPage.register("Andrija", "QA", "andrija124@gmailcom", "1", "1");
  });

  it("registering with four character in pass", () => {
    registerPage.register(
      "Andrija",
      "QA",
      "andrija124@gmailcom",
      "1abc",
      "1abc"
    );
  });

  it("registering with seven character in pass", () => {
    registerPage.register(
      "Andrija",
      "QA",
      "andrija124@gmailcom",
      "1234567",
      "1234567"
    );
  });

  it("registering with nine character in pass", () => {
    registerPage.register(
      "Andrija",
      "QA",
      "andrija124@gmailcom",
      "1234567ab",
      "1234567ab"
    );
  });

  it("registering with diferent passwords", () => {
    registerPage.register(
      "Andrija",
      "QA",
      "andrija124@gmailcom",
      "1234567ab",
      "1234567ac"
    );
  });

  it("registering without clicking on 'Accept terms'", () => {
    registerPage.registerWithoutTerms(
      "Andrija",
      "QA",
      "andrija124@gmailcom",
      "1234567ab",
      "1234567ac"
    );
  });

  //positive registration using locators

  it("registering first time", () => {
    cy.get(locators.register.firstName).type("Andrija");
    cy.get(locators.register.lastName).type("QA");
    cy.get(locators.register.emailReg).type("andrija124@gmail.com");
    cy.get(locators.register.passwordReg).type("sifra123");
    cy.get(locators.register.confirmedPass).type("sifra123");
    cy.get(locators.register.acceptedTerms).click();
    cy.get(locators.register.submitBtn).click();
  });
});
