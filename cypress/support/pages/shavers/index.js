import header from '../../Components/header'

class ShaversPage {

    constructor() {
        
        this.header = header

    }

    selectShaver(name) {
        cy.contains('figcaption h3', name)
        .should('be.visible').click()
    }
}

export default new ShaversPage()