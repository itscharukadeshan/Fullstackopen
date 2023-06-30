describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit(`${Cypress.env('baseUrl')}`)
  })

  it('Login form is shown', function () {
    // ...
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      // ...
    })

    it('fails with wrong credentials', function () {
      // ...
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      // log in user here
    })

    it('A blog can be created', function () {
      // ...
    })
  })
})
