"use strict";
/// <reference types="Cypress" />
//ako hocemo da nam cypress daje predloge
import { navigation } from "../pageObjects/navigation.js";
import { loginPage } from "../pageObjects/loginPage.js";
import { galleryPage } from "../pageObjects/galleryPage";
import { registerPage } from "../pageObjects/registerPage";

const phaker = require("phaker");

let galleryId = 5022;
let savedToken;
let userId;

describe("delete gallery", () => {
  before(() => {
    //interceptovanje
    cy.intercept(
      "POST",
      "https://gallery-api.vivifyideas.com/api/auth/login"
    ).as("sucessfullLogin");
    cy.visit("/");
    navigation.clickLoginButton();
    loginPage.login("dbzman25@gmail.com", "sifra123");
    cy.wait("@sucessfullLogin").then((interception) => {
      console.log("evo ga interception logina", interception);

      savedToken = interception.response.body.access_token; //cuvamo token u gore definisanu promenljivu
      userId = interception.response.body.user_id; //cuvamo usera u gore definisanu promenljivu
    });
  });

  it("Get gallery through backend", () => {
    cy.request({
      method: "GET",
      url: "https://gallery-api.vivifyideas.com/api/galleries/" + galleryId,
    })
      .its("body")
      .then((responseBody) => {
        expect(responseBody.id).to.equal(galleryId);
      });
  });
});
