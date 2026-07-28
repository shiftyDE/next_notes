// Login Tests - Cypress E2E

describe('Login', () => {
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

  it('should display error when username is incorrect', () => {
    cy.visit('/')
    
    // Enter wrong username and correct password
    cy.get('[aria-label="Benutzername"]').type('wrong_user')
    cy.get('[aria-label="Passwort"]').type('test')
    
    // Click submit button
    cy.get('button[type="submit"]').click()
    
    // Verify error message for invalid credentials appears
    cy.contains("Nur Benutzer 'test' mit Passwort 'test' ist erlaubt").should('be.visible')
  })

  it('should display error when password is incorrect', () => {
    cy.visit('/')
    
    // Enter correct username and wrong password
    cy.get('[aria-label="Benutzername"]').type('test')
    cy.get('[aria-label="Passwort"]').type('wrong_pass')
    
    // Click submit button
    cy.get('button[type="submit"]').click()
    
    // Verify error message for invalid credentials appears
    cy.contains("Nur Benutzer 'test' mit Passwort 'test' ist erlaubt").should('be.visible')
  })

})
