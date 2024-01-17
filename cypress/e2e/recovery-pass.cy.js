import forgotPassPage from "../support/pages/forgot-pass"
import resetPassPage from "../support/pages/reset-pass"
import loginPage from "../support/pages/login"
import shaversPage from "../support/pages/shavers"

describe('forgot password', () => {
    it('should request password recovery', () => {
        
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

    context('when user request password recovery', () => {

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

        it('should register a new password', () => {

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
