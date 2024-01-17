/// <reference types="cypress"/>

import data from '../fixtures/order.json'
import shaversPage from '../support/pages/shavers'  
import catalogPage from '../support/pages/catalogo'  
import orderPage from '../support/pages/order'

describe('pedido', () => {
    context('usuario logado', () => {
        const {customer, shaver, service} = data

        before(() => {
            cy.createUser(customer)
            cy.apiLogin(customer)
        })

        it('deve poder solicitar serivços', () => {
            shaversPage.selectShaver(shaver.name)
            catalogPage.hasShaver(shaver.name)
            
            catalogPage.selectService(service.description)
            catalogPage.confirmOrder()
            orderPage.hasOrder()
        })
    })
})