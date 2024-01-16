import forgotPassPage from "../support/pages/forgot-pass"
import resetPassPage from "../support/pages/reset-pass"
import loginPage from "../support/pages/login"
import shaversPage from "../support/pages/shavers"

describe('esqueci minha senha', () => {
    it('deve poder solicitar o resgate de senha', () => {
        
        const user = {
            name: 'Vinicius Esquecido',
            email: 'vinicius@gmail.com',
            password: 'pwd123',
            is_shaver: false
        }

        cy.createUser(user)

        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'

        forgotPassPage.go();
        forgotPassPage.submit(user.email);
        forgotPassPage.noticeShouldBe(message);
    })

    context('quando o usuário solicita resgate de senha', () => {

        const user = {
            name: 'Vinicius Clone',
            email: 'viniciusclone@gmail.com',
            password: 'pwd123',
            is_shaver: false
        }

        beforeEach(()=> {
            cy.createUser(user)
            cy.recoveryPass(user.email)
            cy.getToken(user.email)
        })

        it('deve poder cadastrar uma nova senha', () => {

            const message = 'Agora você já pode logar com a sua nova senha secreta.'

            resetPassPage.go(Cypress.env('passToken'));
            resetPassPage.submit('abc123', 'abc123');
            resetPassPage.noticeShouldBe(message);
        })

        afterEach(()=> {
            loginPage.submit(user.email, 'abc123');
            shaversPage.header.userShouldBeLoggedIn(user.name);
        })
    })
})
