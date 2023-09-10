describe("Sharing", () => {
  afterEach(() => {
    // Reset the user state
    cy.task("deleteRegisterUser");
  });

  beforeEach(() => {
    // Setup the view port and go to the index page
    cy.viewport("iphone-6");
    cy.visit("/");

    // Sign up as the registration user
    cy.get('[data-cy="navbar-menu"]').click();
    cy.get('[data-cy="menuitem-register"]').click();
    cy.get('[data-cy="modal-register"]').should("have.class", "opacity-100");
    cy.get('[data-cy="input-email"]').type("test.register.user@test.com");
    cy.get('[data-cy="input-name"]').type("Test user");
    cy.get('[data-cy="input-password"]').type("123456789!");
    cy.get('[data-cy="button-continue"]').click();
    cy.get('[data-cy="modal-login"]').should("have.class", "opacity-100");

    // Log in as the registration user
    cy.get('[data-cy="input-email"]').type("test.register.user@test.com");
    cy.get('[data-cy="input-password"]').type("123456789!");
    cy.get('[data-cy="button-continue"]').click();

    // Wait for login
    cy.wait(500);

    // Go to the projects page
    cy.get('[data-cy="navbar-menu"]').click();
    cy.get('[data-cy="menuitem-projects"]').first().click();

    // Create a test project
    cy.get('[data-cy="new-project-card"]').click();
    cy.get('[data-cy="modal-new project"]').should("have.class", "opacity-100");
    cy.get('[data-cy="input-title"]').type("Test project");
    cy.get('[data-cy="input-description"]').type("Test project description");
    cy.get('[data-cy="button-create"]').click();

    // Go into the new project
    cy.get('[data-cy="project-card-test project-title"]').click();

    // Create a document in the new project
    cy.get('[data-cy="new-document-card"]').click();
    cy.get('[data-cy="modal-new document"]').should("have.class", "opacity-100");
    cy.get('[data-cy="input-title"]').type("Test Document");
    cy.get('[data-cy="input-description"]').type("Test document description");
    cy.get('[data-cy="button-create"]').click();

    // Go into the new document
    cy.get('[data-cy="document-card-test document-title"]').click();
  });
  it("should share document", () => {
    // Wait for the editor to load
    cy.wait(1000);

    // Open the sharing model and share it with the test user
    cy.get('[data-cy="navbar-menu"]').click();
    cy.get('[data-cy="menuitem-share"]').click();
    cy.get('[data-cy="modal-share"]').should("have.class", "opacity-100");
    cy.get('[data-cy="share-select"]').select("64fb68f7708508e67ed294bc");
    cy.get('[data-cy="button-share"]').click();

    // Sign out
    cy.get('[data-cy="navbar-menu"]').click();
    cy.get('[data-cy="menuitem-logout"]').click();

    // Sign in as the test user
    cy.visit("/");
    cy.get('[data-cy="navbar-menu"]').click();
    cy.get('[data-cy="menuitem-sign-in"]').first().click();
    cy.get('[data-cy="input-email"]').type("test.user@test.com");
    cy.get('[data-cy="input-password"]').type("123456789!");
    cy.get('[data-cy="button-continue"]').click();

    // Wait for login
    cy.wait(500);

    // Go to the shared documents views
    cy.get('[data-cy="navbar-menu"]').click();
    cy.get('[data-cy="menuitem-shared-documents"]').first().click();

    // Confirm the document is shared
    cy.get('[data-cy="document-card-test document-title"]').contains("Test Document");
    cy.get('[data-cy="document-card-test document-title"]').click();

    // Confirm permissions
    cy.get('[data-cy="navbar-badge"]').contains("Test project");
    cy.get('[data-cy="navbar-title"]').contains("Test Document");
  });
});
