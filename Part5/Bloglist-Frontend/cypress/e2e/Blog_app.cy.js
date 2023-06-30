describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to blog list')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('lord')
      cy.get('#password').type('lord')
      cy.get('#login-button').click()
      cy.contains('lord is logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('lord')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.Toastify__toast-body > :nth-child(2)').contains('Login failed')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('lord')
      cy.get('#password').type('lord')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.get('#new-blog').click()
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('Cypress inc')
      cy.get('#url').type('https://example.com/cypress')
      cy.get('#submit').click()
      cy.contains('a note created by cypress')
    })
  })

  afterEach(function () {
    cy.wait(1000)
  })
})
