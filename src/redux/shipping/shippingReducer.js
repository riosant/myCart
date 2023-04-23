import {ADD_DETAILS, UPDATE_DETAILS} from "./shippingTypes";

const initialState = {
    fullName: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    phone: ''
}

const shippingReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DETAILS: {
            console.log(action.payload)
            return {
                ...state,
                fullName: action.payload.fullName,
                address: action.payload.address,
                country: action.payload.country,
                state: action.payload.state,
                city: action.payload.city,
                pincode: action.payload.pincode,
                phone: action.payload.phone
            }
        }
        case UPDATE_DETAILS:
            return {
                ...state,
                fullName: action.payload.fullName,
                address: action.payload.address,
                country: action.payload.country,
                state: action.payload.state,
                city: action.payload.city,
                pincode: action.payload.pincode,
                phone: action.payload.phone
            }
        default:
            return state

    }
}

export default shippingReducer