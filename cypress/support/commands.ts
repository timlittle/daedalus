/// <reference types="cypress" />

import { signIn } from "next-auth/react";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', () => {
    cy.session('login', () => {
    cy.intercept("/api/auth/session", { fixture: "session.json" }).as("session");
  
      // Set the cookie for cypress.
      // It has to be a valid cookie so next-auth can decrypt it and confirm its validity.
      // This cookie also may need to be refreshed intermittently if it expires
      cy.setCookie("next-auth.session-token", "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..QWL39f9nmacTXlLz.DgezTROaX0Es9NSPlxFHai9bRgHveJ4vWzW2i3y1AM2BSe9zNY5jE6KgK_cerqrPqS59GFs9STa00vhfAADD8usPaglLRRkF-n2Bp3oXSmK6nGexh3tRBT2_KBcuHBM_DW6hFIUcb-FWZsXcucYCNfL6cM_X4f-XGxgB4r2F0FIDsMuyBXGbQNsqRkXLBeTIiK5TfRRsT52m0edW_T0tQRDeB2H59BmRhjFlDY0R0Qk.N3rbv4xhN-gyyhpiAQ-www");
    })
  })