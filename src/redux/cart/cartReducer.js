import {
    ADD_ITEM_FAILURE,
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    DECREASE_QUANTITY_REQUEST, DECREASE_QUANTITY_SUCCESS,
    INCREASE_QUANTITY_REQUEST,
    INCREASE_QUANTITY_SUCCESS, REMOVE_ITEM_REQUEST, REMOVE_ITEM_SUCCESS,
    UPDATE_QUANTITY_FAILURE,
    UPDATE_QUANTITY_REQUEST,
    UPDATE_QUANTITY_SUCCESS
} from "./cartTypes";

const initialState = {
    loading: false,
    items: [],
    error: ''
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case ADD_ITEM_SUCCESS: {
            return {
                loading: false,
                items: [...state.items, {
                    ...action.payload,
                    quantity: 1
                }],
                error: ''
            }
        }
        case REMOVE_ITEM_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case REMOVE_ITEM_SUCCESS: {
            return {
                loading: false,
                items: [...state.items.filter(product => action.payload !== product.id)],
                error: ''
            }
        }
        case INCREASE_QUANTITY_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case INCREASE_QUANTITY_SUCCESS: {
            return {
                loading: false,
                items: [
                    ...state.items.map(product => {
                        return action.payload === product.id
                            ? {...product, quantity: product.quantity + 1}
                            : {...product}
                    })
                ],
                error: ''
            }
        }
        case DECREASE_QUANTITY_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case DECREASE_QUANTITY_SUCCESS: {
            return {
                loading: false,
                items: [
                    ...state.items.map(product => {
                        return action.payload === product.id
                            ? {...product, quantity: product.quantity - 1}
                            : {...product}
                    })
                ],
                error: ''
            }
        }
        default:
            return state
    }
}


export default cartReducer