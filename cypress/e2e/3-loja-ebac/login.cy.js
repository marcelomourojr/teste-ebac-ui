/// <reference types="cypress"/>

describe ("Funcionalidade: Login", () => {

    it ('Deve fazer Login com sucesso', () => {
        cy.visit ('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('Marceloteste@teste.com')
        cy.get('#password').type('togje1-pybzas-wygdiW')
        cy.get('.woocommerce-form > .button') .click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)') .should ('contain' , 'Olá, marceloteste (não é marceloteste? Sair)')

    })
})