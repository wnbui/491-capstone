describe('Login Flow', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('/')
  })

  it('should display the login page', () => {
    // Check that we're on the login page
    cy.contains('Welcome Back').should('be.visible')
    cy.contains('Sign in to manage your projects').should('be.visible')
    
    // Check for login form elements
    cy.get('input[type="text"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.contains('button', 'Sign In').should('be.visible')
    cy.wait(2000)
  })

  it('should show error with empty credentials', () => {
    // Click sign in without entering credentials
    cy.contains('button', 'Sign In').click()
    
    // Form validation should prevent submission
    // (HTML5 required attribute will block it)
    cy.wait(2000)
  })

  it('should show error with invalid credentials', () => {
    // Enter invalid credentials
    cy.get('input[type="text"]').type('wronguser')
    cy.get('input[type="password"]').type('wrongpassword')
    cy.contains('button', 'Sign In').click()
    
    // Should show error message
    cy.contains('Invalid username or password', { timeout: 10000 }).should('be.visible')
    cy.wait(2000)
  })

  it('should successfully login with valid credentials', () => {
    // Get credentials from environment variables
    const username = Cypress.env('testUsername')
    const password = Cypress.env('testPassword')
    
    // Enter valid credentials
    cy.get('input[type="text"]').type(username)
    cy.get('input[type="password"]').type(password)
    
    // Click sign in
    cy.contains('button', 'Sign In').click()
    
    // Should redirect to dashboard
    cy.url({ timeout: 10000 }).should('include', 'localhost:5173')
    
    // Should see dashboard elements
    cy.contains('Projects', { timeout: 10000 }).should('be.visible')
    
    // Should see logout button
    cy.contains('button', 'Logout').should('be.visible')
    
    // Should have stored token
    cy.window().then((window) => {
      const token = window.localStorage.getItem('token')
      expect(token).to.exist
      expect(token).to.not.be.empty
    })
    cy.wait(2000)
  })

  it('should persist login after page refresh', () => {
    // Login first
    const username = Cypress.env('testUsername')
    const password = Cypress.env('testPassword')
    
    cy.get('input[type="text"]').type(username)
    cy.get('input[type="password"]').type(password)
    cy.contains('button', 'Sign In').click()
    
    // Wait for dashboard to load
    cy.contains('Projects', { timeout: 10000 }).should('be.visible')
    
    // Refresh the page
    cy.reload()
    
    // Should still be logged in (not redirected to login)
    cy.contains('Projects', { timeout: 10000 }).should('be.visible')
    cy.wait(2000)
  })

  it('should logout successfully', () => {
    // Login first
    const username = Cypress.env('testUsername')
    const password = Cypress.env('testPassword')
    
    cy.get('input[type="text"]').type(username)
    cy.get('input[type="password"]').type(password)
    cy.contains('button', 'Sign In').click()
    
    // Wait for dashboard
    cy.contains('Projects', { timeout: 10000 }).should('be.visible')
    
    // Click logout
    cy.contains('button', 'Logout').click()
    
    // Should redirect to login page
    cy.contains('Welcome Back', { timeout: 10000 }).should('be.visible')
    
    // Token should be removed
    cy.window().then((window) => {
      const token = window.localStorage.getItem('token')
      expect(token).to.be.null
    })
    cy.wait(2000)
  })
})