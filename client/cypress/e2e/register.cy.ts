describe('registers a user', () => {

  function generateRandomEmail() {
    const uniquePart = Math.random().toString(36).substring(2, 8);
    const domain = 'example.com'; // Replace with your desired domain

    return `user_${uniquePart}@${domain}`;
  }
  it('passes', () => {
    const randomEmail = generateRandomEmail();
    cy.visit('/register');

    cy.get('[data-cy="userName"]').type('jane Doe')
    cy.get('[data-cy="userEmail"]').type(randomEmail);

    cy.get('[data-cy="userPassword"]').type('@Qwerty123');
    cy.get('[data-cy="userConfirmPassword"]').type('@Qwerty123');

    cy.get('[data-cy="register_user_btn"]').click();

    cy.get('[data-cy="registered-success-popup"]');
    cy.location("pathname").should('eq', '/login')
  });
  it('fails wrong password ', () => {
    cy.visit('/register');

    cy.get('[data-cy="userName"]').type('jane Doe');
    cy.get('[data-cy="userEmail"]').type('janeDoe@yopmail.com');

    cy.get('[data-cy="userPassword"]').type('12345678');
    cy.get('[data-cy="userConfirmPassword"]').type('12345678');

    cy.get('[data-cy="register_user_btn"]').click();

    cy.get('[data-cy="registered-error-popup"]');
    cy.location('pathname').should('eq', '/register');
  });
});
