"use strict";
/// <reference types="Cypress" />
//ako hocemo da nam cypress daje predloge
import { navigation } from "../pageObjects/navigation.js";
import { loginPage } from "../pageObjects/loginPage.js";
import { galleryPage } from "../pageObjects/galleryPage";
import { registerPage } from "../pageObjects/registerPage";

const phaker = require("phaker");

describe("delete gallery", () => {
  beforeEach(() => {
    cy.visit("");
    cy.url().should("include", "gallery-app");
    navigation.clickLoginButton();
    cy.url().should("include", "/login");
    cy.loginTroughBackend("validLoginEmail", "validLoginPassword");
  });

  //logovanje preko backenda
  it.only(" valid login through backend", () => {
    cy.visit("");
    navigation.loginButton.should("not.exist");
  });
});
