describe("Editor", () => {
  afterEach(() => {
    // Reset the projects and document state
    cy.task("purgeTestData");
  });

  beforeEach(() => {
    // Reset data incase tests have failed before
    cy.task("purgeTestData");

    // Create a project with a document
    cy.task("seedDocument");

    // Login
    cy.login();
    cy.visit("/");

    // Open the projects menu
    cy.get('[data-cy="sidebar-button-project"]').click();
    // Open the test project
    cy.get('[data-cy="project-card-document test project-title"]').click();
    // Open the test document
    cy.get('[data-cy="document-card-test document-description"]').click();
  });

  it("Should render markdown", () => {
    // Type some markdown into the edito
    cy.get(".cm-content").type("# Hello test\n\n This is a test of Markdown");

    // Confirm the preview updates
    cy.get(".prose").get("h1").first().contains("Hello test");
    cy.get(".prose").get("p").first().contains("This is a test of Markdown");
  });
  it("Should render mermaid", () => {
    // Type a mermaid document into the editor
    cy.get(".cm-content").type("## Mermaid test \n\n```mermaid\nflowchart TD\n\tStart --> Stop\n```");

    // Confirm the SVG is rendered on the page from Mermaid
    cy.get(".prose").get("pre.mermaid").first().get("svg").should("have.attr", "width", "30");
  });
  it("Should render plantuml", () => {
    // Type a PlantUML document into the editor
    cy.get(".cm-content").type(
      '# PlantUML\n\n```plantuml\n(*) --> "Initialization"\n\nif "Some Test" then\n-->[true] "Some Action"\n--> "Another Action"\n-right-> (*)\nelse\n->[false] "Something else"\n-->[Ending process] (*)\nendif\n```'
    );

    // Confirm the plantuml image has been added
    cy.get(".prose").get("img").first().should("have.attr", "alt", "uml diagram");
  });
});
