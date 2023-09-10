describe("Newsfeed", () => {
  it("should show the newsfeed", () => {
    // Login
    cy.login();
    cy.visit("/");

    // Confirm the news feed is displayed
    cy.get('[data-cy="header-title"]').contains("Welcome to Daedalus");
    cy.get("h1").contains("Newsfeed");
  });
});
