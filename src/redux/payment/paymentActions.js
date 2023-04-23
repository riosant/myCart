import {ADD_PAYMENT, CHANGE_PAYMENT_MODE} from "./paymentTypes";

export const addPaymentDetails = payload => {
    return {
        type: ADD_PAYMENT,
        payload: payload
    }
}

export const changePaymentMode = payload => {
    return {
        type: CHANGE_PAYMENT_MODE,
        payload: payload
    }
}