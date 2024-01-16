class Header {

    userShouldBeLoggedIn(name) {
        const firstName = name.split(' ')[0]

        cy.get('.logged-user div a').should('have.text', 'Olá, ' + firstName)
    }
}

export default new Header()