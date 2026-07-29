// Note UI Tests - Textarea and Save Button

describe('Note UI', () => {

  it('should display a textarea and save button', () => {
    cy.visit('/')
        // Enter the correct username and password (using accessibility labels)
        cy.get('[aria-label="Username"]').type('test')
        cy.get('[aria-label="Password"]').type('test')

        // Click submit button
        cy.get('button[type="submit"]').click()

        // Verify loading state appears briefly
        cy.contains('Login...').should('be.visible', { timeout: 1000 })
        
        // Wait for the page to stabilize after login action
        cy.get('[aria-label="Input note"]').click()
        cy.get('[aria-label="Input note"]').type('Cypress Test')
        cy.get('[aria-label="Input note"]').should('contain.text', 'Cypress Test')
        cy.get('[aria-label="Add note"]').click()
  })
})