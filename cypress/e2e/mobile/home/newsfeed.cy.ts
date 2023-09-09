describe('Newsfeed', () => {
    it('should show the newsfeed', () => {
      cy.login()
      cy.visit('/')
      cy.get('[data-cy="header-title"]').contains("Welcome to Daedalus")
      cy.get('h1').contains('Newsfeed')
    })
  })