"use strict";

import { navigation } from "../pageObjects/navigation";
import { loginPage } from "../pageObjects/loginPage";
//import { it } from "phaker/lib/locales";    ovo automatski dodaje, ne znam zasto, mozda ovako resim ako ga izolujem
import { registerPage } from "../pageObjects/registerPage";
const locators = require("../fixtures/locators.json");
const phaker = require("phaker");

let randomUser = {
  userFirstName: phaker.name.firstName(),
  userLastName: phaker.name.lastName(),
  userEmail: phaker.internet.email(),
  userPassword: phaker.internet.password(),
  userPassword: phaker.internet.password(),
};

// REGISTER

describe("registering ", () => {
  beforeEach(() => {
    cy.visit("");
    navigation.clickRegisterButton();
    cy.url().should("include", "/register");
    cy.url().should("include", "gallery-app");
    loginPage.loginTitle.should("be.visible");
    loginPage.loginTitle.should("have.text", "Register");
    loginPage.loginTitle.should("have.css", "font-size", "45px");
    loginPage.loginTitle.should("have.css", "color", "rgb(72, 73, 75)");
    loginPage.loginTitle.should("have.css", "font-weight", "900");
  });

  //negative registration

  // using POM
  it("registering without '@' in email", () => {
    registerPage.register(
      "Andrija",
      "QA",
      "andrija124gmail.com",
      "sifra123",
      "sifra123"
    );
    navigation.loginButton.should("exist");
    navigation.registerBtn.should("exist");
    navigation.logoutBtn.should("not.exist");
    cy.url().should("include", "/register");
    cy.url().should("include", "gallery-app");
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
    navigation.loginButton.should("exist");
    navigation.registerBtn.should("exist");
    navigation.logoutBtn.should("not.exist");
    cy.url().should("include", "/register");
    cy.url().should("include", "gallery-app");
  });

  it("registering without '.' in email", () => {
    registerPage.register(
      "Andrija",
      "QA",
      "andrija124@gmailcom",
      "sifra123",
      "sifra123"
    );
    loginPage.errorAlert.should("be.visible");
    loginPage.errorAlert.should(
      "have.text",
      "The email must be a valid email address."
    );
    loginPage.errorAlert.should(
      "have.css",
      "background-color",
      "rgb(248, 215, 218)"
    );
  });

  it("registering with one ' ' space character in pass", () => {
    registerPage.register("Andrija", "QA", "andrija126@gmail.com", " ", " ");
    loginPage.errorAlert.should("be.visible");
    loginPage.errorAlert.should("have.text", "The password field is required.");
    loginPage.errorAlert.should(
      "have.css",
      "border-color",
      "rgb(245, 198, 203)"
    );
  });

  it("registering with one character in pass", () => {
    registerPage.register("Andrija", "QA", "andrija126@gmail.com", "A1", "A1");
    loginPage.errorAlert.should("be.visible");
    loginPage.errorAlert.should(
      "have.text",
      "The password must be at least 8 characters."
    );
    loginPage.errorAlert.should(
      "have.css",
      "border-color",
      "rgb(245, 198, 203)"
    );
  });

  it("registering with four character in pass", () => {
    registerPage.register(
      "Andrija",
      "QA",
      "andrija126@gmail.com",
      "1abc",
      "1abc"
    );
    loginPage.errorAlert.should("be.visible");
    loginPage.errorAlert.should(
      "have.text",
      "The password must be at least 8 characters."
    );
    loginPage.errorAlert.should(
      "have.css",
      "border-color",
      "rgb(245, 198, 203)"
    );
  });

  it("registering with seven character in pass", () => {
    registerPage.register(
      "Andrija",
      "QA",
      "andrija126@gmail.com",
      "1234567",
      "1234567"
    );
    loginPage.errorAlert.should("be.visible");
    loginPage.errorAlert.should(
      "have.text",
      "The password must be at least 8 characters."
    );
    loginPage.errorAlert.should(
      "have.css",
      "border-color",
      "rgb(245, 198, 203)"
    );
  });

  it("registering with exising account", () => {
    registerPage.register(
      "Andrija",
      "QA",
      "andrija124@gmail.com",
      "sifra123",
      "sifra123"
    );
    navigation.loginButton.should("exist");
    navigation.registerBtn.should("exist");
    navigation.logoutBtn.should("not.exist");
    cy.url().should("include", "/register");
    cy.url().should("include", "gallery-app");
    loginPage.errorAlert.should("be.visible");
    loginPage.errorAlert.should(
      "have.text",
      "The email has already been taken."
    );
  });

  it("registering with diferent password existing account", () => {
    registerPage.register(
      "Andrija",
      "QA",
      "andrija124@gmail.com",
      "1234567ab",
      "1234567ac"
    );
    registerPage.emailTaken.should("be.visible");
    loginPage.errorAlert.should("be.visible");
  });

  it("registering with diferent passwords", () => {
    registerPage.register(
      "Andrija",
      "QA",
      "andrija126@gmail.com",
      "12367abcd",
      "1234567ac"
    );
    loginPage.errorAlert.should("be.visible");
    loginPage.errorAlert.should(
      "have.text",
      "The password confirmation does not match."
    );
  });

  it("registering without clicking on 'Accept terms'", () => {
    registerPage.registerWithoutTerms(
      "Andrija",
      "QA",
      "andrija126@gmail.com",
      "1234567ab",
      "1234567ab"
    );
    loginPage.errorAlert.should("be.visible");
    loginPage.errorAlert.should(
      "have.text",
      "The terms and conditions must be accepted."
    );
  });

  //positive registration using locators

  // it("registering first time", () => {
  //   cy.get(locators.register.firstName).type("Andrija");
  //   cy.get(locators.register.lastName).type("QA");
  //   cy.get(locators.register.emailReg).type("andrija124@gmail.com");
  //   cy.get(locators.register.passwordReg).type("sifra123");
  //   cy.get(locators.register.confirmedPass).type("sifra123");
  //   cy.get(locators.register.acceptedTerms).click();
  //   cy.get(locators.register.submitBtn).click();
  // });
});
