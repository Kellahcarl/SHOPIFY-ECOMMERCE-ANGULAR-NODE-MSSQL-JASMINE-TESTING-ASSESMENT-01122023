describe('user forgets password', () => {
  it('passes', () => {
    cy.visit('/forgot');

    cy.get('[data-cy="userEmail"]').type('sandrachegem@gmail.com');

    cy.get('[data-cy="forgot_user_btn"]').click();

    cy.get('[data-cy="forgot-success-popup"]');

    cy.get('.swal2-confirm').click();
    
    cy.location('pathname').should('eq', '/reset');
  });
  it('fails wrong password ', () => {
    cy.visit('/forgot');

    cy.get('[data-cy="userEmail"]').type('sandrachege@gmail.com');

    cy.get('[data-cy="forgot_user_btn"]').click();

    cy.get('[data-cy="forgot-error-popup"]');
    cy.location('pathname').should('eq', '/forgot');
  });
});
