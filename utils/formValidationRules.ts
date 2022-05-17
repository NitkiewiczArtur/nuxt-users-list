export const emailRules = [
    v => !!v || 'E-mail jest wymagany',
    v => containsDot(v) || 'Email musi posiadać kropkę',
    v => containsAt(v) || 'Email musi posiadać @',
    v => isEmailValid(v) || 'E-mail musi być poprawny',
]
export const phoneRules = [
    v => !!v || 'Nr telefonu jest wymagany',
    v => isPhoneValid(v) || 'Nr telefonu musi być poprawnie zapisanym polskim numerem',
]
export const firstNameRules = [
    v => !!v || 'Imię jest wymagane',
    v => !containsNumber(v) || 'Imię nie może posiadać liczb',
    v => !containsSpecialChars(v) || 'Imię nie może posiadać znaków specjalnych',
    v => isNameValid(v) || 'Imię musi być poprawne'
]
export const lastNameRules = [
    v => !!v || 'Nazwisko jest wymagane',
    v => !containsNumber(v) || 'Imię nie może posiadać liczb',
    v => !containsSpecialChars(v) || 'Imię nie może posiadać znaków specjalnych',
    v => isNameValid(v) || 'Nazwisko musi być poprawne'
]

const containsDot = v => !!v.match(/[.]/)
const containsAt = v => !!v.match(/[@]/)
const containsNumber = v => !!v.match(/[0-9]/)
const containsSpecialChars = v => !!v.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)

//Nuxt alarms when importing it from server dir, so I just copied it from validateModel.ts
const isPhoneValid = (phone: string) => {
    return !!String(phone)
        .match(/(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-8]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/)
}
const isEmailValid = (email: string) => {
    return !!String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}
const isNameValid = (firstName: string) => {
    return !!String(firstName)
        .match(/^[ a-zA-Z\-\’]+$/)
}
