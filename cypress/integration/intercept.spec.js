"use strict";
/// <reference types="Cypress" />
//ako hocemo da nam cypress daje predloge
import { navigation } from "../pageObjects/navigation.js";
import { loginPage } from "../pageObjects/loginPage.js";
import { galleryPage } from "../pageObjects/galleryPage";
import { registerPage } from "../pageObjects/registerPage";

const phaker = require("phaker");

let galleryId;
let savedToken;
let userId;

describe("vezbanje intercepta", () => {
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
  it("Izvlacenje vrednosti prilikom kreiranja galerije", () => {
    cy.intercept(
      "POST",
      "https://gallery-api.vivifyideas.com/api/galleries"
    ).as("createdGallery");
    navigation.clickCreateGalleryBtn();
    galleryPage.createGallery(
      phaker.name.firstName(),
      phaker.lorem.words(),
      phaker.image.avatar()
    );
    cy.wait("@createdGallery").then((interception) => {
      console.log("EVO GA interception galerije", interception); // nacin kako da dobijem response i gde da nadjem ID galerije

      galleryId = interception.response.body.id; //cuvamo galleryID u gore definisanu promenljivu
      cy.log(galleryId);
    });
  });
  it("Posetiti novokreiranu galeriju", () => {
    window.localStorage.setItem("token", savedToken); //setujemo token u localstorage
    window.localStorage.setItem("user_id", userId); //setujemo userId u lokalstorage
    cy.visit(`galleries/${galleryId}`); // posecujemo direkno preko url novokreiranu glaeriju
    console.log("EVO posecivanje galerije");
  });

  it("Obrisati novokreiranu galeriju", () => {
    galleryPage.deleteBtn.should("be.visible").click(); //cekamo da bude vidljiv delete button i klikcemo na njega
    console.log("EVO brisanje galerije");
    galleryPage.allGaleriesTitle
      .should("be.visible")
      .and("contain", "All Galleries"); //proveravamo da li smo na home page
  });
});
