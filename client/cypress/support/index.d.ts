///<reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    loginUser(): Chainable<void>;
    addProduct(): Chainable<void>;
    loginAdmin(): Chainable<void>;
  }
}
