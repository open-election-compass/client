describe('OpenElectionCompass', () => {
  it('Displays title', () => {
    cy.visit('/');
    cy.contains('h1', 'Hogwarts Head Boy and Girl Elections 1993');
  });
  it('Displays first thesis', () => {
    cy.visit('/');
    cy.get('[data-test="thesis-0"]').should('exist');
  });
  it('Reveals theses step by step', () => {
    cy.visit('/');
    cy.get('[data-test="thesis-1"]').should('not.exist');
    cy.get('[data-test="thesis-0-approve"]').click();
    cy.get('[data-test="thesis-1"]').should('exist');
    cy.get('[data-test="thesis-2"]').should('not.exist');
    cy.get('[data-test="thesis-1-approve"]').click();
    cy.get('[data-test="thesis-2"]').should('exist');
  });
  it('Theses stay revealed when previous theses are cleared/skipped', () => {
    cy.visit('/');
    cy.get('[data-test="thesis-1"]').should('not.exist');
    cy.get('[data-test="thesis-0-approve"]').click();
    cy.get('[data-test="thesis-1"]').should('exist');
    cy.get('[data-test="thesis-0-skip"]').click();
    cy.get('[data-test="thesis-1"]').should('exist');
  });
});
