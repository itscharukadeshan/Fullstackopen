describe('Blog', () => {
  it('can be visit the', () => {
    cy.visit(`${Cypress.env('baseUrl')}`)
  })
})
