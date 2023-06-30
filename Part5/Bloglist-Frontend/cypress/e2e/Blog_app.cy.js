describe('Blog', () => {
  it('can visit the app', () => {
    cy.visit(`${Cypress.env('baseUrl')}`)
  })
})
