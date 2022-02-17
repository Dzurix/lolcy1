class RegisterPage {
  //geteri

  get firstName() {
    return cy.get("#first-name");
  }
  get lastName() {
    return cy.get("#last-name");
  }

  get emailReg() {
    return cy.get("#email");
  }

  get passwordReg() {
    return cy.get("#password");
  }

  get confirmedPass() {
    return cy.get("#password-confirmation");
  }

  get acceptedTerms() {
    return cy.get(".form-check-input");
  }

  get submitBtn() {
    return cy.get(".btn");
  }

  // funckija

  register(firstName, lastName, email, passwordReg, confirmedPass) {
    this.firstName.type(firstName);
    this.lastName.type(lastName);
    this.emailReg.type(email);
    this.passwordReg.type(passwordReg);
    this.confirmedPass.type(confirmedPass);
    this.acceptedTerms.click();
    this.submitBtn.click();
  }

  registerWithoutTerms(firstName, lastName, email, passwordReg, confirmedPass) {
    this.firstName.type(firstName);
    this.lastName.type(lastName);
    this.emailReg.type(email);
    this.passwordReg.type(passwordReg);
    this.confirmedPass.type(confirmedPass);
    this.submitBtn.click();
  }
}
// exportovanje

export const registerPage = new RegisterPage();
