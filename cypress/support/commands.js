// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ***********************************************
// This file contains custom commands for Cypress
// ***********************************************

/**
 * Custom command to login
 * Usage: cy.login() or cy.login('username', 'password')
 */
Cypress.Commands.add('login', (username, password) => {
  const user = username || Cypress.env('testUsername')
  const pass = password || Cypress.env('testPassword')
  
  cy.visit('/')
  cy.get('input[type="text"]').type(user)
  cy.get('input[type="password"]').type(pass)
  cy.contains('button', 'Sign In').click()
  
  // Wait for dashboard to load
  cy.contains('Projects', { timeout: 10000 }).should('be.visible')
})

/**
 * Custom command to login via API (faster for setup)
 * Usage: cy.loginViaApi()
 */
Cypress.Commands.add('loginViaApi', (username, password) => {
  const user = username || Cypress.env('testUsername')
  const pass = password || Cypress.env('testPassword')
  const apiUrl = Cypress.env('apiUrl')
  
  cy.request({
    method: 'POST',
    url: `${apiUrl}/auth/login`,
    body: {
      username: user,
      password: pass
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body).to.have.property('token')
    
    // Store token in localStorage
    window.localStorage.setItem('token', response.body.token)
    
    // Visit the app (will be logged in)
    cy.visit('/')
  })
})

/**
 * Custom command to logout
 * Usage: cy.logout()
 */
Cypress.Commands.add('logout', () => {
  cy.contains('button', 'Logout').click()
  cy.contains('Welcome Back', { timeout: 10000 }).should('be.visible')
})

/**
 * Custom command to check if logged in
 * Usage: cy.shouldBeLoggedIn()
 */
Cypress.Commands.add('shouldBeLoggedIn', () => {
  cy.contains('Projects').should('be.visible')
  cy.contains('Welcome').should('be.visible')
  cy.window().then((window) => {
    const token = window.localStorage.getItem('token')
    expect(token).to.exist
    expect(token).to.not.be.empty
  })
})

/**
 * Custom command to check if logged out
 * Usage: cy.shouldBeLoggedOut()
 */
Cypress.Commands.add('shouldBeLoggedOut', () => {
  cy.contains('Welcome Back').should('be.visible')
  cy.window().then((window) => {
    const token = window.localStorage.getItem('token')
    expect(token).to.be.null
  })
})