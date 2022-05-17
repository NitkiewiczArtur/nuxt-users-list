import {
    ADD_USER_BTN_DT,
    CANCEL_FORM_BTN_DT,
    DELETE_USER_BTN_DT,
    EDIT_USER_BTN_DT,
    EDITED_FIRST_NAME,
    EDITED_LAST_NAME,
    EDITED_PHONE,
    EDITED_TEST_EMAIL,
    EMAIL_INPUT_DT,
    FIRST_NAME_INPUT_DT,
    FULL_NAME_INPUT_DT,
    INITIAL_USERS_IN_DATABASE_COUNT,
    LAST_NAME_INPUT_DT,
    PHONE_INPUT_DT,
    SUBMIT_FORM_BTN_DT,
    TEST_EMAIL,
    TEST_FIRST_NAME,
    TEST_LAST_NAME,
    TEST_PHONE,
    UZYTKOWNICY_URL,
    WRONG_TEST_EMAIL
} from "../../support/helper"

const USER_ENDPOINT = '/api/user'

describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit(UZYTKOWNICY_URL)
    })
    it('When clicked add user btn and incorrect filling each field the form doesnt submit ' +
        'and cancel form btn closes the modal',
        () => {
            cy.getElByDataId(ADD_USER_BTN_DT).wait(1000).click()
                .getElByDataId(FIRST_NAME_INPUT_DT).type(`${TEST_FIRST_NAME}1`)
                .getElByDataId(LAST_NAME_INPUT_DT).type(TEST_LAST_NAME)
                .getElByDataId(EMAIL_INPUT_DT).type(TEST_EMAIL)
                .getElByDataId(PHONE_INPUT_DT).type(TEST_PHONE)
                .getElByDataId(SUBMIT_FORM_BTN_DT).click().wait(2000)
                .addUserModalShouldBeVisible()
                .getElByDataId(FIRST_NAME_INPUT_DT).type(`{backspace}`)
                .getElByDataId(LAST_NAME_INPUT_DT).type(`1`)
                .getElByDataId(SUBMIT_FORM_BTN_DT).click().wait(2000)
                .addUserModalShouldBeVisible()
                .getElByDataId(LAST_NAME_INPUT_DT).type(`{backspace}`)
                .getElByDataId(EMAIL_INPUT_DT).clear().type(WRONG_TEST_EMAIL)
                .getElByDataId(SUBMIT_FORM_BTN_DT).click().wait(2000)
                .addUserModalShouldBeVisible()
                .getElByDataId(EMAIL_INPUT_DT).clear().type(TEST_EMAIL)
                .getElByDataId(PHONE_INPUT_DT).type('{backspace}')
                .getElByDataId(SUBMIT_FORM_BTN_DT).click().wait(2000)
                .addUserModalShouldBeVisible()
                .getElByDataId(CANCEL_FORM_BTN_DT).click().wait(500)
                .modalShouldNotBeVisible()
        })
    it('When clicked add user btn and correct filling the form and submitting adds user to the list',
        () => {
            cy.log('may not pass if userSate cached userList from previous spec f.e. default.spec')
                .request(USER_ENDPOINT).then(response => {
                expect(response.body).to.have.length(0)
            })
            cy.tableRowsCountShouldBe(INITIAL_USERS_IN_DATABASE_COUNT)
            cy.getElByDataId(ADD_USER_BTN_DT).wait(1000).click()
                .getElByDataId(FIRST_NAME_INPUT_DT).type(TEST_FIRST_NAME)
                .getElByDataId(LAST_NAME_INPUT_DT).type(TEST_LAST_NAME)
                .getElByDataId(EMAIL_INPUT_DT).type(TEST_EMAIL)
                .getElByDataId(PHONE_INPUT_DT).type(TEST_PHONE)
                .getElByDataId(SUBMIT_FORM_BTN_DT).click().wait(2000)
                .tableRowsCountShouldBe(INITIAL_USERS_IN_DATABASE_COUNT + 1)
                .find('td')
                .first().should('have.text', TEST_FIRST_NAME)
                .next().should('have.text', TEST_LAST_NAME)
                .next().should('have.text', TEST_EMAIL)
                .next().should('have.text', TEST_PHONE)
        })
    it('When clicked edit user btn and correct filling the form and submitting edits user and updates the list',
        () => {
            cy.getElByDataId(EDIT_USER_BTN_DT).wait(1000).click()
                .getElByDataId(FIRST_NAME_INPUT_DT).clear().type(EDITED_FIRST_NAME)
                .getElByDataId(LAST_NAME_INPUT_DT).clear().type(EDITED_LAST_NAME)
                .getElByDataId(EMAIL_INPUT_DT).clear().type(EDITED_TEST_EMAIL)
                .getElByDataId(PHONE_INPUT_DT).clear().type(EDITED_PHONE)
                .getElByDataId(SUBMIT_FORM_BTN_DT).click().wait(1000)
                .tableRowsCountShouldBe(INITIAL_USERS_IN_DATABASE_COUNT + 1)
                .find('td')
                .first().should('have.text', EDITED_FIRST_NAME)
                .next().should('have.text', EDITED_LAST_NAME)
                .next().should('have.text', EDITED_TEST_EMAIL)
                .next().should('have.text', EDITED_PHONE)
        })
    it('When clicked delete user btn and incorrect filling the form and submitting doesnt delete user ' +
        'and cancel form btn closes the modal',
        () => {
            cy.getElByDataId(DELETE_USER_BTN_DT).wait(1000).click()
                .getElByDataId(FULL_NAME_INPUT_DT).type(`${EDITED_FIRST_NAME}1${EDITED_LAST_NAME}`)
                .getElByDataId(SUBMIT_FORM_BTN_DT).click().wait(2000)
                .deleteUserModalShouldBeVisible()
                .getElByDataId(CANCEL_FORM_BTN_DT).click()
                .modalShouldNotBeVisible()
        })
    it('When clicked delete user btn and correct filling the form and submitting deletes the user and updates ' +
        'the list',
        () => {
            cy.getElByDataId(DELETE_USER_BTN_DT).wait(1000).click()
                .getElByDataId(FULL_NAME_INPUT_DT).type(`${EDITED_FIRST_NAME} ${EDITED_LAST_NAME}`)
                .getElByDataId(SUBMIT_FORM_BTN_DT).click().wait(1000)
                .tableRowsCountShouldBe(INITIAL_USERS_IN_DATABASE_COUNT)
        })
})
