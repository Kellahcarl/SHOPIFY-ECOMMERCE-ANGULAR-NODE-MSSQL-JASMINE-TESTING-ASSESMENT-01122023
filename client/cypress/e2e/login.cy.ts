describe('logs a user', () => {
  it('passes', () => {
    cy.visit('/login');

    cy.get('[data-cy="email"]').type('sandrachegem@gmail.com');
    cy.get('[data-cy="password"]').type('@Qwerty123');

    cy.get('[data-cy="login_user_btn"]').click();

    cy.get('[data-cy="logged-in-success-popup"]');
    cy.location('pathname').should('eq', '/products');
  });

  it('fails', () => {
    cy.visit('/login');

    cy.get('[data-cy="email"]').type('caleb.kellah@thejitu.com');
    cy.get('[data-cy="password"]').type('1234466e');

    cy.get('[data-cy="login_user_btn"]').click();

    cy.get('[data-cy="logged-in-error-popup"]');
  });

  it('passes admin', () => {
    cy.visit('/login');

    cy.get('[data-cy="email"]').type('caleb.kellah@thejitu.com');
    cy.get('[data-cy="password"]').type('@Qwerty123');

    cy.get('[data-cy="login_user_btn"]').click();

    cy.get('[data-cy="logged-in-success-popup"]');
    cy.location('pathname').should('eq', '/admin');
  });
});
