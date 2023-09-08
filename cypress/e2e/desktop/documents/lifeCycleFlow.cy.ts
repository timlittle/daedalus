describe("Documents", () => {

    after(()=>{
        cy.task('purgeTestData')
    })

    beforeEach(() => {
      // Login
      cy.visit("/");
      cy.get('[data-cy="sidebar-button-login"]').click();
      cy.get('[data-cy="modal-login"]').should("have.class", "opacity-100");
      cy.get('[data-cy="input-email"]').type("test.user@test.com");
      cy.get('[data-cy="input-password"]').type("123456789!");
      cy.get('[data-cy="button-continue"]').click();
      cy.get('[data-cy="header-title"]').contains("Welcome to Daedalus");
  
      // Go to projects page
      cy.get('[data-cy="sidebar-button-project"]').click();
      cy.url().should("include", "/projects");
  
      // Wait for project page
      cy.wait(3000);
    });
  
    it("should add a test document, edit it and delete", () => {
      cy.get('[data-cy="new-project-card"]').click();
      cy.get('[data-cy="modal-new project"]').should("have.class", "opacity-100");
      cy.get('[data-cy="input-title"]').type("Test project");
      cy.get('[data-cy="input-description"]').type("Test project description");
      cy.get('[data-cy="button-create"]').click();

      cy.get('[data-cy="project-card-test project-title"]').click()
      cy.wait(3000)
      cy.url().should("include", "/projects/");

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
      cy.get('[data-cy="input-title"]').clear()
      cy.get('[data-cy="input-description"]').clear()
      cy.get('[data-cy="input-title"]').type("Delete document");
      cy.get('[data-cy="input-description"]').type("Delete");
      cy.get('[data-cy="button-update"]').click();
      cy.get('[data-cy="document-card-delete document-title"]').contains("Delete document");
      cy.get('[data-cy="document-card-delete document-description"]').contains("Delete");
  
      // Delete
      cy.get('[data-cy="document-menu-dots"]').first().click();
      cy.get('[data-cy="card-menu-delete"]').click();
   
    });

    it('should display the document in the My Documents section', () => {
        cy.get('[data-cy="new-project-card"]').click();
        cy.get('[data-cy="modal-new project"]').should("have.class", "opacity-100");
        cy.get('[data-cy="input-title"]').type("Test project");
        cy.get('[data-cy="input-description"]').type("Test project description");
        cy.get('[data-cy="button-create"]').click();
  
        cy.get('[data-cy="project-card-test project-title"]').click()
        cy.wait(3000)
        cy.url().should("include", "/projects");
  
        // Create document
        cy.get('[data-cy="new-document-card"]').click();
        cy.get('[data-cy="modal-new document"]').should("have.class", "opacity-100");
        cy.get('[data-cy="input-title"]').type("Test Document");
        cy.get('[data-cy="input-description"]').type("Test document description");
        cy.get('[data-cy="button-create"]').click();

        // Check the My Documents page
        cy.get('[data-cy="sidebar-button-documents"]').click()
        cy.wait(5000)
        cy.url().should("include", "/documents");
        cy.get('[data-cy="document-card-test document-title"]').contains("Test Document");
        cy.get('[data-cy="document-card-test document-description"]').contains("Test document description");
    })
  });
  