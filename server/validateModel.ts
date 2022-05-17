import {User} from '~/models/user';

const BAD_REQUEST = 400;

type ValidationStatus = {
    statusCode: number
    statusMessage: string
}
//Zakładam, że przyjmujemy tylko Polskie numery i że ten regex spełnia to kryterium:).
// regex od https://github.com/skotniczny/phonePL
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
};

const isNameValid = (firstName: string) => {
    return !!String(firstName)
        .match(/^[ a-zA-Z\-\’]+$/)
}

export const validateModel = async (body: Partial<User>): Promise<ValidationStatus | true> => {
    if (body.email && body.firstName && body.lastName && body.phone) {
        if (!isNameValid(body.firstName))
            return {
                statusCode: BAD_REQUEST,
                statusMessage: 'First name is invalid',
            }
        if (!isNameValid(body.lastName))
            return {
                statusCode: BAD_REQUEST,
                statusMessage: 'Last name is invalid',
            }
        if (!isEmailValid(body.email))
            return {
                statusCode: BAD_REQUEST,
                statusMessage: 'Email is invalid',
            }
        if (!isPhoneValid(body.phone))
            return {
                statusCode: BAD_REQUEST,
                statusMessage: 'Phone is invalid',
            }
        return true
    } else return {
        statusCode: BAD_REQUEST,
        statusMessage: 'Model is invalid',
    }
}
