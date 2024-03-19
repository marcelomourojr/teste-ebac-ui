/// <reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {

    beforeEach (() => {
        produtosPage.visitarUrl()
    });
    
    it('Deve selecionar um produto da lista', () => {
        produtosPage.buscarProdutoLista('Abominable Hoodie')
        cy.get('.woocommerce-product-details__short-description > p').should('contain', 'variable')
    });

    it('Deve buscar um produto com sucesso', () => {
        let produto = ('Zeppelin Yoga Pant')
        produtosPage.buscarProduto(produto)
        cy.get('.product_title') .should('contain', produto)

    });

    it('Deve visitar a página do produto', () => {
        produtosPage.visitarProduto('Aether Gym Pant')
    });

    it('Deve colocar o produto no carrinho', () => {
        let qtd = 7
        produtosPage.buscarProduto('Abominable Hoodie')
        produtosPage.addProdutoCarrinho('M', 'Red', qtd)

        cy.get('.woocommerce-message') .should('contain', qtd + ' × “Abominable Hoodie” foram adicionados no seu carrinho.')
    });

    it.only('Deve colocar o produto no carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProduto(dados[1].nomeProduto)
            produtosPage.addProdutoCarrinho(
                dados[1].tamanho, 
                dados[1].cor, 
                dados[1].quantidade)

            cy.get('.woocommerce-message') .should('contain', dados[1].nomeProduto) 
        })
    });

})