/// <reference types="cypress" />
const sessionUrl = "https://staging.mainteny.com/api/sessions/login"
const cedsObj = {
    "password": "Andreas@1234",
    "username": "andreas@finch.com"
}
let token = ""
const serviceOrdersUrl = "https://staging.mainteny.com/api/serviceOrders"



describe('ServiceOrder api testing', () => {
    before('Token Generation', () => {
        cy.request({
            method: 'POST',
            url: sessionUrl,
            body: cedsObj
        }).as('sessnioRequest');
        cy.get('@sessnioRequest').then(todos => {
            expect(todos.status).to.eq(200);
            token = todos.body.token
        });
    });

    it('Test ServiceOrder API', () => {
        const params = {
            serviceCompanyId: "9d85be2d-ceb9-4b19-a350-9f512b4b57e4",
            query: "",
            pageSize: 50,
            status: "INIT",
            status: "READY_TO_SCHEDULE",
            start: "2021-02-19T07:14:21.482Z",
            end: "2023-02-19T07:14:21.482Z",
            orderBy: "CREATED_TIME",
            order: "ASC",
            pageIndex: 0
        }
        cy.log(token)
        cy.request({
            method: 'GET',
            url: serviceOrdersUrl,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            qs: params
        }).as('serviceOrderResp');
        cy.get('@serviceOrderResp').then(orderResp => {
            expect(orderResp.status).to.eq(200)

        })
    })

    it('Test ServiceOrder API - pageSize = 0', () => {
        const params = {
            serviceCompanyId: "9d85be2d-ceb9-4b19-a350-9f512b4b57e4",
            pageSize: 0,
            query: "",
            status: "INIT",
            status: "READY_TO_SCHEDULE",
            start: "2021-02-19T07:14:21.482Z",
            end: "2023-02-19T07:14:21.482Z",
            orderBy: "CREATED_TIME",
            order: "ASC",
            pageIndex: 0
        }
        cy.log(token)
        cy.request({
            method: 'GET',
            url: serviceOrdersUrl,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            qs: params,
            failOnStatusCode: false
        }).as('serviceOrderResp');
        cy.get('@serviceOrderResp').then(orderResp => {
            expect(orderResp.status).to.eq(400)

        })
    })

    it('Test ServiceOrder API - empty order', () => {
        const params = {
            serviceCompanyId: "9d85be2d-ceb9-4b19-a350-9f512b4b57e4",
            pageSize: 1,
            query: "",
            status: "INIT",
            status: "READY_TO_SCHEDULE",
            start: "2021-02-19T07:14:21.482Z",
            end: "2023-02-19T07:14:21.482Z",
            orderBy: "CREATED_TIME",
            order: "",
            pageIndex: 0
        }
        cy.log(token)
        cy.request({
            method: 'GET',
            url: serviceOrdersUrl,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            qs: params,
            failOnStatusCode: false
        }).as('serviceOrderResp');
        cy.get('@serviceOrderResp').then(orderResp => {
            expect(orderResp.status).to.eq(500)

        })
    })

    it('Test ServiceOrder API - empty orderBy', () => {
        const params = {
            serviceCompanyId: "9d85be2d-ceb9-4b19-a350-9f512b4b57e4",
            query: "",
            pageSize: 50,
            status: "INIT",
            status: "READY_TO_SCHEDULE",
            start: "2021-02-19T07:14:21.482Z",
            end: "2023-02-19T07:14:21.482Z",
            orderBy: "",
            order: "DESC",
            pageIndex: 0
        }
        cy.log(token)
        cy.request({
            method: 'GET',
            url: serviceOrdersUrl,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            qs: params,
            failOnStatusCode: false
        }).as('serviceOrderResp');
        cy.get('@serviceOrderResp').then(orderResp => {
            expect(orderResp.status).to.eq(500)

        })
    })

    it('Test ServiceOrder API - -ve pageIndex', () => {
        const params = {
            serviceCompanyId: "9d85be2d-ceb9-4b19-a350-9f512b4b57e4",
            pageSize: -1,
            query: "",
            status: "INIT",
            status: "READY_TO_SCHEDULE",
            start: "2021-02-19T07:14:21.482Z",
            end: "2023-02-19T07:14:21.482Z",
            orderBy: "CREATED_TIME",
            order: "DESC",
            pageIndex: 0
        }
        cy.log(token)
        cy.request({
            method: 'GET',
            url: serviceOrdersUrl,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            qs: params,
            failOnStatusCode: false
        }).as('serviceOrderResp');
        cy.get('@serviceOrderResp').then(orderResp => {
            expect(orderResp.status).to.eq(400)

        })
    })

    it('Test ServiceOrder API - pagesize > 500', () => {
        const params = {
            serviceCompanyId: "9d85be2d-ceb9-4b19-a350-9f512b4b57e4",
            pageSize: 1000,
            query: "",
            status: "INIT",
            status: "READY_TO_SCHEDULE",
            start: "2021-02-19T07:14:21.482Z",
            end: "2023-02-19T07:14:21.482Z",
            orderBy: "CREATED_TIME",
            order: "DESC",
            pageIndex: 0
        }
        cy.log(token)
        cy.request({
            method: 'GET',
            url: serviceOrdersUrl,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            qs: params,
            failOnStatusCode: false
        }).as('serviceOrderResp');
        cy.get('@serviceOrderResp').then(orderResp => {
            expect(orderResp.status).to.eq(400)

        })
    })

    it('Test ServiceOrder API - empty ID', () => {
        const params = {
            serviceCompanyId: "",
            query: "",
            pageSize: 50,
            status: "INIT",
            status: "READY_TO_SCHEDULE",
            start: "2021-02-19T07:14:21.482Z",
            end: "2023-02-19T07:14:21.482Z",
            orderBy: "CREATED_TIME",
            order: "DESC",
            pageIndex: 0
        }
        cy.log(token)
        cy.request({
            method: 'GET',
            url: serviceOrdersUrl,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            qs: params,
            failOnStatusCode: false
        }).as('serviceOrderResp');
        cy.get('@serviceOrderResp').then(orderResp => {
            expect(orderResp.status).to.eq(500)

        })
    })

    it('Test ServiceOrder API - Invalid ID', () => {
        const params = {
            serviceCompanyId: "d85be2d-ceb9-4b19-a350-9f512b4b57e4",
            query: "",
            pageSize: 50,
            status: "INIT",
            status: "READY_TO_SCHEDULE",
            start: "2021-02-19T07:14:21.482Z",
            end: "2023-02-19T07:14:21.482Z",
            orderBy: "CREATED_TIME",
            order: "DESC",
            pageIndex: 0
        }
        cy.log(token)
        cy.request({
            method: 'GET',
            url: serviceOrdersUrl,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            qs: params,
            failOnStatusCode: false
        }).as('serviceOrderResp');
        cy.get('@serviceOrderResp').then(orderResp => {
            expect(orderResp.status).to.eq(403)

        })
    })
});