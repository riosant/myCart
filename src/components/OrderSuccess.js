import {MDBCard, MDBCardBody} from "mdb-react-ui-kit";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

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

            <MDBCard className="order-success">
                <MDBCardBody>
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
                </MDBCardBody>
            </MDBCard>

            <MDBCard className="order-success mt-5">
                <MDBCardBody>
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
                </MDBCardBody>
            </MDBCard>

            <MDBCard className="order-success mt-5">
                <MDBCardBody>
                    <h6>Payment Details</h6>
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
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}

export default OrderSuccess