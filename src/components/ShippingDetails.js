import {Form as FormikForm, Formik} from "formik";
import {addShippingDetails} from "../redux/shipping/shippingActions";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";

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
    const shipping = useSelector(state => state.shipping)
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        fullName: '', address: '', country: '', state: '', city: '', pincode: '', phone: ''
    })

    const setFieldValue = (fieldName, fieldValue) => {
        setFormData(prev => ({...prev, [fieldName]: fieldValue}))
        validateForm()
    }

    const validateForm = () => {
        if (!formData.fullName) {
            setErrors({fullName: 'Please enter full name'})
            return false
        } else setErrors({})

        if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
            setErrors({fullName: 'Full name can contain letters and spaces only'})
            return false
        } else setErrors({})

        if (!formData.address) {
            setErrors({address: 'Please enter shipping address'})
            return false
        } else setErrors({})

        if (!formData.country) {
            setErrors({country: 'Please choose country'})
            return false
        } else setErrors({})

        if (!formData.state) {
            setErrors({state: 'Please choose state'})
            return false
        } else setErrors({})

        if (!formData.city) {
            setErrors({city: 'Please choose city'})
            return false
        } else setErrors({})

        if (!formData.pincode) {
            setErrors({pincode: 'Please enter pincode'})
            return false
        } else setErrors({})

        if (formData.pincode.toString().length !== 6) {
            setErrors({pincode: 'Invalid pincode'})
            return false
        } else setErrors({})

        if (!/^[0-9]*$/.test(formData.pincode)) {
            setErrors({pincode: 'Pincode can contain numbers only'})
            return false
        } else setErrors({})

        if (!formData.phone) {
            setErrors({phone: 'Please enter phone number'})
            return false
        } else setErrors({})

        if (formData.phone.toString().length !== 10) {
            setErrors({phone: 'Phone number must be 10 characters in length'})
            return false
        } else setErrors({})

        if (!/^[0-9]*$/.test(formData.phone)) {
            setErrors({phone: 'Invalid phone number'})
            return false
        } else setErrors({})
    }
    const handleShippingSubmit = event => {
        event.preventDefault()
        validateForm()
        dispatch(addShippingDetails(formData))
        if (Object.keys(errors).length === 0) {
            setIsShippingCardVisible(false)
            setIsBillingCardVisible(true)
            setIsPaymentCardVisible(false)
        }
    }

    return (
        <div className="details-box">
            <Form onSubmit={handleShippingSubmit}>
                <Row>
                    <Col md={12} className="form-group">
                        <Form.Label>Full Name*</Form.Label>
                        <Form.Control
                            name="fullName"
                            type="text"
                            placeholder="Full Name"
                            id="fullName"
                            onChange={element => setFieldValue(element.target.name, element.target.value)}
                            onKeyUp={element => setFieldValue(element.target.name, element.target.value)}
                            value={formData.fullName}
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
                            onKeyUp={element => setFieldValue(element.target.name, element.target.value)}
                            value={formData.address}
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
                            onKeyUp={element => setFieldValue(element.target.name, element.target.value)}
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
                            onKeyUp={element => setFieldValue(element.target.name, element.target.value)}
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
                            onKeyUp={element => setFieldValue(element.target.name, element.target.value)}
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
                            onKeyUp={element => setFieldValue(element.target.name, element.target.value)}
                            value={formData.pincode}
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
                            onKeyUp={element => setFieldValue(element.target.name, element.target.value)}
                            value={formData.phone}
                        />
                        <span className="error"> {errors.phone} </span>
                    </Col>
                </Row>
                <Button type="submit" className="mt-2">PROCEED</Button>
            </Form>

        </div>
    )
}

export default ShippingDetails