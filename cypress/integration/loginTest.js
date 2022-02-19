/// <reference types="cypress" />
let demoBtn = ".demo"
let userName = "[name=username]"
let passWord = "[name=password]"
let firstPaint = "nb-layout-column"
let urlToBeVerified = "staging.mainteny.com/pages/dashboard"
let forgetPassword = ".forgot-password > a"
let backToMainPage = ".back"

describe('Login test Suite', () => {

    beforeEach('Load page', () => {
        cy.visit('/')
        cy.get('.content').should('be.visible')
    })

    it('Test Page Load & Visiblity of elements ', () => {
        cy.get(demoBtn).should('be.visible')
        cy.get('form.ng-untouched').should('be.visible')
        cy.get('.top > div').should('be.visible')
        cy.get('.logo > svg').should('be.visible')
    })

    it('Test Demo - functionality I', () => {
        cy.get(demoBtn).click()
        cy.get(firstPaint).should('be.visible')
        cy.url().should('contain', urlToBeVerified);
        cy.Logout()

    })

    it('Test Demo - functionality II', () => {
        cy.get('.blue-button').click()
        cy.get(firstPaint).should('be.visible')
        cy.url().should('contain', urlToBeVerified);
        cy.Logout()

    })

    it('Test -ve Login & error Validation ', () => {
        cy.get(userName).type(Cypress.env('userLogin'))
        cy.get(passWord).type('1234').type('{enter}')
        cy.contains('Bad username or password').should('be.visible')
    })

    it('Test Sucessful Login ', () => {
        cy.get(userName).type(Cypress.env('userLogin'))
        cy.get(passWord).type(Cypress.env('Password')).type('{enter}')
        cy.get(firstPaint).should('be.visible')
        cy.contains('Martin Lundquist').should('be.visible')
        cy.Logout()
    })

    it('Forgot Password Page I', () => {
        cy.get(forgetPassword).click()
        cy.contains('Reset Password').should('be.visible')
        cy.get(userName).type('test').type('{enter}')
        cy.contains('Please check if you have an account with us').should('be.visible')
        cy.get(backToMainPage).click()
        cy.contains('Login').should('be.visible')
    })

    it('Forgot Password Page II', () => {
        cy.get(forgetPassword).click()
        cy.contains('Reset Password').should('be.visible')
        cy.get(userName).type(Cypress.env('userLogin'))
        cy.contains('Get Token').click()
        cy.get('.info').should('be.visible')
        cy.get(backToMainPage).click()
        cy.contains('Login').should('be.visible')
    })

})