/// <reference types="cypress"/>

import loginPage from '../support/pages/login/'
import shaversPage from '../support/pages/shavers'
import data from '../fixtures/users-login.json'

describe('login', () => {

  context('quando submeto o formulário', () => {

    it('should login successfully', () => {
      
      const user = data.loginsucess
      cy.createUser(user)

      loginPage.submit(user.email, user.password)
      shaversPage.header.userShouldBeLoggedIn(user.name)

    })

    it('should not login with incorrect password', () => {

      const user = data.invalidpass
      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

      loginPage.submit(user.email, user.password)
      loginPage.noticeShouldBe(message)

    })

    it('should not login with non-existent email', () => {

      const user = data.invalidemail

      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

      loginPage.submit(user.email, user.password)
      loginPage.noticeShouldBe(message)

    })

    it('mandatory fields', () => {
      loginPage.submit()
      loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')

    })

  })

  context('short password', () => {
    data.shortpass.forEach((p) => {
      it(`should not login with password: ${p}`, () => {
        loginPage.submit('vinicius.maronezzi@example.com', p)
        loginPage.alertShouldBe('Pelo menos 6 caracteres')

      })

    })

  })

  context('incorrect email format', () => {
    data.shortemail.forEach((e) => {
      it(`should not login with email: ${e}`, () => {
        loginPage.submit(e, 'pwd123')
        loginPage.alertShouldBe('Informe um email válido')

      })

    })

  })

})