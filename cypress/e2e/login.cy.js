// Login Tests - Cypress E2E

describe('Login', () => {
  it('should display login page with correct heading and placeholder text', () => {
    cy.visit('/')
    
    // Verify the login heading is visible
    cy.get('h1').should('contain.text', 'Login')
    
    // Verify welcome message is present
    cy.get('[role="status"]').should('have.class', 'text-gray-400 text-sm')
  })

  it('should display error when fields are empty', () => {
    cy.visit('/')
    
    // Click the submit button without entering any data
    cy.get('button[type="submit"]').click()
    
    // Verify error message appears
    cy.contains('Bitte Benutzernamen und Passwort eingeben').should('be.visible')
  })

  it('should display error for invalid credentials', () => {
    cy.visit('/')
    
    // Enter wrong username and password
    cy.get('[aria-label="Benutzername"]').type('wrong_user')
    cy.get('[aria-label="Passwort"]').type('wrong_pass')
    
    // Click submit button
    cy.get('button[type="submit"]').click()
    
    // Verify error message for invalid credentials
    cy.contains("Nur Benutzer 'test' mit Passwort 'test' ist erlaubt").should('be.visible')
  })

  it('should handle successful login with valid credentials', () => {
    cy.visit('/')
    
    // Enter the correct username and password
    cy.get('[aria-label="Benutzername"]').type('test')
    cy.get('[aria-label="Passwort"]').type('test')
    
    // Click submit button
    cy.get('button[type="submit"]').click()
    
    // Verify loading state appears briefly
    cy.contains('Login...').should('be.visible', { timeout: 1000 })
    
    // Wait for the page to stabilize after login action
    cy.wait(600)
    
    // Verify error message is no longer present (login succeeded)
    cy.get('[role="alert"]').should('not.exist')
  })

  it('should not allow partial login with only username', () => {
    cy.visit('/')
    
    // Enter only the correct username
    cy.get('[aria-label="Benutzername"]').type('test')
    
    // Click submit button without password
    cy.get('button[type="submit"]').click()
    
    // Verify error message appears for missing fields
    cy.contains('Bitte Benutzernamen und Passwort eingeben').should('be.visible')
  })

  it('should not allow partial login with only password', () => {
    cy.visit('/')
    
    // Enter only the correct password
    cy.get('[aria-label="Passwort"]').type('test')
    
    // Click submit button without username
    cy.get('button[type="submit"]').click()
    
    // Verify error message appears for missing fields
    cy.contains('Bitte Benutzernamen und Passwort eingeben').should('be.visible')
  })

  it('should handle case-insensitive username input', () => {
    cy.visit('/')
    
    // Enter uppercase version of valid username
    cy.get('[aria-label="Benutzername"]').type('TEST')
    cy.get('[aria-label="Passwort"]').type('test')
    
    // Click submit button
    cy.get('button[type="submit"]').click()
    
    // Verify loading state appears (login succeeded)
    cy.contains('Login...').should('be.visible', { timeout: 1000 })
    
    // Wait for page to stabilize
    cy.wait(600)
    
    // Verify no error message after successful login
    cy.get('[role="alert"]').should('not.exist')
  })

  it('should handle case-insensitive password input', () => {
    cy.visit('/')
    
    // Enter lowercase username and uppercase version of valid password
    cy.get('[aria-label="Benutzername"]').type('test')
    cy.get('[aria-label="Passwort"]').type('TEST')
    
    // Click submit button
    cy.get('button[type="submit"]').click()
    
    // Verify loading state appears (login succeeded)
    cy.contains('Login...').should('be.visible', { timeout: 1000 })
    
    // Wait for page to stabilize
    cy.wait(600)
    
    // Verify no error message after successful login
    cy.get('[role="alert"]').should('not.exist')
  })

})