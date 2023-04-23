import {Form as FormikForm, Formik} from "formik";
import {addShippingDetails} from "../redux/shipping/shippingActions";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {Button, Col, Form, Row} from "react-bootstrap";

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
        .test('test', 'Invalid pincode', (pincode) => pincode.toString().length === 6)
        .typeError("Invalid pincode"),
    phone: Yup.number().required("Please enter phone number").test('min10Test', 'Phone number must be 10 characters in length', (phone) => {
        return phone.toString().length === 10
    }).typeError("Invalid phone number")
});
const ShippingDetails = (
    {
        setIsShippingCardVisible,
        setIsBillingCardVisible,
        setIsPaymentCardVisible
    }
) => {

    const dispatch = useDispatch()

    const handleShippingSubmit = values => {
        dispatch(addShippingDetails(values))
        setIsShippingCardVisible(false)
        setIsBillingCardVisible(true)
        setIsPaymentCardVisible(false)
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
                    handleShippingSubmit(values);
                }}
            >
                {({values, errors, setFieldValue}) => (
                    <FormikForm>
                        <Row>
                            <Col md={12} className="form-group">
                                <Form.Label>Full Name*</Form.Label>
                                <Form.Control
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    id="fullName"
                                    onChange={element => setFieldValue(element.target.name, element.target.value)}
                                    value={values.fullName}
                                />
                                <span className="error"> {errors.fullName} </span>
                            </Col>

                            <Col md={12} className="form-group">
                                <Form.Label>Shipping Address*</Form.Label>
                                <Form.Control
                                    name="address"
                                    type="text"
                                    placeholder="Shipping Address"
                                    id="address"
                                    onChange={element => setFieldValue(element.target.name, element.target.value)}
                                    value={values.address}
                                />
                                <span className="error"> {errors.address} </span>
                            </Col>

                            <Col md={6} className="form-group">
                                <Form.Label>Country*</Form.Label>
                                <Form.Select
                                    aria-label="Choose Country"
                                    className="form-select fs-8"
                                    name="country"
                                    onChange={element => setFieldValue(element.target.name, element.target.value)}
                                >
                                    <option value="">Choose Country</option>
                                    <option value="India">India</option>
                                </Form.Select>
                                <span className="error"> {errors.country} </span>
                            </Col>

                            <Col md={6} className="form-group">
                                <Form.Label>State*</Form.Label>
                                <Form.Select
                                    aria-label="Choose State"
                                    name="state"
                                    id="state"
                                    className="form-select fs-8"
                                    onChange={element => setFieldValue(element.target.name, element.target.value)}
                                >
                                    <option value="">Choose State</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                </Form.Select>
                                <span className="error"> {errors.state} </span>
                            </Col>

                            <Col md={6} className="form-group">
                                <Form.Label>City*</Form.Label>
                                <Form.Select
                                    aria-label="Choose City"
                                    name="city"
                                    id="city"
                                    className="form-select fs-8"
                                    onChange={element => setFieldValue(element.target.name, element.target.value)}
                                >
                                    <option value="">Choose City</option>
                                    <option value="India">Crizolia</option>
                                    <option value="USA">Frensoli</option>
                                    <option value="Canada">Dromu</option>
                                </Form.Select>
                                <span className="error"> {errors.city} </span>
                            </Col>

                            <Col md={6} className="form-group">
                                <Form.Label>Pincode*</Form.Label>
                                <Form.Control
                                    name="pincode"
                                    type="text"
                                    placeholder="Pincode"
                                    id='pincode'
                                    onChange={element => setFieldValue(element.target.name, element.target.value)}
                                    value={values.pincode}
                                />
                                <span className="error"> {errors.pincode} </span>
                            </Col>

                            <Col md={12} className="form-group">
                                <Form.Label>Phone*</Form.Label>
                                <Form.Control
                                    name="phone"
                                    type="text"
                                    placeholder="Phone"
                                    id='phone'
                                    onChange={element => setFieldValue(element.target.name, element.target.value)}
                                    value={values.phone}
                                />
                                <span className="error"> {errors.phone} </span>
                            </Col>
                        </Row>
                        <Button type="submit" className="mt-2">PROCEED</Button>
                    </FormikForm>
                )}
            </Formik>
        </div>
    )
}

export default ShippingDetails