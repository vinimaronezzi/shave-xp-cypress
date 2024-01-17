/// <reference types="cypress"/>

import data from '../fixtures/order.json'
import shaversPage from '../support/pages/shavers'  
import catalogPage from '../support/pages/catalogo'  
import orderPage from '../support/pages/order'

describe('order', () => {
    context('logged user', () => {
        const {customer, shaver, service} = data

        before(() => {
            cy.createUser(customer)
            cy.apiLogin(customer)
        })

        it('should order services', () => {
            shaversPage.selectShaver(shaver.name)
            catalogPage.hasShaver(shaver.name)
            
            catalogPage.selectService(service.description)
            catalogPage.confirmOrder()
            orderPage.hasOrder()
        })
    })
})