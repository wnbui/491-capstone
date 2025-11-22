describe('Projects Simple Flow', () => {
  const projectName = `Test Project ${Date.now()}`
  const projectDescription = 'This is a test project for automation'

  it('should create an active project, verify it, archive it, then unarchive it', () => {
    // Login once at the beginning
    cy.login()
    cy.wait(1000)

    // Step 1: Create a new project
    cy.contains('button', 'New Project').should('be.visible').click()
    cy.contains('Create New Project').should('be.visible')
    
    // Fill in project details
    cy.get('input').first().type(projectName)
    cy.get('textarea').type(projectDescription)
    cy.get('select').select('active')
    
    // Submit the form
    cy.contains('button', 'Create Project').click()
    cy.wait(2000)

    // Step 2: Verify the project was created
    cy.contains(projectName, { timeout: 10000 }).should('be.visible')
    cy.contains(projectDescription).should('be.visible')
    cy.contains('active').should('be.visible')
    cy.wait(1000)

    // Step 3: Navigate to the project detail page
    cy.contains(projectName)
      .parents('[class*="rounded-lg"]')
      .click()
    cy.wait(2000)

    // Wait for any modals to close
    cy.get('body').then(($body) => {
      if ($body.find('[class*="fixed inset-0"]').length > 0) {
        cy.wait(1000)
      }
    })

    // Verify we're on the project detail page
    cy.contains(projectName).should('be.visible')
    cy.contains(projectDescription).should('be.visible')
    cy.wait(1000)

    // Step 4: Archive the project
    cy.get('button').contains('Archive Project').first().click({ force: true })
    cy.wait(1000)
    
    // Confirm archive in modal
    cy.contains('Archive Project').should('be.visible')
    cy.contains('Are you sure').should('be.visible')
    
    // Find the modal and click the Archive button (second button, not Cancel)
    cy.get('button').contains(/^Archive$/).last().click({ force: true })
    cy.wait(3000)

    // Step 5: Navigate back to dashboard
    cy.contains('Projects').first().click()
    cy.wait(1000)

    // Step 6: Verify project is not in active projects
    cy.contains(projectName).should('not.exist')
    cy.wait(1000)

    // Step 7: View archived projects
    cy.contains('button', 'View Archived').should('be.visible').click()
    cy.wait(1000)

    // Step 8: Verify the project appears in archived projects
    cy.contains('Archived Projects').should('be.visible')
    cy.contains(projectName, { timeout: 10000 }).should('be.visible')
    cy.contains(projectDescription).should('be.visible')
    cy.wait(1000)

    // Step 9: Navigate to archived project detail page
    cy.contains(projectName)
      .parents('[class*="rounded-lg"]')
      .click()
    cy.wait(2000)

    // Wait for any modals to close
    cy.get('body').then(($body) => {
      if ($body.find('[class*="fixed inset-0"]').length > 0) {
        cy.wait(1000)
      }
    })

    // Verify we're on the archived project detail page
    cy.contains(projectName).should('be.visible')
    cy.wait(1000)

    // Step 10: Unarchive the project
    cy.get('button').contains('Unarchive Project').first().click({ force: true })
    cy.wait(1000)
    
    // Confirm unarchive in modal
    cy.contains('Unarchive Project').should('be.visible')
    cy.contains('Are you sure').should('be.visible')
    
    // Find the modal and click the Unarchive button (second button, not Cancel)
    cy.get('button').contains(/^Unarchive$/).last().click({ force: true })
    cy.wait(3000)

    // Step 11: Navigate back to dashboard
    cy.contains('Projects').first().click()
    cy.wait(1000)

    // Step 12: Verify project is back in active projects
    cy.contains(projectName, { timeout: 10000 }).should('be.visible')
    cy.contains(projectDescription).should('be.visible')
    cy.wait(2000)

    // Logout at the end
    cy.logout()
  })
})