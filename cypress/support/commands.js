import {
    ADD_USER_BTN_DT, EMAIL_INPUT_DT, FIRST_NAME_INPUT_DT, LAST_NAME_INPUT_DT, PHONE_INPUT_DT,
    SUBMIT_FORM_BTN_DT, TEST_EMAIL, TEST_FIRST_NAME, TEST_LAST_NAME, TEST_PHONE, USER_EDIT_MODAL_TITLE,
    USER_ADD_MODAL_TITLE, USER_DELETE_MODAL_TITLE, ERROR_MODAL_TITLE
} from "./helper";

Cypress.Commands.add('getElByDataId', (id) => {
    cy.get(`[data-test='${id}']`);
});
Cypress.Commands.add('addUserModalShouldBeVisible', () => {
    cy.get('.modal__wrapper ').should('be.visible')
        .get('.v-card-title').should('have.text', USER_ADD_MODAL_TITLE)
});
Cypress.Commands.add('editUserModalShouldBeVisible', () => {
    cy.get('.modal__wrapper ').should('be.visible')
        .get('.v-card-title').should('have.text', USER_EDIT_MODAL_TITLE)
});
Cypress.Commands.add('deleteUserModalShouldBeVisible', () => {
    cy.get('.modal__wrapper ').should('be.visible')
        .get('.v-card-title').should('have.text', USER_DELETE_MODAL_TITLE)
});
Cypress.Commands.add('errorModalShouldBeVisible', () => {
    cy.get('.modal__wrapper ').should('be.visible')
        .get('.v-card-title').should('have.text', ERROR_MODAL_TITLE)
});
Cypress.Commands.add('modalShouldNotBeVisible', () => {
    cy.get('.modal__wrapper').should('have.length', 0)
});
Cypress.Commands.add('tableRowsCountShouldBe', (count) => {
    cy.get('tbody tr').should('have.length', count)
});
Cypress.Commands.add('addUser', () => {
    cy.getElByDataId(ADD_USER_BTN_DT).wait(1000).click()
        .getElByDataId(FIRST_NAME_INPUT_DT).type(TEST_FIRST_NAME)
        .getElByDataId(LAST_NAME_INPUT_DT).type(TEST_LAST_NAME)
        .getElByDataId(EMAIL_INPUT_DT).type(TEST_EMAIL)
        .getElByDataId(PHONE_INPUT_DT).type(TEST_PHONE)
        .getElByDataId(SUBMIT_FORM_BTN_DT).click().wait(1000)
});
