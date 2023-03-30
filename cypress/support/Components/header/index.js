

class Header {

    userShouldBeLoggedIn(name) {

        cy.get('.logged-user div a').should('have.text', 'Olá, ' + name)
    }
}

export default new Header()