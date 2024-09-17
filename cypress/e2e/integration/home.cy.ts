describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the home page', () => {
    cy.contains('Hi there');
  });

  it('should submit the form with entered values and redirect to next page', () => {
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('fake@mail.com');
    cy.get('.input-phone').type('444444444');
    cy.get('button[type="submit"]').click();
    cy.contains('Personal Information');
  });
});
