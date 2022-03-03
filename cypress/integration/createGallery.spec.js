"use strict";
/// <reference types="Cypress" />
//ako hocemo da nam cypress daje predloge
import { navigation } from "../pageObjects/navigation.js";
import { loginPage } from "../pageObjects/loginPage.js";
import { galleryPage } from "../pageObjects/galleryPage";
import { registerPage } from "../pageObjects/registerPage";
//import { it } from "phaker/lib/locales";
//import { it } from "phaker/lib/locales";
const phaker = require("phaker");

// import { it } from "phaker/lib/locales";   ovo automatski dodaje, ne znam zasto, mozda ovako resim ako ga izolujem

describe("create gallery spec", () => {
  beforeEach(() => {
    cy.visit("");
    cy.url().should("include", "gallery-app");
    navigation.clickLoginButton();
    cy.url().should("include", "/login");
    cy.loginTroughBackend("dbzman25@gmail.com", "sifra123");
    navigation.clickCreateGalleryBtn();
    navigation.loginButton.should("not.exist");
    cy.url().should("include", "/create");
    galleryPage.pageTitle.should("have.text", "Create Gallery");
  });

  it(" walid data from phaker with two char as title", () => {
    galleryPage.createGallery("01", "opis", phaker.image.avatar());
    cy.url().should("include", "/");
    galleryPage.pageTitle.should("have.text", "All Galleries");
    galleryPage.authorName.should("include.text", "Dbz Man"); // EUREKAAAAAAAAAAAAAAAAAAAAA
    galleryPage.galleryName.should("include.text", "01");
    navigation.logoutBtn.should("exist");
  });

  it("create gallery with one char as a title", () => {
    galleryPage.createGallery("a", "opis", phaker.image.avatar());
    loginPage.errorAlert
      .should("be.visible")
      .and("have.text", "The title must be at least 2 characters.")
      .and("have.css", "background-color", "rgb(248, 215, 218)");
  });

  it("create gallery without title using space", () => {
    galleryPage.createGallery(" ", "123", phaker.image.avatar());
    loginPage.errorAlert
      .should("be.visible")
      .and("have.text", "The title field is required.")
      .and("have.css", "background-color", "rgb(248, 215, 218)");
  });

  it("create gall with all empty fields using only space", () => {
    galleryPage.createGallery(" ", " ", phaker.image.avatar());
    loginPage.errorAlert
      .should("be.visible")
      .and("have.text", "The title field is required.")
      .and("have.css", "background-color", "rgb(248, 215, 218)");
  });

  it("create gall with wrong image format", () => {
    galleryPage.createGallery("naslov", "opis", phaker.image.image());
    loginPage.errorAlert
      .should("be.visible")
      .and("have.text", "Wrong format of image")
      .and("have.css", "background-color", "rgb(248, 215, 218)");
  });

  it("create maximum num of char +1 as a title", () => {
    galleryPage.createGallery(
      "foKyfIzYMmDNnNRRXbKJzTqZynpzacIFqGNBaMToPbJSJvsalVIAxvqUeKHyYlgPqMxUdvaedOTzCjBqZuboQfnKzQjxkgyoazZhDihZUWxtRIXrdipkJvbXVeHyhhMgQiZFSGlpjnzIJZbvBqmaxBCEVgddZrgiyjIcnrqhmQpFYdqAevqtuCSjBGreOmOEInNLTQPQKockosgQyesCouesAatmqFQPfvuHdNFByTCOyoPwExhEDCPySYZuixUu",
      "opis",
      phaker.image.avatar()
    );
    loginPage.errorAlert
      .should("be.visible")
      .and("have.text", "The title may not be greater than 255 characters.")
      .and("have.css", "background-color", "rgb(248, 215, 218)");
  });

  // it("create maximum num of char +1 as a desc", () => {                 // ovo je mozda bug, moze 300 char u opis
  //   galleryPage.createGallery(
  //     "naslov",
  //     "UVJZEzFYoncTPMDYNkEtWOrcHiYUmmhAesqjFcyAzmynVYYhGNNdrbHdXDKvjpcWaWAnttGraNsLrtnZckTVtWeOklmulXRvAVptXLhIuUkEWvKPwLonFFsZoIIPsHkfpRuAsrvThkNgEVKRCnKGqlaEceegbkRUkKvboFccdWoappFiczwUcJDYaIdMvWmCqNTdhmwbLKNxKbSRrDtPETdxVwEqnUjsHofMfAbFzIHoJqsQKoJESJVneoNflwjRpBysQTnDVClUbPjfBtZcvqRMFwTXgGjvOKyBoLTuFYys",
  //     phaker.image.avatar()
  //   );
  //   loginPage.errorAlert
  //     .should("be.visible")
  //     .and("have.text", "The title may not be greater than 255 characters.")
  //     .and("have.css", "background-color", "rgb(248, 215, 218)");
  // });

  // it("create gall with cirilic as a title", () => {                                 // ovo kreira bez problema
  //   galleryPage.createGallery("дфддфдклсф", "opis", phaker.image.avatar());
  // });

  // it("create gall with cirilic as a desc", () => {
  //   galleryPage.createGallery("naslov", "фддфд", phaker.image.avatar());            // ovo kreira bez problema
  // });

  // it("create gall with two word as title", () => {                                  // ovo kreira bez problema
  //   galleryPage.createGallery("naslov jedan", "opis", phaker.image.avatar());
  // });

  // it("create gall with two word as desc", () => {                                  // ovo kreira bez problema
  //   galleryPage.createGallery("naslov", "opis jedan", phaker.image.avatar());
  // });

  // it("create gall with three word as title and desc", () => {                 // ovo kreira bez problema
  //   galleryPage.createGallery(
  //     "naslov jedan dva",
  //     "opis jedan dva",
  //     phaker.image.avatar()
  //   );
  // });
});
