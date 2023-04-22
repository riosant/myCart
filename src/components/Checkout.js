import {useSelector} from "react-redux";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBCollapse,
    MDBContainer, MDBDropdown,
    MDBInput,
    MDBRow,
    MDBTextArea
} from "mdb-react-ui-kit";
import {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
    // addressType: Yup.string().required('Please enter address title')
});
const Checkout = () => {

    const cart = useSelector(state => state.cart);
    const [isShippingCardVisible, setIsShippingCardVisible] = useState(false)
    const [isBillingCardVisible, setIsBillingCardVisible] = useState(false)
    const [isPaymentCardVisible, setIsPaymentCardVisible] = useState(false)

    const handleShippingSubmit = values => {
        setIsShippingCardVisible(false)
        setIsBillingCardVisible(true)
    }

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
                                <Formik
                                    initialValues={{
                                        addressType: '',
                                        address: '',
                                        fullName: '',
                                        phone: '',
                                        country: '',
                                        state: '',
                                        city: '',
                                        pincode: ''
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        handleShippingSubmit(values);
                                    }}
                                >
                                    {({values, errors, setFieldValue}) => (
                                        <Form>
                                            {console.log(values, errors)}
                                            <div className="shipping-details-box">
                                                <MDBRow>
                                                    <MDBCol md={12} className="form-group">
                                                        <MDBInput
                                                            label='Address Type*'
                                                            id='addressType'
                                                            type='text'
                                                            onChange={element => setFieldValue('addressType', element.target.value)}
                                                        />
                                                        <span className="error"> {errors.addressTitle} </span>
                                                    </MDBCol>

                                                    <MDBCol md={12} className="form-group">
                                                        <MDBTextArea
                                                            name="address"
                                                            label='Shipping Address*'
                                                            id='address'
                                                            onChange={element => setFieldValue('address', element.target.value)}
                                                        ></MDBTextArea>
                                                        <span className="error"> {errors.addressTitle} </span>
                                                    </MDBCol>


                                                    <MDBCol md={12} className="form-group">
                                                        <MDBInput
                                                            label='Full Name*'
                                                            id='addressTitle'
                                                            type='text'
                                                            onChange={element => setFieldValue('addressTitle', element.target.value)}
                                                        />
                                                        <span className="error"> {errors.addressTitle} </span>
                                                    </MDBCol>

                                                    <MDBCol md={6} className="form-group">
                                                        <select
                                                            name="country"
                                                            className="form-select fs-8"
                                                            onChange={e => {
                                                                console.log(e.target.value)
                                                                setFieldValue('country', e.target.value)
                                                            }}
                                                        >
                                                            <option value="">Choose Country</option>
                                                            <option value="India">India</option>
                                                            <option value="USA">USA</option>
                                                            <option value="Canada">Canada</option>
                                                        </select>
                                                    </MDBCol>

                                                    <MDBCol md={6} className="form-group">
                                                        <select
                                                            name="state"
                                                            className="form-select fs-8"
                                                            onChange={e => {
                                                                console.log(e.target.value)
                                                                setFieldValue('state', e.target.value)
                                                            }}
                                                        >
                                                            <option value="">Choose State</option>
                                                            <option value="Maharashtra">Maharashtra</option>
                                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                        </select>
                                                    </MDBCol>

                                                    <MDBCol md={6} className="form-group">
                                                        <select
                                                            name="country"
                                                            className="form-select fs-8"
                                                            onChange={e => {
                                                                console.log(e.target.value)
                                                                setFieldValue('city', e.target.value)
                                                            }}
                                                        >
                                                            <option value="">Choose City</option>
                                                            <option value="India">Crizolia</option>
                                                            <option value="USA">Frensoli</option>
                                                            <option value="Canada">Dromu</option>
                                                        </select>
                                                    </MDBCol>

                                                    <MDBCol md={6} className="form-group">
                                                        <MDBInput
                                                            label='Pincode*'
                                                            id='pincode'
                                                            type='number'
                                                            onChange={element => setFieldValue('pincode', element.target.value)}
                                                        />
                                                        <span className="error"> {errors.pincode} </span>
                                                    </MDBCol>

                                                    <MDBCol md={12} className="form-group">
                                                        <MDBInput
                                                            label='Phone*'
                                                            id='addressTitle'
                                                            type='text'
                                                            onChange={element => setFieldValue('addressTitle', element.target.value)}
                                                        />
                                                        <span className="error"> {errors.addressTitle} </span>
                                                    </MDBCol>
                                                </MDBRow>
                                            </div>
                                            <MDBBtn type="submit">PROCEED</MDBBtn>
                                        </Form>
                                    )}
                                </Formik>
                            </MDBCollapse>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBCard className="mt-3">
                        <MDBCardBody>
                            <MDBBtn outline color="secondary"
                                    onClick={() => setIsBillingCardVisible(!isBillingCardVisible)}>
                                Billing Address
                            </MDBBtn>
                            <MDBCollapse show={isBillingCardVisible}>
                                <Formik
                                    initialValues={{
                                        addressType: '',
                                        address: '',
                                        fullName: '',
                                        phone: '',
                                        country: '',
                                        state: '',
                                        city: '',
                                        pincode: ''
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        handleShippingSubmit(values);
                                    }}
                                >
                                    {({values, errors, setFieldValue}) => (
                                        <Form>
                                            {console.log(values, errors)}
                                            <div className="shipping-details-box">
                                                <MDBRow>
                                                    <MDBCol md={12} className="form-group">
                                                        <MDBInput
                                                            label='Address Type*'
                                                            id='addressType'
                                                            type='text'
                                                            onChange={element => setFieldValue('addressType', element.target.value)}
                                                        />
                                                        <span className="error"> {errors.addressTitle} </span>
                                                    </MDBCol>

                                                    <MDBCol md={12} className="form-group">
                                                        <MDBTextArea
                                                            name="address"
                                                            label='Billing Address*'
                                                            id='address'
                                                            onChange={element => setFieldValue('address', element.target.value)}
                                                        ></MDBTextArea>
                                                        <span className="error"> {errors.addressTitle} </span>
                                                    </MDBCol>


                                                    <MDBCol md={12} className="form-group">
                                                        <MDBInput
                                                            label='Full Name*'
                                                            id='addressTitle'
                                                            type='text'
                                                            onChange={element => setFieldValue('addressTitle', element.target.value)}
                                                        />
                                                        <span className="error"> {errors.addressTitle} </span>
                                                    </MDBCol>

                                                    <MDBCol md={6} className="form-group">
                                                        <select
                                                            name="country"
                                                            className="form-select fs-8"
                                                            onChange={e => {
                                                                console.log(e.target.value)
                                                                setFieldValue('country', e.target.value)
                                                            }}
                                                        >
                                                            <option value="">Choose Country</option>
                                                            <option value="India">India</option>
                                                            <option value="USA">USA</option>
                                                            <option value="Canada">Canada</option>
                                                        </select>
                                                    </MDBCol>


                                                    <MDBCol md={6} className="form-group">
                                                        <select
                                                            name="state"
                                                            className="form-select fs-8"
                                                            onChange={e => {
                                                                console.log(e.target.value)
                                                                setFieldValue('state', e.target.value)
                                                            }}
                                                        >
                                                            <option value="">Choose State</option>
                                                            <option value="Maharashtra">Maharashtra</option>
                                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                        </select>
                                                    </MDBCol>

                                                    <MDBCol md={6} className="form-group">
                                                        <select
                                                            name="country"
                                                            className="form-select fs-8"
                                                            onChange={e => {
                                                                console.log(e.target.value)
                                                                setFieldValue('city', e.target.value)
                                                            }}
                                                        >
                                                            <option value="">Choose City</option>
                                                            <option value="India">Crizolia</option>
                                                            <option value="USA">Frensoli</option>
                                                            <option value="Canada">Dromu</option>
                                                        </select>
                                                    </MDBCol>

                                                    <MDBCol md={6} className="form-group">
                                                        <MDBInput
                                                            label='Pincode*'
                                                            id='pincode'
                                                            type='number'
                                                            onChange={element => setFieldValue('pincode', element.target.value)}
                                                        />
                                                        <span className="error"> {errors.pincode} </span>
                                                    </MDBCol>

                                                    <MDBCol md={12} className="form-group">
                                                        <MDBInput
                                                            label='Phone*'
                                                            id='addressTitle'
                                                            type='text'
                                                            onChange={element => setFieldValue('addressTitle', element.target.value)}
                                                        />
                                                        <span className="error"> {errors.addressTitle} </span>
                                                    </MDBCol>
                                                </MDBRow>
                                            </div>
                                            <MDBBtn type="submit">PROCEED TO PAYMENT</MDBBtn>
                                        </Form>
                                    )}
                                </Formik>
                            </MDBCollapse>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBCard className="mt-3">
                        <MDBCardBody>
                            <MDBBtn outline color="secondary"
                                    onClick={() => setIsShippingCardVisible(!isShippingCardVisible)}>
                                Payment Method
                            </MDBBtn>
                            <MDBCollapse show={isShippingCardVisible}>
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
                                squid. Nihil anim
                                keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
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