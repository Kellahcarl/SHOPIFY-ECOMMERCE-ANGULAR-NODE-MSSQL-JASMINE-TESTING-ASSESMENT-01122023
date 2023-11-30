describe('resets password for a user', () => {
  function generateRandomEmail() {}
  it('passes', () => {
    cy.visit('/reset');

    cy.get('[data-cy="userID"]').type('b124693c-0e8c-4f32-b710-7c9bb18c0de0');

    cy.get('[data-cy="userPassword"]').type('@Qwerty123');
    cy.get('[data-cy="userConfirmPassword"]').type('@Qwerty123');

    cy.get('[data-cy="reset_user_btn"]').click();

    cy.get('[data-cy="reset-success-popup"]');
    cy.location('pathname').should('eq', '/login');
  });
  it('fails invalid resetcode/id ', () => {
    cy.visit('/reset');

    cy.get('[data-cy="userID"]').type('jane Doe');

    cy.get('[data-cy="userPassword"]').type('@Qwerty123');
    cy.get('[data-cy="userConfirmPassword"]').type('@Qwerty123');

    cy.get('[data-cy="reset_user_btn"]').click();

    cy.get('[data-cy="reset-error-popup"]');

    cy.location('pathname').should('eq', '/reset');
  });
});
