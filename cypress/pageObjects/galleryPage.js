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

  // funkcija

  createGallery(title, description, image) {
    this.titleInput.type(title);
    this.descriptionsInput.type(description);
    this.imagesUrl.type(image);
    this.submitBtn.click();
  }
}

export const galleryPage = new GalleryPage();
