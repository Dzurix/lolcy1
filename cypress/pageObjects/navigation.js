class Navigation {
  //geteri

  get loginButton() {
    return cy.get("a[href='/login']");
  }

  get logoutBtn() {
    return cy.get(".ml-auto > :nth-child(3) > .nav-link");
  }
  get registerBtn() {
    return cy.get("a[href='/register']");
  }

  get allGalleriesBtn() {
    return cy.get("li:nth-of-type(1) > .nav-buttons.nav-link");
  }

  get myGalleriesBtn() {
    return cy.get("li:nth-of-type(2) > .nav-buttons.nav-link");
  }
  get createGalleryBtn() {
    return cy.get('a[href="/create"]');
  }
  // seteri

  clickLoginButton() {
    this.loginButton.click();
  }

  clickLogoutButton() {
    this.logoutBtn.click();
  }

  clickRegisterButton() {
    this.registerBtn.click();
  }
  clickAllGalleriesBtn() {
    this.allGalleriesBtn.click();
  }
  clickMyGalleriesBtn() {
    this.myGalleriesBtn.click();
  }
  clickCreateGalleryBtn() {
    this.createGalleryBtn.click();
  }
}

export const navigation = new Navigation();
