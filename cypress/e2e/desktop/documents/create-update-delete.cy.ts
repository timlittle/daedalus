describe("Documents", () => {
  afterEach(() => {
    cy.task("purgeTestData");
  });

  beforeEach(() => {
    cy.task("seedProject");

    // Login
    cy.login();
    cy.visit("/");
    cy.get('[data-cy="header-title"]').contains("Welcome to Daedalus");

    // Go to projects page
    cy.get('[data-cy="sidebar-button-project"]').click();
    // Open the test project
    cy.get('[data-cy="project-card-test project-title"]').click();
  });

  it("should add a test document, edit it and delete", () => {
    // Create document
    cy.get('[data-cy="new-document-card"]').click();
    cy.get('[data-cy="modal-new document"]').should("have.class", "opacity-100");
    cy.get('[data-cy="input-title"]').type("Test Document");
    cy.get('[data-cy="input-description"]').type("Test document description");
    cy.get('[data-cy="button-create"]').click();

    // Edit
    cy.get('[data-cy="document-menu-dots"]').first().click();
    cy.get('[data-cy="card-menu-edit"]').click();
    cy.get('[data-cy="modal-new document"]').should("have.class", "opacity-100");
    cy.get('[data-cy="input-title"]').clear();
    cy.get('[data-cy="input-description"]').clear();
    cy.get('[data-cy="input-title"]').type("Delete document");
    cy.get('[data-cy="input-description"]').type("Delete");
    cy.get('[data-cy="button-update"]').click();
    cy.get('[data-cy="document-card-delete document-title"]').contains("Delete document");
    cy.get('[data-cy="document-card-delete document-description"]').contains("Delete");

    // Delete
    cy.get('[data-cy="document-menu-dots"]').first().click();
    cy.get('[data-cy="card-menu-delete"]').click();
  });

  it("should display the document in the My Documents section", () => {
    // Create document
    cy.get('[data-cy="new-document-card"]').click();
    cy.get('[data-cy="modal-new document"]').should("have.class", "opacity-100");
    cy.get('[data-cy="input-title"]').type("Test Document");
    cy.get('[data-cy="input-description"]').type("Test document description");
    cy.get('[data-cy="button-create"]').click();

    // Check the My Documents page
    cy.get('[data-cy="sidebar-button-documents"]').click();
    cy.url().should("include", "/documents");
    cy.get('[data-cy="document-card-test document-title"]').contains("Test Document");
    cy.get('[data-cy="document-card-test document-description"]').contains("Test document description");
  });
});
