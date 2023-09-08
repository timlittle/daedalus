describe('Homepage', () => {
  after(()=>{
    cy.task('deleteRegisterUser')
  })
  it('should allow registration', () => {
    cy.visit('/')
    cy.get('[data-cy="sidebar-button-register"]').click()
    cy.get('[data-cy="modal-register"]').should('have.class', 'opacity-100')
    cy.get('[data-cy="input-email"]').type("test.register.user@test.com")
    cy.get('[data-cy="input-name"]').type("Test user")
    cy.get('[data-cy="input-password"]').type("123456789!")
    cy.get('[data-cy="button-continue"]').click();
    cy.get('[data-cy="modal-login"]').should('have.class', 'opacity-100')

    cy.get('[data-cy="input-email"]').type("test.register.user@test.com")
    cy.get('[data-cy="input-password"]').type("123456789!")
    cy.get('[data-cy="button-continue"]').click();
    cy.wait(500)

  })
  it('should logout', () => {
    cy.visit('/')
    cy.get('[data-cy="sidebar-button-login"]').click()
    cy.get('[data-cy="modal-login"]').should('have.class', 'opacity-100')
    cy.get('[data-cy="input-email"]').type("test.user@test.com")
    cy.get('[data-cy="input-password"]').type("123456789!")
    cy.get('[data-cy="button-continue"]').click();

    cy.get('[data-cy="menuitem-logout"]').first().click({force: true})

    cy.get('[data-cy="header-title"]').contains("Welcome to Daedalus")
    cy.get('[data-cy="header-subtitle"]').contains("Please sign in")


  })
})