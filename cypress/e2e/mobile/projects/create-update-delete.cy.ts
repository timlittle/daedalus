describe("Projects", () => {

  after(()=>{
    cy.task('purgeTestData')
  })

  beforeEach(() => {
    // Login
    cy.viewport('iphone-6')
    cy.login()
    cy.visit('/')
    cy.get('[data-cy="header-title"]').contains("Welcome to Daedalus");

    // Go to projects page
    cy.get('[data-cy="navbar-menu"]').click()
    cy.get('[data-cy="menuitem-projects"]').first().click()
    cy.url().should("include", "/projects");
  });

  it("should add a test project, edit it and delete it", () => {
    // Create a project
    cy.get('[data-cy="new-project-card"]').click();
    cy.get('[data-cy="modal-new project"]').should("have.class", "opacity-100");
    cy.get('[data-cy="input-title"]').type("Test project");
    cy.get('[data-cy="input-description"]').type("Test project description");
    cy.get('[data-cy="button-create"]').click();

    // Update the project
    cy.get('[data-cy="project-menu-dots"]').first().click();
    cy.get('[data-cy="card-menu-edit"]').click();
    cy.get('[data-cy="modal-new project"]').should("have.class", "opacity-100");
    cy.get('[data-cy="input-title"]').clear()
    cy.get('[data-cy="input-description"]').clear()
    cy.get('[data-cy="input-title"]').type("Delete project");
    cy.get('[data-cy="input-description"]').type("Delete");
    cy.get('[data-cy="button-update"]').click();
    cy.get('[data-cy="project-card-delete project-title"]').contains("Delete project");
    cy.get('[data-cy="project-card-delete project-description"]').contains("Delete");

    // Delete the project
    cy.get('[data-cy="project-menu-dots"]').first().click();
    cy.get('[data-cy="card-menu-delete"]').click();
  });

});
