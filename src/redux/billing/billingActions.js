import {ADD_DETAILS, UPDATE_DETAILS} from "./billingTypes";

export const addBillingDetails = (payload) => {
    return {
        type: ADD_DETAILS,
        payload: payload
    }
}

export const updateBillingDetails = (payload) => {
    return {
        type: UPDATE_DETAILS,
        payload: payload
    }
}