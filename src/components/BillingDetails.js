import {Form, Formik} from "formik";
import {MDBBtn, MDBCol, MDBInput, MDBRow, MDBTextArea} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {addBillingDetails} from "../redux/billing/billingActions";

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Please enter your full name')
        .test('lettersAndSpacesTest', 'Full name can contain letters and spaces only', (fullName) => {
            return /^[a-zA-Z\s]+$/.test(fullName)
        }),
    address: Yup.string().required('Please enter shipping address'),
    country: Yup.string().required("Please choose country"),
    state: Yup.string().required("Please choose state"),
    city: Yup.string().required("Please choose city"),
    pincode: Yup.number().required("Please enter pincode")
        .test('test', 'Invalid pincode', (pincode) => pincode.toString().length === 6),
    phone: Yup.number().required("Please enter phone number").test('min10Test', 'Phone number must be 10 characters in length', (phone) => {
        return phone.toString().length === 10
    }).typeError("Invalid phone number")
});
const BillingDetails = (
    {
        setIsShippingCardVisible,
        setIsBillingCardVisible,
        setIsPaymentCardVisible
    }
) => {

    const billing = useSelector(state => state.shipping)
    const dispatch = useDispatch()

    const handleBillingFormSubmit = values => {
        dispatch(addBillingDetails(values))
        setIsShippingCardVisible(false)
        setIsBillingCardVisible(false)
        setIsPaymentCardVisible(true)
    }

    return (
        <div className="details-box">
            <Formik
                initialValues={{
                    fullName: '',
                    address: '',
                    country: '',
                    state: '',
                    city: '',
                    pincode: '',
                    phone: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleBillingFormSubmit(values);
                }}
            >
                {({values, errors, setFieldValue}) => (
                    <Form>
                        <MDBRow>
                            <MDBCol md={12} className="form-group">
                                <MDBInput
                                    label='Full Name*'
                                    name="fullName"
                                    id='fullName'
                                    type='text'
                                    onChange={element => setFieldValue(element.target.name, element.target.value)}
                                    value={values.fullName}
                                />
                                <span className="error"> {errors.fullName} </span>
                            </MDBCol>

                            <MDBCol md={12} className="form-group">
                                <MDBTextArea
                                    label='Shipping Address*'
                                    name="address"
                                    id='address'
                                    onChange={element => setFieldValue(element.target.name, element.target.value)}
                                    value={values.address}
                                ></MDBTextArea>
                                <span className="error"> {errors.address} </span>
                            </MDBCol>

                            <MDBCol md={6} className="form-group">
                                <select
                                    name="country"
                                    className="form-select fs-8"
                                    onChange={element => setFieldValue(element.target.name, element.target.value)}
                                    value={values.country}
                                >
                                    <option value="">Choose Country</option>
                                    <option value="India">India</option>
                                </select>
                                <span className="error"> {errors.country} </span>
                            </MDBCol>

                            <MDBCol md={6} className="form-group">
                                <select
                                    name="state"
                                    id="state"
                                    className="form-select fs-8"
                                    onChange={element => setFieldValue(element.target.name, element.target.value)}
                                >
                                    <option value="">Choose State</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                </select>
                                <span className="error"> {errors.state} </span>
                            </MDBCol>

                            <MDBCol md={6} className="form-group">
                                <select
                                    name="city"
                                    id="city"
                                    className="form-select fs-8"
                                    onChange={element => setFieldValue(element.target.name, element.target.value)}
                                >
                                    <option value="">Choose City</option>
                                    <option value="India">Crizolia</option>
                                    <option value="USA">Frensoli</option>
                                    <option value="Canada">Dromu</option>
                                </select>
                                <span className="error"> {errors.city} </span>
                            </MDBCol>

                            <MDBCol md={6} className="form-group">
                                <MDBInput
                                    name="pincode"
                                    label='Pincode*'
                                    id='pincode'
                                    type='number'
                                    onChange={element => setFieldValue(element.target.name, element.target.value)}
                                    value={values.pincode}
                                />
                                <span className="error"> {errors.pincode} </span>
                            </MDBCol>

                            <MDBCol md={12} className="form-group">
                                <MDBInput
                                    name="phone"
                                    label='Phone*'
                                    id='phone'
                                    type='text'
                                    onChange={element => setFieldValue(element.target.name, element.target.value)}
                                    value={values.phone}
                                />
                                <span className="error"> {errors.phone} </span>
                            </MDBCol>
                        </MDBRow>
                        <MDBBtn type="submit">PROCEED TO PAYMENT</MDBBtn>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default BillingDetails