/// <reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe ("Funcionalidade: Login", () => {

    beforeEach (() => {
        cy.visit ('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });
    it ('Deve fazer Login com sucesso', () => {
        cy.get('#username').type('Marceloteste@teste.com')
        cy.get('#password').type('togje1-pybzas-wygdiW')
        cy.get('.woocommerce-form > .button') .click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)') .should ('contain' , 'Olá, marceloteste (não é marceloteste? Sair)')
   
    })

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.visit ('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('Biancateste@teste.com')
        cy.get('#password').type('togje1-pybzas-wygdiW')
        cy.get('.woocommerce-form > .button') .click()

        //cy.get('.woocommerce-error') .should('contain' , 'Endereço de e-mail desconhecido.')
        cy.get('.woocommerce-error') .should('exist')

    });

    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.visit ('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('Marceloteste@teste.com')
        cy.get('#password').type('1234')
        cy.get('.woocommerce-form > .button') .click()
        cy.get('.woocommerce-error') .should('contain' , 'Erro: A senha fornecida para o e-mail Marceloteste@teste.com está incorreta. Perdeu a senha?')
        cy.get('.woocommerce-error') .should('exist')

    });

    it('Deve fazer login com sucesso usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button') .click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)') .should ('contain' , 'Olá, marceloteste (não é marceloteste? Sair)')
    });
    
    it.only('Deve fazer login com sucesso usando Fixture', () => {
        cy.fixture('perfil').then( dados => {
            cy.get('#username').type(dados.usuario , {log: false})
            cy.get('#password').type(dados.senha , {log: false})
            cy.get('.woocommerce-form > .button') .click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)') .should ('contain' , 'Olá, marceloteste (não é marceloteste? Sair)')
        })
    });
});