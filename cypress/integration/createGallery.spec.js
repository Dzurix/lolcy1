"use strict";

import { navigation } from "../pageObjects/navigation.js";
import { loginPage } from "../pageObjects/loginPage.js";

describe("create gallery spec", () => {
  before(() => {
    cy.loginTroughBackend("andrija124@gmail.com", "sifra123");
  });

  it("visit default url", () => {
    cy.visit("");
    navigation.loginButton.should("not.exist");
  });
});
