class GalleryPage {
  //geteri

  get titleInput() {
    return cy.get("input[id='title']");
  }

  get descriptionsInput() {
    return cy.get("input[id='description']");
  }

  get imagesUrl() {
    return cy.get("input[placeholder = 'image url']");
  }

  get addImageBtn() {
    return cy.get(".input-group.mb-3 > .form-control");
  }

  get submitBtn() {
    return cy.get("form > button:nth-of-type(1)");
  }

  get cancelBtn() {
    return cy.get("form > button:nth-of-type(2)");
  }

  get arrowUp() {
    return cy.get('i[class="fas fa-chevron-circle-up"]');
  }

  get arrowDown() {
    return cy.get('i[class="fas fa-chevron-circle-down"]');
  }

  get pageTitle() {
    return cy.get('h1[class="title-style"]');
  }
  get authorName() {
    return cy.get("div:nth-of-type(1) > p > .box-title");
  }

  get authorID() {
    return cy.get('href="/authors/2273"');
  }
  get galleryName() {
    return cy.get("h2 > .box-title");
  }

  get cellGallery() {
    return cy.get(".grid > .cell");
  }

  get deleteBtn() {
    return cy.get("#app div:nth-child(5) button");
  }

  // funkcija

  createGallery(title, description, image) {
    this.titleInput.type(title);
    this.descriptionsInput.type(description);
    this.imagesUrl.type(image);
    this.submitBtn.click();
  }

  deleteGallery(author) {
    this.authorName.delete(author);
  }

  //seteri

  clickDeleteBtn() {
    this.deleteBtn.click();
  }
}

export const galleryPage = new GalleryPage();
