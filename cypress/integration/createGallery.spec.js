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
    loginPage.login("dbzman25@gmail.com", "sifra123");
    navigation.clickCreateGalleryBtn();
    navigation.loginButton.should("not.exist");
    cy.url().should("include", "/create");
  });

  it.only(" walid data from phaker with two char as title", () => {
    galleryPage.createGallery("01", "opis", phaker.image.avatar());
    cy.url().should("include", "/");
    galleryPage.pageTitle.should("have.text", "All Galleries");
    galleryPage.authorName.should("include.text", "Dbz Man"); // EUREKAAAAAAAAAAAAAAAAAAAAA
    galleryPage.galleryName.should("include.text", "01");
    navigation.logoutBtn.should("exist");
  });

  it("create gallery with one char as a title", () => {
    galleryPage.createGallery("a", "opis", phaker.image.avatar());
  });

  it("create gall with one num as desc", () => {
    galleryPage.createGallery("02", "2", phaker.image.avatar());
  });

  it("create gall with spec char as desc", () => {
    galleryPage.createGallery("02", "#", phaker.image.avatar());
  });
  it("create gallery without title using space", () => {
    galleryPage.createGallery(" ", "123", phaker.image.avatar());
  });

  it("create gallery without description using space", () => {
    galleryPage.createGallery("123", " ", phaker.image.avatar());
  });

  it("create gall with all empty fields using only space", () => {
    galleryPage.createGallery(" ", " ", " ");
  });

  it("create gall with cirilic as a title", () => {
    galleryPage.createGallery("дфддфдклсф", "opis", phaker.image.avatar());
  });

  it("create gall with cirilic as a desc", () => {
    galleryPage.createGallery("naslov", "фддфд", phaker.image.avatar());
  });
  it("create gall with wrong image format", () => {
    galleryPage.createGallery("naslov", "opis", phaker.image.image());
  });

  it("create gall with two word as title", () => {
    galleryPage.createGallery("naslov jedan", "opis", phaker.image.avatar());
  });
  it("create gall with two word as desc", () => {
    galleryPage.createGallery("naslov", "opis jedan", phaker.image.avatar());
  });
  it("create gall with three word as title and desc", () => {
    galleryPage.createGallery(
      "naslov jedan dva",
      "opis jedan dva",
      phaker.image.avatar()
    );
  });
});
