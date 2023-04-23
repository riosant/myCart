import cartReducer from "./cart/cartReducer";
import {combineReducers} from 'redux';
import shippingReducer from "./shipping/shippingReducer";
import billingReducer from "./billing/billingReducer";
import paymentReducer from "./payment/paymentReducer";

const rootReducer = combineReducers({
    cart: cartReducer,
    shipping: shippingReducer,
    billing: billingReducer,
    payment: paymentReducer
})

export default rootReducer