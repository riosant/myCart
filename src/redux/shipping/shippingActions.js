import {ADD_DETAILS, UPDATE_DETAILS} from "./shippingTypes";

export const addShippingDetails = (payload) => {
    return {
        type: ADD_DETAILS,
        payload: payload
    }
}

export const updateShippingDetails = (payload) => {
    return {
        type: UPDATE_DETAILS,
        payload: payload
    }
}