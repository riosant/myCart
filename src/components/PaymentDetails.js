import {useEffect, useState} from "react";
import {Form as FormikForm, Formik} from "formik";
import * as Yup from 'yup'
import {addPaymentDetails, changePaymentMode} from "../redux/payment/paymentActions";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Form, Row, Tab, Tabs} from "react-bootstrap";
import {addBillingDetails} from "../redux/billing/billingActions";

const validationSchema = Yup.object().shape({
    cardHolderName: Yup.string().required('Please enter card holder name')
        .test('lettersAndSpacesTest', 'Invalid card holder name', (fullName) => {
            return /^[a-zA-Z\s]+$/.test(fullName)
        }).test('max50', 'Card holder name cannot be larger than 50 characters', (fullName) => {
            return fullName.toString().length <= 50
        }),
    cardNumber1: Yup.number().required("Please enter valid card number"),
    cardNumber2: Yup.number().required("Please enter valid card number"),
    cardNumber3: Yup.number().required("Please enter valid card number"),
    cardNumber4: Yup.number().required("Please enter valid card number"),
    expirationMonth: Yup.number().required("Please enter expiration date"),
    expirationYear: Yup.number().required("Please enter expiration date"),
    CVV: Yup.number().required("Please enter CVV number")
        .test('digits', 'Invalid CVV', (CVV) => {
            return /^[0-9]+$/.test(CVV)
        })
        .typeError("Invalid CVV")
        .test('digits', 'Invalid CVV', (CVV) => {
            return CVV.toString().length <= 3
        }),
})

const PaymentDetails = () => {

    const [monthRange, setMonthRange] = useState([])
    const [yearRange, setYearRange] = useState([])
    const [errors, setErrors] = useState({})
    let errorsObj = {}

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        cardHolderName: '', cardNumber1: '', cardNumber2: '', cardNumber3: '', cardNumber4: '', expirationMonth: '',
        expirationYear: '', CVV: ''
    })
    let formDataObj = {
        cardHolderName: '', cardNumber1: '', cardNumber2: '', cardNumber3: '', cardNumber4: '', expirationMonth: '',
        expirationYear: '', CVV: ''
    }

    const setFieldValue = (fieldName, fieldValue) => {
        if ((fieldName === 'cardNumber1' || fieldName === 'cardNumber2' || fieldName === 'cardNumber3' || fieldName === 'cardNumber4') && fieldValue.toString().length > 4) {
            return false
        }
        setFormData(prev => ({...prev, [fieldName]: fieldValue}))
        formDataObj = {...formDataObj, [fieldName]: fieldValue}
        validateForm()
    }

    const validateForm = () => {
        if (!formData.cardHolderName) {
            setErrors({cardHolderName: 'Please enter card holder name'})
            errorsObj = {cardHolderName: 'Please enter card holder name'}
            return false
        } else setErrors({})

        if (formData.cardHolderName.toString().length > 50) {
            setErrors({cardHolderName: 'Card holder name cannot be larger than 50 characters'})
            errorsObj = {cardHolderName: 'Card holder name cannot be larger than 50 characters'}
            return false
        } else setErrors({})

        if (!/^[a-zA-Z\s]+$/.test(formData.cardHolderName)) {
            setErrors({cardHolderName: 'Cardholder name can contain only letters and spaces'})
            errorsObj = {cardHolderName: 'holder name can contain only letters and spaces'}
            return false
        } else setErrors({})

        if (!formData.cardNumber1) {
            setErrors({cardNumber1: 'Please enter valid card number'})
            errorsObj = {cardNumber1: 'Please enter valid card number'}
            return false
        } else setErrors({})

        if (formData.cardNumber1.toString().length !== 4
            || formData.cardNumber2.toString().length !== 4
            || formData.cardNumber3.toString().length !== 4
            || formData.cardNumber4.toString().length !== 4) {
            setErrors({cardNumber1: 'Please enter valid card number'})
            errorsObj = {cardNumber1: 'Please enter valid card number'}
            return false
        }

        if (!(/^[0-9]+$/).test(formData.cardNumber1)
            || !(/^[0-9]+$/).test(formData.cardNumber2)
            || !(/^[0-9]+$/).test(formData.cardNumber3)
            || !(/^[0-9]+$/).test(formData.cardNumber4)) {
            setErrors({cardNumber1: 'Please enter valid card number'})
            errorsObj = {cardNumber1: 'Please enter valid card number'}
            return false
        }

        if (!formData.cardNumber2) {
            setErrors({cardNumber2: 'Please enter valid card number'})
            errorsObj = {cardNumber2: 'Please enter valid card number'}
            return false
        } else setErrors({})

        if (!formData.cardNumber3) {
            setErrors({cardNumber3: 'Please enter valid card number'})
            errorsObj = {cardNumber3: 'Please enter valid card number'}
            return false
        } else setErrors({})

        if (!formData.cardNumber4) {
            setErrors({cardNumber4: 'Please enter valid card number'})
            errorsObj = {cardNumber4: 'Please enter valid card number'}
            return false
        } else setErrors({})

        if (!formData.expirationMonth) {
            setErrors({expirationMonth: 'Please choose card expiry data'})
            errorsObj = {expirationMonth: 'Please choose card expiry data'}
            return false
        }

        if (!formData.expirationYear) {
            setErrors({expirationYear: 'Please choose card expiry data'})
            errorsObj = {expirationYear: 'Please choose card expiry data'}
            return false
        }

        if (!formData.CVV) {
            setErrors({CVV: 'Please enter CVV number'})
            errorsObj = {CVV: 'Please enter CVV number'}
            return false
        }

        if (formData.CVV.toString().length !== 3) {
            setErrors({CVV: 'Please enter valid CVV number'})
            errorsObj = {CVV: 'Please enter valid CVV number'}
            return false
        }

        if (!(/^[0-9]+$/).test(formData.CVV)) {
            setErrors({CVV: 'Please enter valid CVV number'})
            errorsObj = {CVV: 'Please enter valid CVV number'}
            return false
        }
    }

    const handleTabChange = (tabName) => {
        dispatch(changePaymentMode(tabName))
    };

    const getMonthRange = () => {
        const range = [];
        for (let i = 1; i <= 12; i++) range.push(i)
        setMonthRange(range)
    }

    const getYearRange = () => {
        const range = [];
        for (let i = 2023; i <= 2050; i++) range.push(i)
        setYearRange(range)
    }

    useEffect(() => {
        getMonthRange()
        getYearRange();
    }, [])

    const handlePaymentSubmit = event => {
        event.preventDefault()
        validateForm()
        if (Object.keys(errors).length === 0) {
            dispatch(addPaymentDetails(formData))
            navigate("/order-success")
        }
    }

    console.log(formData, formDataObj)

    return (
        <div className="payment-box details-box">
            <Tabs
                id="justify-tab-example"
                className="mb-3"
                defaultActiveKey="online"
                justify
                onSelect={(tabName) => handleTabChange(tabName)}
            >
                <Tab eventKey="online" title="Card">
                    <Form onSubmit={handlePaymentSubmit}>
                        <Row>
                            <Col md={12} className="form-group">
                                <Form.Label className="fs-8">Cardholder Name*</Form.Label>
                                <Form.Control
                                    name="cardHolderName"
                                    type="text"
                                    placeholder="Cardholder Name"
                                    id='cardHolderName'
                                    onChange={element => setFieldValue(element.target.name, element.target.value)}
                                    onKeyUp={element => setFieldValue(element.target.name, element.target.value)}
                                    value={formData.cardHolderName}
                                />
                                <span className="error"> {errors.cardHolderName} </span>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12} className="form-group">
                                <label htmlFor="cardNumber1" className="fs-8">Card Number</label>
                                <div className="card-number">
                                    <Form.Control
                                        name="cardNumber1"
                                        id='cardNumber1'
                                        type='text'
                                        onChange={element => setFieldValue(element.target.name, element.target.value)}
                                        onKeyUp={element => setFieldValue(element.target.name, element.target.value)}
                                        value={formData.cardNumber1}
                                        placeholder="****"
                                    />
                                    <p className="m-0 p-0">-</p>
                                    <Form.Control
                                        name="cardNumber2"
                                        id='cardNumber2'
                                        type='text'
                                        onChange={element => setFieldValue(element.target.name, element.target.value)}
                                        onKeyUp={element => setFieldValue(element.target.name, element.target.value)}
                                        value={formData.cardNumber2}
                                        placeholder="****"
                                    />
                                    <p className="m-0 p-0">-</p>
                                    <Form.Control
                                        name="cardNumber3"
                                        id='cardNumber3'
                                        type='text'
                                        onChange={element => setFieldValue(element.target.name, element.target.value)}
                                        onKeyUp={element => setFieldValue(element.target.name, element.target.value)}
                                        value={formData.cardNumber3}
                                        placeholder="****"
                                    />
                                    <p className="m-0 p-0">-</p>
                                    <Form.Control
                                        name="cardNumber4"
                                        id='cardNumber4'
                                        type='text'
                                        onChange={element => setFieldValue(element.target.name, element.target.value)}
                                        onKeyUp={element => setFieldValue(element.target.name, element.target.value)}
                                        value={formData.cardNumber4}
                                        placeholder="****"
                                    />
                                </div>
                                <span
                                    className="error"> {errors.cardNumber1 || errors.cardNumber2 || errors.cardNumber3 || errors.cardNumber4} </span>
                            </Col>

                            <Col md={6} className="date-range">
                                <Form.Label className="fs-8">Expiration Date</Form.Label>
                                <div className="range-box">
                                    <Form.Select
                                        className="form-select-sm select-month"
                                        name="expirationMonth"
                                        onChange={element => setFieldValue(element.target.name, element.target.value)}
                                        onKeyUp={element => setFieldValue(element.target.name, element.target.value)}
                                        value={formData.country}
                                    >
                                        <option value="">MM</option>
                                        {monthRange.map(month => {
                                            return <option value={month} key={month}>{month}</option>
                                        })}
                                    </Form.Select>
                                    <Form.Select
                                        name="expirationYear"
                                        className="form-select-sm select-year"
                                        onChange={element => setFieldValue(element.target.name, element.target.value)}
                                        onKeyUp={element => setFieldValue(element.target.name, element.target.value)}
                                    >
                                        <option value="">YYYY</option>
                                        {yearRange.map(year => {
                                            return <option value={year} key={year}>{year}</option>
                                        })}
                                    </Form.Select>
                                </div>
                                <span className="error">{errors.expirationMonth || errors.expirationYear}</span>
                            </Col>
                            <Col md={6}>
                                <label className="fs-8">CVV*</label>
                                <Form.Control
                                    className="form-control"
                                    name="CVV"
                                    type="text"
                                    value={formData.CVV}
                                    placeholder="***"
                                    onChange={element => setFieldValue(element.target.name, element.target.value)}
                                    onKeyUp={element => setFieldValue(element.target.name, element.target.value)}
                                />
                                <span className="error">{errors.CVV}</span>
                            </Col>
                            <Col className="mt-4">
                                <Button type="submit" className="w-100">
                                    PLACE ORDER
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Tab>

                <Tab eventKey="offline" title="Cash On Delivery">
                    <Link to="/order-success">
                        <Button className="w-100">
                            PLACE ORDER WITH CASH ON DELIVERY
                        </Button>
                    </Link>
                </Tab>
            </Tabs>
        </div>
    )
}

export default PaymentDetails