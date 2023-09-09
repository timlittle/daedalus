describe("Sharing", ()=>{
    afterEach(()=>{
        cy.task('deleteRegisterUser')
    })

    beforeEach(()=>{
        cy.viewport('iphone-6')
        cy.visit("/")

        cy.get('[data-cy="navbar-menu"]').click()
        cy.get('[data-cy="menuitem-register"]').click()
        cy.get('[data-cy="modal-register"]').should('have.class', 'opacity-100')
        cy.get('[data-cy="input-email"]').type("test.register.user@test.com")
        cy.get('[data-cy="input-name"]').type("Test user")
        cy.get('[data-cy="input-password"]').type("123456789!")
        cy.get('[data-cy="button-continue"]').click();
        cy.get('[data-cy="modal-login"]').should('have.class', 'opacity-100')
    
        cy.get('[data-cy="input-email"]').type("test.register.user@test.com")
        cy.get('[data-cy="input-password"]').type("123456789!")
        cy.get('[data-cy="button-continue"]').click();

        cy.get('[data-cy="navbar-menu"]').click()
        cy.get('[data-cy="menuitem-projects"]').first().click()

        cy.get('[data-cy="new-project-card"]').click();
        cy.get('[data-cy="modal-new project"]').should("have.class", "opacity-100");
        cy.get('[data-cy="input-title"]').type("Test project");
        cy.get('[data-cy="input-description"]').type("Test project description");
        cy.get('[data-cy="button-create"]').click();

        cy.get('[data-cy="project-card-test project-title"]').click();

        cy.get('[data-cy="new-document-card"]').click();
        cy.get('[data-cy="modal-new document"]').should("have.class", "opacity-100");
        cy.get('[data-cy="input-title"]').type("Test Document");
        cy.get('[data-cy="input-description"]').type("Test document description");
        cy.get('[data-cy="button-create"]').click();

        cy.get('[data-cy="document-card-test document-title"]').click();
    })
    it("should share document", ()=>{
        cy.wait(1000)
        cy.get('[data-cy="navbar-menu"]').click()
        cy.get('[data-cy="menuitem-share"]').click()
        cy.get('[data-cy="modal-share"]').should('have.class','opacity-100')
        cy.get('[data-cy="share-select"]').select('64fb68f7708508e67ed294bc');
        cy.get('[data-cy="button-share"]').click();

        cy.get('[data-cy="navbar-menu"]').click()
        cy.get('[data-cy="menuitem-logout"]').click();
        cy.visit('/')
        cy.get('[data-cy="navbar-menu"]').click()
        cy.get('[data-cy="menuitem-sign-in"]').first().click()
        cy.get('[data-cy="input-email"]').type('test.user@test.com');
        cy.get('[data-cy="input-password"]').type('123456789!');
        cy.get('[data-cy="button-continue"]').click();
        cy.get('[data-cy="navbar-menu"]').click()
        cy.get('[data-cy="menuitem-shared-documents"]').first().click()
        cy.get('[data-cy="document-card-test document-title"]').contains('Test Document')
        cy.get('[data-cy="document-card-test document-title"]').click();
        cy.get('[data-cy="navbar-badge"]').contains('Test project')
        cy.get('[data-cy="navbar-title"]').contains('Test Document')

    })
})