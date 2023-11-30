describe('user functionality', () => {
  beforeEach('', () => {
    cy.loginUser();
  });

  // it('search for a product', () => {
  //   cy.visit('/products');
  //   const searchterm = 'winter';
  //   cy.get('[data-cy="searchproduct"]').type(searchterm);
  //   cy.get('[data-cy="product"]').should('have.length.greaterThan', 0);
  // });

  it('views a product', () => {
    cy.visit('/products');

    // Select the first product and alias it for later use
    cy.get('[data-cy="product"]:first').as('firstProduct').click();
  });

  it('adds to cart', () => {
    cy.visit('/products');

    cy.get('[data-cy=product]:first').trigger('mouseover');

    // Check if the features div is visible
    cy.get('.features-card').should('be.visible');

    // Click the "Add to cart" button of the first product, forcing the click
    cy.get('[data-cy=product]:first [data-cy=addToCart]').click({
      force: true,
    });

    // cy.addProduct()
  });

  it('should display empty cart message when the cart is empty', () => {
    cy.get('[data-cy=cart]').click();

    cy.get('.cart-empty-msg').should('exist');
  });

  it('should not display empty cart message when the cart has items', () => {
    cy.get('[data-cy=cart]').click();

    cy.get('.cart-content article').should('not.exist');
  });

  it('increases cart quantity', () => {
    cy.visit('/products');

    cy.get('[data-cy=product]:first').trigger('mouseover');

    // Check if the features div is visible
    cy.get('.features-card').should('be.visible');

    // Click the "Add to cart" button of the first product, forcing the click
    cy.get('[data-cy=product]:first [data-cy=addToCart]').click({
      force: true,
    });
    cy.visit('/products');

    cy.get('[data-cy=cart]').click();

    cy.get('[data-cy="increaseQuantity"]').first().click();
  });

  it('reduces cart quantity', () => {
    cy.visit('/products');

    cy.get('[data-cy=product]:first').trigger('mouseover');

    // Check if the features div is visible
    cy.get('.features-card').should('be.visible');

    // Click the "Add to cart" button of the first product, forcing the click
    cy.get('[data-cy=product]:first [data-cy=addToCart]').click({
      force: true,
    });
    cy.visit('/products');

    cy.get('[data-cy=cart]').click();

    cy.get('[data-cy="decreaseQuantity"]').first().click();
  });

  it('remove an item from cart', () => {
    cy.visit('/products');

    cy.get('[data-cy=product]:first').trigger('mouseover');

    // Check if the features div is visible
    cy.get('.features-card').should('be.visible');

    // Click the "Add to cart" button of the first product, forcing the click
    cy.get('[data-cy=product]:first [data-cy=addToCart]').click({
      force: true,
    });
    cy.visit('/products');

    cy.get('[data-cy=cart]').click();

    cy.get('[data-cy="removeItem"]').first().click();
  });
});
