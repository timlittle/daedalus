describe("Sharing", () => {
  afterEach(() => {
    // Reset the state after the test
    cy.task("deleteRegisterUser");
  });

  beforeEach(() => {
    cy.visit("/");

    // Register as a new user
    cy.get('[data-cy="splash-register"]').click();
    cy.get('[data-cy="modal-register"]').should("have.class", "opacity-100");
    cy.get('[data-cy="input-email"]').type("test.register.user@test.com");
    cy.get('[data-cy="input-name"]').type("Test user");
    cy.get('[data-cy="input-password"]').type("123456789!");
    cy.get('[data-cy="button-continue"]').click();
    cy.get('[data-cy="modal-login"]').should("have.class", "opacity-100");

    // Login as the new user
    cy.get('[data-cy="input-email"]').type("test.register.user@test.com");
    cy.get('[data-cy="input-password"]').type("123456789!");
    cy.get('[data-cy="button-continue"]').click();

    // Got to the projects page
    cy.get('[data-cy="sidebar-button-project"]').click();

    // Create a new project
    cy.get('[data-cy="new-project-card"]').click();
    cy.get('[data-cy="modal-new project"]').should("have.class", "opacity-100");
    cy.get('[data-cy="input-title"]').type("Test project");
    cy.get('[data-cy="input-description"]').type("Test project description");
    cy.get('[data-cy="button-create"]').click();

    // Open the project
    cy.get('[data-cy="project-card-test project-title"]').click();

    // Create a new document
    cy.get('[data-cy="new-document-card"]').click();
    cy.get('[data-cy="modal-new document"]').should("have.class", "opacity-100");
    cy.get('[data-cy="input-title"]').type("Test Document");
    cy.get('[data-cy="input-description"]').type("Test document description");
    cy.get('[data-cy="button-create"]').click();

    // Open the new document
    cy.get('[data-cy="document-card-test document-title"]').click();
  });
  it("should share document", () => {
    // Wait for the editor to load
    cy.wait(1000);

    // Open the share modal and share with the Test User
    cy.get('[data-cy="navbar-menu"]').click();
    cy.get('[data-cy="menuitem-share"]').click();
    cy.get('[data-cy="modal-share"]').should("have.class", "opacity-100");
    cy.get('[data-cy="share-select"]').select("64fb68f7708508e67ed294bc");
    cy.get('[data-cy="button-share"]').click();

    // Logout as the new user
    cy.get('[data-cy="navbar-menu"]').click();
    cy.get('[data-cy="menuitem-logout"]').click();

    // Login as the Test User
    cy.visit("/");
    cy.get('[data-cy="splash-login"]').click();
    cy.get('[data-cy="input-email"]').type("test.user@test.com");
    cy.get('[data-cy="input-password"]').type("123456789!");
    cy.get('[data-cy="button-continue"]').click();

    // Go to the shared documents
    cy.get('[data-cy="sidebar-button-shared-documents"]').click();
    cy.get('[data-cy="document-card-test document-title"]').contains("Test Document");
    // Confirm the document is shared

    // Open the document
    cy.get('[data-cy="document-card-test document-title"]').click();

    // Confirmt hthe user has permission
    cy.get('[data-cy="navbar-badge"]').contains("Test project");
    cy.get('[data-cy="navbar-title"]').contains("Test Document");
  });
});
