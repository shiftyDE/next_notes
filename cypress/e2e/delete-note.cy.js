// Delete Note Test

describe('Delete Note', () => {
  it('should allow deleting a saved note', () => {
    cy.visit('/')
    cy.get('[aria-label="Input note"]').type('Cypress Delete Test')
    cy.get('[aria-label="Add note"]').click()
    cy.contains('Cypress Delete Test').should('be.visible')
    cy.get('[aria-label="Delete note"]').click()
    cy.contains('Cypress Delete Test').should('not.exist')
  })
})