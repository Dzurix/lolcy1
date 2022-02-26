"use strict";
/// <reference types="Cypress" />
//ako hocemo da nam cypress daje predloge
import { navigation } from "../pageObjects/navigation.js";
import { loginPage } from "../pageObjects/loginPage.js";
import { galleryPage } from "../pageObjects/galleryPage";
import { registerPage } from "../pageObjects/registerPage";

const phaker = require("phaker");

let galleryId;

describe("vezbanje intercepta", () => {
  beforeEach(() => {
    cy.visit("");

    cy.url().should("include", "gallery-app");
    navigation.clickLoginButton();
    cy.url().should("include", "/login");
    cy.loginTroughBackend("validLoginEmail", "validLoginPassword");
  });

  //   it("Intercept request", () => {             //interceptovanje
  //     cy.intercept(
  //       "POST",
  //       "https://gallery-api.vivifyideas.com/api/auth/login"
  //     ).as("sucessfullLogin");
  //     cy.visit("");
  //     navigation.clickLoginButton();
  //     loginPage.login("dbzman25@gmail.com", "sifra123");
  //     cy.wait("@sucessfullLogin").then((interception) => {
  //       console.log("evo ga interception", interception);
  //     });
  //   });

  it("Izvlacenje vrednosti prilikom kreiranja galerije", () => {
    cy.intercept(
      "POST",
      "https://gallery-api.vivifyideas.com/api/galleries"
    ).as("createGallery");
    cy.visit("");
    navigation.clickCreateGalleryBtn();
    galleryPage.createGallery(
      phaker.name.firstName(),
      phaker.lorem.words(),
      phaker.image.avatar()
    );
    cy.wait("@createGallery").then((interception) => {
      // console.log("EVO GA interception", interception); // nacin kako da dobijem response i gde da nadjem ID galerije

      galleryId = interception.response.body.id;
      cy.log(galleryId);
    });

    it("Posetiti novokreiranu galeriju", () => {
      cy.visit("/galleries/${galleryId}");
    });

    it("Obrisati novokreiranu galeriju", () => {
      cy.intercept(
        "DELETE",
        "https://gallery-api.vivifyideas.com/api/galleries"
      ).as("DeleteGallery");

      DeleteGallery(galleryId);
    });
  });
});
