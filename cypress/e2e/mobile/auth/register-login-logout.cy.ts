describe('Homepage', () => {
  after(()=>{
    cy.task('deleteRegisterUser')
  })
  beforeEach(()=>{
    cy.viewport('iphone-6')
    cy.visit('/')
  })
  it('should allow registration', () => {

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
    cy.get('[data-cy="header-title"]').contains("Welcome to Daedalus");

  })
  it('should logout', () => {

    cy.login()
    cy.visit('/')
    cy.get('[data-cy="navbar-menu"]').click()
    cy.get('[data-cy="menuitem-logout"]').first().click()

    cy.get('[data-cy="header-title"]').contains("Welcome to Daedalus")
    cy.get('[data-cy="header-subtitle"]').contains("Please sign in")


  })
})