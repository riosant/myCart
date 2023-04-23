import {ADD_PAYMENT, CHANGE_PAYMENT_MODE} from "./paymentTypes";

const initialState = {
    paymentMode: 'online',
    paymentDetails: {
        cardHolderName: '',
        cardNumber: '',
        expirationDate: '',
        CVV: ''
    }
}

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PAYMENT: {
            return {
                ...state,
                paymentDetails: {
                    ...state.paymentDetails,
                    cardHolderName: action.payload.cardHolderName,
                    cardNumber: action.payload.cardNumber1 + action.payload.cardNumber2 + action.payload.cardNumber3 + action.payload.cardNumber3,
                    expirationDate: action.payload.expirationMonth + "/" + action.payload.expirationYear,
                    CVV: action.payload.CVV
                }
            }
        }
        case CHANGE_PAYMENT_MODE: {
            return {
                ...state,
                paymentMode: action.payload
            }
        }
        default:
            return state
    }
}

export default paymentReducer