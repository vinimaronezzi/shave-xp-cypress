/// <reference types="cypress"/>

import loginPage from '../support/pages/login/'
import shaversPage from '../support/pages/shavers'
import data from '../fixtures/users-login.json'

describe('login', () => {

  context('quando submeto o formulário', () => {

    it('deve logar com sucesso', () => {
      
      const user = data.loginsucess
      cy.createUser(user)

      loginPage.submit(user.email, user.password)
      shaversPage.header.userShouldBeLoggedIn(user.name)

    })

    it('não deve logar com senha incorreta', () => {

      const user = data.invalidpass
      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

      loginPage.submit(user.email, user.password)
      loginPage.noticeShouldBe(message)

    })

    it('não deve logar com email inexistente', () => {

      const user = data.invalidemail

      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

      loginPage.submit(user.email, user.password)
      loginPage.noticeShouldBe(message)

    })

    it('campos obrigatórios', () => {
      loginPage.submit()
      loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')

    })

  })

  context('Senha muito curta', () => {
    data.shortpass.forEach((p) => {
      it(`não deve logar com a senha: ${p}`, () => {
        loginPage.submit('vinicius.maronezzi@example.com', p)
        loginPage.alertShouldBe('Pelo menos 6 caracteres')

      })

    })

  })

  context('Email no formato incorreto', () => {
    data.shortemail.forEach((e) => {
      it(`não deve logar com o email: ${e}`, () => {
        loginPage.submit(e, 'pwd123')
        loginPage.alertShouldBe('Informe um email válido')

      })

    })

  })

})