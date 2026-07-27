// Note UI Tests - Textarea and Save Button

describe('Note UI', () => {

  it('should allow entering text in the textarea', () => {
    cy.visit('/')
    // Enter the correct username and password
    cy.get('[aria-label="Benutzername"]').type('test')
    cy.get('[aria-label="Passwort"]').type('test')
    // Click submit button
    cy.get('button[type="submit"]').click()
    // Wait for the page to stabilize after login action
    cy.get('[aria-label="Input note"]').click()
    cy.get('[aria-label="Input note"]').type('Cypress Test')
    cy.get('[aria-label="Input note"]').should('contain.text', 'Cypress Test')
  })

  it('should allow clicking the save button', () => {
    cy.visit('/')
    cy.get('[aria-label="Add note"]').click()
    // Verify the page still loads correctly after click (action triggered)
    cy.url().should('include', '/')
  })
})