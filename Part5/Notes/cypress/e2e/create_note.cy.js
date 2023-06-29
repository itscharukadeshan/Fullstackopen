describe('Note app', function () {
  // ..

  describe('when logged in', function () {
    beforeEach(function () {
      cy.visit('http://localhost:5173')
      cy.contains('log in').click()
      cy.get('#username').type('charuka1')
      cy.get('#password').type('1234a')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function () {
      cy.get('#new-note').click()
      cy.get('input').click().type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
  })
})
