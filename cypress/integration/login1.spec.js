"use strict";

import { navigation } from "../pageObjects/navigation.js";
import { loginPage } from "../pageObjects/loginPage.js";

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
  beforeEach(() => {
    cy.visit("");
    cy.url().should("include", "gallery-app");
    navigation.clickLoginButton();
    cy.url().should("include", "/login");
    loginPage.loginTitle.should("be.visible");
    loginPage.loginTitle.should("have.text", "Please login");
  });

  it("negative case login / bad email", () => {
    loginPage.login("hahhah@", "sifra123");
  });

  it("negative case login / bad password", () => {
    loginPage.login("andrija124@gmail.com", "lololo");
  });

  it("negative case bad credentials", () => {
    loginPage.login("132135@gds.com", "dgfdsrd");
    loginPage.errorAlert.should("be.visible");
    loginPage.errorAlert.should("have.text", "Bad Credentials");
    loginPage.errorAlert.should(
      "have.css",
      "background-color",
      "rgb(248, 215, 218)"
    );
  });

  it.only("login with walid credentials", () => {
    cy.intercept(
      // intercept
      "POST",
      "https://gallery-api.vivifyideas.com/api/auth/login",
      (req) => {}
    ).as("validLogin"); //alias
    loginPage.login("andrija124@gmail.com", "sifra123");
    navigation.loginButton.should("not.exist");
    cy.wait("@validLogin").then((request) => {
      //cy.log(JSON.stringify(request.resposen.statusCode)); // nacin kako da hvatam neke podatke iz responska preko JSON (request.resposen. i onda dopisemo sta nam treba)
      expect(request.response.statusCode).to.eql(200); // asertacija
    });
  });

  //   it("login with valid credentials", () => {
  //     cy.get(locators.login.emailInput).type(phaker.internet.email());
  //     cy.get(locators.login.passwordInput).type(phaker.internet.password());
  //     cy.get(locators.login.submitBtn).click();
  //   });
});

// LOGOUT

// describe("logout from account", () => {
//   it("logout", () => {
//     cy.wait(2000);
//     cy.get(locators.header.logoutBtn).eq(2).click();
//   });
// });
