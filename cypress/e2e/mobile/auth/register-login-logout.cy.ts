describe("Homepage", () => {
  after(() => {
    // Reset the user state in the database
    cy.task("deleteRegisterUser");
  });
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.visit("/");
  });
  it("should allow registration", () => {
    // Register a new user
    cy.get('[data-cy="navbar-menu"]').click();
    cy.get('[data-cy="menuitem-register"]').click();
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
    cy.get('[data-cy="header-title"]').contains("Welcome to Daedalus");
  });
  it("should logout", () => {
    // Login with the cached session
    cy.login();
    cy.visit("/");

    // Logout
    cy.get('[data-cy="navbar-menu"]').click();
    cy.get('[data-cy="menuitem-logout"]').first().click();

    // Confirm the user is logged out
    cy.get('[data-cy="header-title"]').contains("Daedalus");
    cy.get('[data-cy="header-subtitle"]').contains("A collaborative documentation as code platform");
  });
});
