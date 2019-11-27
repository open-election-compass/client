describe('OpenElectionCompass', () => {
  it('Displays title', () => {
    cy.visit('/');
    cy.contains('h1', 'Hogwarts Head Boy and Girl Elections 1993');
  });
});
