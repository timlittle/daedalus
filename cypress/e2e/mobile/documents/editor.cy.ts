describe("Editor", () => {
  afterEach(() => {
    // Reset the project and document state
    cy.task("purgeTestData");
  });

  beforeEach(() => {
    // Reset the project and document state, in case of failed test
    cy.task("purgeTestData");
    // Test a test project with a document
    cy.task("seedDocument");

    // Login
    cy.viewport("iphone-6");
    cy.login();
    cy.visit("/");

    // Go to the projects page
    cy.get('[data-cy="navbar-menu"]').click();
    cy.get('[data-cy="menuitem-projects"]').first().click();

    // Open the test project
    cy.get('[data-cy="project-card-document test project-title"]').click();

    // Open the test document
    cy.get('[data-cy="document-card-test document-description"]').click();
  });

  it("Should render markdown", () => {
    // Type markdown into the editor
    cy.get(".cm-content").type("# Hello test\n\n This is a test of Markdown");

    // Confirm the markdown is rendered in the preview
    cy.get(".prose").get("h1").first().contains("Hello test");
    cy.get(".prose").get("p").first().contains("This is a test of Markdown");
  });
  it("Should render mermaid", () => {
    // Type a mermaid document into the editor
    cy.get(".cm-content").type("## Mermaid test \n\n```mermaid\nflowchart TD\n\tStart --> Stop\n```");

    // Confirm a mermaid SVG has been generated
    cy.get(".prose").get("pre.mermaid").first().get("svg").should("have.attr", "width", "30");
  });
  it("Should render plantuml", () => {
    // Type a plantUML document into the editor
    cy.get(".cm-content").type(
      '# PlantUML\n\n```plantuml\n(*) --> "Initialization"\n\nif "Some Test" then\n-->[true] "Some Action"\n--> "Another Action"\n-right-> (*)\nelse\n->[false] "Something else"\n-->[Ending process] (*)\nendif\n```'
    );

    // Confirm a plantUML image has been generated
    cy.get(".prose").get("img").first().should("have.attr", "alt", "uml diagram");
  });
});
