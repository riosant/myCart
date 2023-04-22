import {
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    REMOVE_ITEM_REQUEST,
    REMOVE_ITEM_SUCCESS,
    INCREASE_QUANTITY_SUCCESS, DECREASE_QUANTITY_REQUEST, DECREASE_QUANTITY_SUCCESS, INCREASE_QUANTITY_REQUEST
} from "./cartTypes";


export const addItemToCartRequest = () => {
    return {
        type: ADD_ITEM_REQUEST
    }
}

export const addItemToCartSuccess = payload => {
    return {
        type: ADD_ITEM_SUCCESS,
        payload: payload
    }
}

export const removeItemFromCartRequest = () => {
    return {
        type: REMOVE_ITEM_REQUEST,
    }
}

export const removeItemFromCartSuccess = payload => {
    console.log(payload)
    return {
        type: REMOVE_ITEM_SUCCESS,
        payload: payload
    }
}

export const increaseQuantityRequest = () => {
    console.log('runnign')
    return {
        type: INCREASE_QUANTITY_REQUEST,
    }
}

export const increaseQuantitySuccess = (payload) => {
    return {
        type: INCREASE_QUANTITY_SUCCESS,
        payload: payload
    }
}

export const decreaseQuantityRequest = () => {
    return {
        type: DECREASE_QUANTITY_REQUEST,
    }
}

export const decreaseQuantitySuccess = (payload) => {
    return {
        type: DECREASE_QUANTITY_SUCCESS,
        payload: payload
    }
}

export const addItemToCart = product => {
    return dispatch => {
        dispatch(addItemToCartRequest());
        dispatch(addItemToCartSuccess(product));
    }
}
export const removeItemFromCart = productId => {
    console.log(productId)
    return dispatch => {
        console.log(productId)
        dispatch(removeItemFromCartRequest());
        dispatch(removeItemFromCartSuccess(productId));
    }
}
export const increaseQuantity = (productId) => {
    return dispatch => {
        dispatch(increaseQuantityRequest());
        dispatch(increaseQuantitySuccess(productId))
    }
}

export const decreaseQuantity = (productId) => {
    return dispatch => {
        dispatch(decreaseQuantityRequest());
        dispatch(decreaseQuantitySuccess(productId))
    }
}
