describe("Newsfeed", () => {
  it("should show the newsfeed", () => {
    cy.viewport("iphone-6");

    // Login
    cy.login();
    cy.visit("/");

    // Confirm the newsfeed is displayed
    cy.get('[data-cy="header-title"]').contains("Welcome to Daedalus");
    cy.get("h1").contains("Newsfeed");
  });
});
