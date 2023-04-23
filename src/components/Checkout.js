import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ShippingDetails from "./ShippingDetails";
import BillingDetails from "./BillingDetails";
import PaymentDetails from "./PaymentDetails";
import {useNavigate} from "react-router-dom"
import CurrencyFormat from "react-currency-format"
import {Button, Card, Col, Collapse, Row} from "react-bootstrap";

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

    const handlePaymentCardToggler = () => {
        setIsBillingCardVisible(true)
        setIsShippingCardVisible(false)
        setIsPaymentCardVisible(false)
    }

    const handleBillingCardToggler = () => {
        setIsShippingCardVisible(true)
        setIsBillingCardVisible(false)
        setIsPaymentCardVisible(false)
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
        setTotalPrice(parseFloat(price).toFixed(2))
    }

    useEffect(() => {
        getTotalItemsInCart()
        getTotalPrice()
        if (cart.items.length <= 0) {
            navigate("/")
        }
    }, [])

    return (
        <div>
            <h3><i className="fas fa-caret-right"/> Checkout</h3>
            <Row className="mt-4">
                <Col md={9}>
                    <Card>
                        <Card.Body>
                            <h6
                                className="checkout-navigator"
                                color="secondary"
                                aria-controls="shipping-box"
                                aria-expanded={isShippingCardVisible}
                            >Shipping Address</h6>
                            <Collapse in={isShippingCardVisible}>
                                <div id="shipping-box">
                                    <ShippingDetails
                                        setIsShippingCardVisible={setIsShippingCardVisible}
                                        setIsBillingCardVisible={setIsBillingCardVisible}
                                        setIsPaymentCardVisible={setIsPaymentCardVisible}
                                    />
                                </div>
                            </Collapse>
                        </Card.Body>
                    </Card>

                    <Card className="mt-3">
                        <Card.Body>
                            <div
                                className="checkout-navigator"
                                onClick={handleBillingCardToggler}
                                aria-controls="billing-box"
                                aria-expanded={isBillingCardVisible}
                            >
                                <i className="fas fa-arrow-left"/>
                                <h6 color="secondary">Billing Address</h6>
                            </div>

                            <Collapse in={isBillingCardVisible}>
                                <div id="billing-box">
                                    <BillingDetails
                                        setIsShippingCardVisible={setIsShippingCardVisible}
                                        setIsBillingCardVisible={setIsBillingCardVisible}
                                        setIsPaymentCardVisible={setIsPaymentCardVisible}
                                    />
                                </div>
                            </Collapse>
                        </Card.Body>
                    </Card>

                    <Card className="mt-3">
                        <Card.Body>
                            <div
                                className="checkout-navigator"
                                onClick={handlePaymentCardToggler}
                                aria-controls="payment-box"
                                aria-expanded={isPaymentCardVisible}
                            >
                                <i className="fas fa-arrow-left"/>
                                <h6 color="secondary">Payment Method</h6>
                            </div>
                            <Collapse in={isPaymentCardVisible}>
                                <div id="payment-box">
                                    <PaymentDetails
                                        setIsShippingCardVisible={setIsShippingCardVisible}
                                        setIsBillingCardVisible={setIsBillingCardVisible}
                                        setIsPaymentCardVisible={setIsPaymentCardVisible}
                                    />
                                </div>

                            </Collapse>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="card-summary">
                        <Card.Body>
                            <h5 className="mb-3">Cart Summary</h5>
                            {cart.items.map(item => {
                                return <div className="duo-box" key={item.name}>
                                    <div className="duo-box-inner">
                                        <p>{item.name} </p>
                                        <p>({item.quantity})</p>
                                    </div>
                                    <p>
                                        <CurrencyFormat
                                            value={parseFloat(item.discounted_price * item.quantity).toFixed(2)}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}/></p>
                                </div>
                            })}
                            <div className="duo-box mt-5">
                                <p>Total Items</p>
                                <p>{totalItemsQuantityInCart}</p>
                            </div>
                            <div className="duo-box">
                                <p>Delivery</p>
                                <p>Free</p>
                            </div>

                            <hr/>

                            <div className="duo-box">
                                <h6>Total</h6>
                                <h6><CurrencyFormat value={totalPrice} displayType={'text'} thousandSeparator={true}
                                                    prefix={'$'}/></h6>
                            </div>


                            {/*<MDBBtn onC className="w-100 mt-4">*/}
                            {/*    PLACE ORDER*/}
                            {/*</MDBBtn>*/}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Checkout