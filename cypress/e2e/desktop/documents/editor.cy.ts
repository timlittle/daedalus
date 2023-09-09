describe("Editor", ()=>{
    afterEach(()=>{
        cy.task('purgeTestData');
    })
    
    beforeEach(()=>{
        cy.task('purgeTestData');
        cy.task("seedDocument")

        // Login
        cy.login()
        cy.visit("/");
        cy.get('[data-cy="header-title"]').contains("Welcome to Daedalus");

        cy.get('[data-cy="sidebar-button-project"]').click();
        cy.url().should("include", "/projects");
        cy.get('[data-cy="project-card-document test project-title"]').click();
        cy.get('[data-cy="document-card-test document-description"]').click();

    })

    it("Should render markdown", ()=>{
        cy.get('.cm-content').type("# Hello test\n\n This is a test of Markdown")
        cy.get('.prose').get('h1').first().contains("Hello test")
        cy.get('.prose').get('p').first().contains("This is a test of Markdown")
    })
    it("Should render mermaid", ()=>{
        cy.get('.cm-content').type("## Mermaid test \n\n```mermaid\nflowchart TD\n\tStart --> Stop\n```")
        cy.get('.prose').get('pre.mermaid').first().get('svg').should('have.attr', 'width','30')

    })
    it("Should render plantuml", ()=>{
        cy.get('.cm-content').type("# PlantUML\n\n```plantuml\n(*) --> \"Initialization\"\n\nif \"Some Test\" then\n-->[true] \"Some Action\"\n--> \"Another Action\"\n-right-> (*)\nelse\n->[false] \"Something else\"\n-->[Ending process] (*)\nendif\n```")
        cy.get('.prose').get('img').first().should('have.attr', 'alt','uml diagram')
    })
})