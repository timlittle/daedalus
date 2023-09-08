describe('Home page', () => {
  it('should prompt login on mobile', () => {
    cy.viewport('iphone-6')
    cy.visit('https://example.cypress.io')
  })
})