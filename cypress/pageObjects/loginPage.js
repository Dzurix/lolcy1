class LoginPage {
  // geteri
  get emailInput() {
    return cy.get("[id='email']");
  }
  get passwordInput() {
    return cy.get("[id='password']");
  }
  get submitBtn() {
    return cy.get("button[type='submit']");
  }

  get errorAlert() {
    return cy.get('p[class="alert alert-danger"]');
  }

  get loginTitle() {
    return cy.get('h1[class="title-style"]');
  }

  // funkcija

  login(email, password) {
    this.emailInput.type(email);
    this.passwordInput.type(password);
    this.submitBtn.click();
  }
}

export const loginPage = new LoginPage(); // exportovanje
