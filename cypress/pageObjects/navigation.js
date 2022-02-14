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
}

export const navigation = new Navigation();
