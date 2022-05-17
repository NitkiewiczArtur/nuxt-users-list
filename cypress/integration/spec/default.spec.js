import {CLOSE_WINDOW_DT, UZYTKOWNICY_URL} from "../../support/helper"

describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit(UZYTKOWNICY_URL)
    })
    it('When user waits for api response it displays loader',
        () => {
            cy.intercept(
                'POST',
                '**/api/user',
                {
                    delay: 3000,
                }
            )
            cy.addUser()
            cy.getElByDataId('loader').should('be.visible')
        })
    it('When api throws an error, error modal is displayed and close window btn works',
        () => {
            cy.intercept(
                'POST',
                '**/api/user',
                {
                    statusCode: 400,
                    error: {
                        message: 'error message'
                    }
                }
            )
            cy.addUser()
            cy.errorModalShouldBeVisible()
                .getElByDataId(CLOSE_WINDOW_DT).click()
                .modalShouldNotBeVisible()
        })
})
