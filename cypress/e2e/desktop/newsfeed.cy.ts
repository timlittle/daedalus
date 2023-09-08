describe('Newsfeed', () => {
    it('should show the newsfeed', () => {
      cy.visit('/')
      cy.get('[data-cy="sidebar-button-login"]').click()
      cy.get('[data-cy="input-email"]').type("test.user@test.com")
      cy.get('[data-cy="input-password"]').type("123456789!")
      cy.get('[data-cy="button-continue"]').click();
      cy.get('[data-cy="header-title"]').contains("Welcome to Daedalus")
    })
  })