import cartReducer from "./cart/cartReducer";
import {combineReducers} from 'redux';
import shippingReducer from "./shipping/shippingReducer";
import billingReducer from "./billing/billingReducer";

const rootReducer = combineReducers({
    cart: cartReducer,
    shipping: shippingReducer,
    billing: billingReducer
})

export default rootReducer