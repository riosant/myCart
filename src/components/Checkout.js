import {useSelector} from "react-redux";
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBCollapse, MDBRow} from "mdb-react-ui-kit";
import {useState} from "react";
import ShippingDetails from "./ShippingDetails";
import BillingDetails from "./BillingDetails";
import PaymentDetails from "./PaymentDetails";

const Checkout = () => {

    const cart = useSelector(state => state.cart);
    const shipping = useSelector(state => state.shipping)

    const [isShippingCardVisible, setIsShippingCardVisible] = useState(false)
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
                                <PaymentDetails/>
                            </MDBCollapse>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md={3}>
                    <MDBCard>
                        <MDBCardBody>
                            <h5 className="mb-3">Cart Summary</h5>
                            {cart.items.map(product => {
                                return <div className="duo-box" key={product.id}>
                                    <p>{product.name}</p>
                                    <p>{product.currency}{parseFloat(product.discounted_price).toFixed(2)}</p>
                                </div>
                            })}
                            <hr/>
                            <div className="duo-box">
                                <p>GST 18%</p>
                                <p></p>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
    )
}

export default Checkout