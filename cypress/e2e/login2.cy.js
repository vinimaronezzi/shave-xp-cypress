/// <reference types="cypress"/>

import loginPage from '../support/pages/login/'
import shaversPage from '../support/pages/shavers'

describe('login', () => {

  context('quando submeto o formulário', () => {

    it('deve logar com sucesso', () => {

      const user = {
        email: 'vinicius.maronezzi@example.com',
        password: 'pwd123',
        name: 'Vinicius'
      }

      loginPage.submit(user.email, user.password)
      shaversPage.header.userShouldBeLoggedIn(user.name)

    })

    it('não deve logar com senha incorreta', () => {

      const user = {
        email: 'vinicius.maronezzi@example.com',
        password: '123456',
        name: 'Vinicius'
      }

      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

      loginPage.submit(user.email, user.password)
      loginPage.noticeShouldBe(message)

    })

    it('não deve logar com email inexistente', () => {

      const user = {
        email: 'vinicius.maronezzi@teste.com',
        password: 'pwd123',
        name: 'Vinicius'
      }

      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

      loginPage.submit(user.email, user.password)
      loginPage.noticeShouldBe(message)

    })

    it('campos obrigatórios', () => {
      loginPage.submit()
      loginPage.requiredFields('E-mail é obrigatório','Senha é obrigatória' )
      
    })

  })

  context('Senha muito curta', () => {
    const passwords = [
      '1',
      '12',
      '123',
      '1234',
      '12345'

    ]

    passwords.forEach((p)=> {
      it(`não deve logar com a senha: ${p}`, ()=> {
        loginPage.submit('vinicius.maronezzi@example.com', p)
        loginPage.alertShouldBe('Pelo menos 6 caracteres')

      })
      
    })

  })

  context('Email no formato incorreto', () => {
    const emails = [
      'vini',
      'vini@',
      '$#@!#$',
      '@',
      '@.com.br'

    ]

    emails.forEach((e)=> {
      it(`não deve logar com o email: ${e}`, ()=> {
        loginPage.submit(e, 'pwd123')
        loginPage.alertShouldBe('Informe um email válido')

      })
      
    })

  })

})