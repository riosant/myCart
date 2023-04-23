import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"
import {Card} from "react-bootstrap";

const OrderSuccess = () => {

    const shipping = useSelector(state => state.shipping)
    const billing = useSelector(state => state.billing)
    const payment = useSelector(state => state.payment)
    const cart = useSelector(state => state.cart);
    const navigate = useNavigate()

    const reduxState = useSelector(state => state)

    useEffect(() => {
        if(cart.items.length <= 0) {
            navigate("/")
        }
    }, [])

    console.log("Redux State : ", reduxState)

    return (
        <div className="order-success-box">
            <h6><i className="fas fa-caret-right"/> Order placed successfully</h6>

            <Card className="order-success">
                <Card.Body>
                    <h6>Shipping Details</h6>
                    <div className="form-group">
                        <label>Full Name</label>
                        {shipping.fullName}
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        {shipping.address}
                    </div>

                    <div className="form-group">
                        <label>Country</label>
                        {shipping.country}
                    </div>

                    <div className="form-group">
                        <label>State</label>
                        {shipping.state}
                    </div>

                    <div className="form-group">
                        <label>City</label>
                        {shipping.city}
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        {shipping.phone}
                    </div>
                </Card.Body>
            </Card>

            <Card className="order-success mt-5">
                <Card.Body>
                    <h6>Billing Details</h6>
                    <div className="form-group">
                        <label>Full Name</label>
                        {billing.fullName}
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        {billing.address}
                    </div>

                    <div className="form-group">
                        <label>Country</label>
                        {billing.country}
                    </div>

                    <div className="form-group">
                        <label>State</label>
                        {billing.state}
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        {billing.city}
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        {billing.phone}
                    </div>
                </Card.Body>
            </Card>

            <Card className="order-success mt-5">
                <Card.Body>
                    <h6>Payment Details</h6>

                    <div className="form-group">
                        <label>Payment Mode</label>
                        {payment.paymentMode}
                    </div>

                    <div className="form-group">
                        <label>Cardholder Name</label>
                        {payment.paymentDetails.cardHolderName}
                    </div>

                    <div className="form-group">
                        <label>Card Number</label>
                        {payment.paymentDetails.cardNumber}
                    </div>

                    <div className="form-group">
                        <label>Expiry Date</label>
                        {payment.paymentDetails.expirationDate}
                    </div>

                    <div className="form-group">
                        <label>CVV</label>
                        {payment.paymentDetails.CVV}
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default OrderSuccess