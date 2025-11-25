describe('Tasks Flow', () => {
  const projectName = `Task Test Project ${Date.now()}`
  const taskTitle = `Test Task ${Date.now()}`
  const taskDescription = 'This is a test task for automation'
  const taskPoints = '5'

  it('should create a project, add a task to it, then verify task appears in tasks page', () => {
    // Step 1: Login once at the beginning
    cy.login()
    cy.wait(1000)

    // Step 2: Create a new project
    cy.contains('button', 'New Project').should('be.visible').click()
    cy.contains('Create New Project').should('be.visible')
    
    // Fill in project details
    cy.get('input').first().type(projectName)
    cy.get('textarea').type('Project for task testing')
    cy.get('select').select('active')
    
    // Submit the form
    cy.contains('button', 'Create Project').click()
    cy.wait(2000)

    // Step 3: Verify the project was created and navigate to it
    cy.contains(projectName, { timeout: 10000 }).should('be.visible')
    cy.wait(1000)

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

    // Step 4: Create a new task in the project
    cy.contains('button', 'New Task').should('be.visible').click({ force: true })
    cy.wait(1000)
    
    // Verify task creation modal is open
    cy.contains('Create New Task').should('be.visible')
    
    // Fill in task details
    cy.get('input').first().type(taskTitle)
    cy.get('textarea').type(taskDescription)
    cy.get('select').select('todo')
    cy.get('input[type="number"]').clear().type(taskPoints)
    
    // Submit the task form
    cy.contains('button', 'Create Task').click()
    cy.wait(2000)

    // Step 5: Verify task appears in the kanban board
    cy.contains(taskTitle, { timeout: 10000 }).should('be.visible')
    cy.contains(taskDescription).should('be.visible')
    cy.wait(1000)

    // Step 6: Navigate to the Tasks page via sidebar
    cy.contains('Tasks').first().click()
    cy.wait(2000)

    // Step 7: Verify we're on the tasks page
    cy.contains('All Tasks').should('be.visible')
    cy.wait(1000)

    // Step 8: Verify the newly created task appears in the task list
    cy.contains(taskTitle, { timeout: 10000 }).should('be.visible')
    cy.contains(taskDescription).should('be.visible')
    cy.contains(`${taskPoints} pts`).should('be.visible')
    cy.wait(2000)

    // Logout at the end
    cy.logout()
  })
})