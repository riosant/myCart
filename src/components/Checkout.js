import {useSelector} from "react-redux";
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBCollapse, MDBRow} from "mdb-react-ui-kit";
import {useEffect, useState} from "react";
import ShippingDetails from "./ShippingDetails";
import BillingDetails from "./BillingDetails";
import PaymentDetails from "./PaymentDetails";
import {useNavigate} from "react-router-dom"

const Checkout = () => {

    const cart = useSelector(state => state.cart);
    const [totalItemsQuantityInCart, setTotalItemsQuantityInCart] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const navigate = useNavigate();

    const [isShippingCardVisible, setIsShippingCardVisible] = useState(true)
    const [isBillingCardVisible, setIsBillingCardVisible] = useState(false)
    const [isPaymentCardVisible, setIsPaymentCardVisible] = useState(false)

    const handleShippingCardToggler = () => {
        setIsShippingCardVisible(!isShippingCardVisible)
        setIsBillingCardVisible(false)
        setIsPaymentCardVisible(false)
    }

    const handleBillingCardToggler = () => {
        setIsBillingCardVisible(!isBillingCardVisible)
        setIsShippingCardVisible(false)
        setIsPaymentCardVisible(false)
    }

    const handlePaymentCardToggler = () => {
        setIsPaymentCardVisible(!isPaymentCardVisible)
        setIsBillingCardVisible(false)
        setIsShippingCardVisible(false)
    }

    const getTotalItemsInCart = () => {
        const quantity = cart.items.reduce((quantity, item) => {
            return quantity + item.quantity
        }, 0)

        setTotalItemsQuantityInCart(quantity)
    }

    const getTotalPrice = () => {
        const price = cart.items.reduce((price, item) => {
            return price + (item.quantity * item.discounted_price)
        }, 0)
        setTotalPrice(price)
    }

    useEffect(() => {
        getTotalItemsInCart()
        getTotalPrice()
        if(cart.items.length <= 0) {
            navigate("/")
        }
    }, [])

    return (
        <div>
            <h3>Checkout</h3>
            <MDBRow>
                <MDBCol md={9}>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBBtn outline color="secondary" onClick={handleShippingCardToggler}>
                                Shipping Address
                            </MDBBtn>
                            <MDBCollapse show={isShippingCardVisible}>
                                <ShippingDetails
                                    setIsShippingCardVisible={setIsShippingCardVisible}
                                    setIsBillingCardVisible={setIsBillingCardVisible}
                                    setIsPaymentCardVisible={setIsPaymentCardVisible}
                                />
                            </MDBCollapse>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBCard className="mt-3">
                        <MDBCardBody>
                            <MDBBtn outline color="secondary" onClick={handleBillingCardToggler}>
                                Billing Address
                            </MDBBtn>
                            <MDBCollapse show={isBillingCardVisible}>
                                <BillingDetails
                                    setIsShippingCardVisible={setIsShippingCardVisible}
                                    setIsBillingCardVisible={setIsBillingCardVisible}
                                    setIsPaymentCardVisible={setIsPaymentCardVisible}
                                />
                            </MDBCollapse>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBCard className="mt-3">
                        <MDBCardBody>
                            <MDBBtn outline color="secondary" onClick={handlePaymentCardToggler}>
                                Payment Method
                            </MDBBtn>
                            <MDBCollapse show={isPaymentCardVisible}>
                                <PaymentDetails
                                    setIsShippingCardVisible={setIsShippingCardVisible}
                                    setIsBillingCardVisible={setIsBillingCardVisible}
                                    setIsPaymentCardVisible={setIsPaymentCardVisible}
                                />
                            </MDBCollapse>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md={3}>
                    <MDBCard>
                        <MDBCardBody>
                            <h5 className="mb-3">Cart Summary</h5>
                            <div className="duo-box">
                                <p>Items</p>
                                <p>{totalItemsQuantityInCart}</p>
                            </div>
                            <div className="duo-box">
                                <p>Delivery</p>
                                <p>Free</p>
                            </div>

                            <hr/>

                            <div className="duo-box">
                                <h6>Total</h6>
                                <h6>${parseFloat(totalPrice).toFixed(2)}</h6>
                            </div>

                            {/*<MDBBtn onC className="w-100 mt-4">*/}
                            {/*    PLACE ORDER*/}
                            {/*</MDBBtn>*/}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
    )
}

export default Checkout