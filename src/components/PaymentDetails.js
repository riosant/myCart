import {useEffect, useState} from "react";
import {Form as FormikForm, Formik} from "formik";
import * as Yup from 'yup'
import {addPaymentDetails, changePaymentMode} from "../redux/payment/paymentActions";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Form, Row, Tab, Tabs} from "react-bootstrap";

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
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
    const handlePaymentSubmit = values => {
        dispatch(addPaymentDetails(values))
        navigate("/order-success")
    }

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
                    <Formik
                        initialValues={{
                            cardHolderName: '',
                            cardNumber1: '',
                            cardNumber2: '',
                            cardNumber3: '',
                            cardNumber4: '',
                            expirationMonth: '',
                            expirationYear: '',
                            CVV: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            handlePaymentSubmit(values);
                        }}
                    >
                        {({values, errors, setFieldValue}) => (
                            <FormikForm>
                                <Row>
                                    <Col md={12} className="form-group">
                                        <Form.Label className="fs-8">Cardholder Name*</Form.Label>
                                        <Form.Control
                                            name="cardHolderName"
                                            type="text"
                                            placeholder="Cardholder Name"
                                            id='cardHolderName'
                                            onChange={element => setFieldValue(element.target.name, element.target.value)}
                                            value={values.cardHolderName}
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
                                                onChange={element => {
                                                    return element.target.value.toString().length > 4
                                                        ? false
                                                        : setFieldValue(element.target.name, element.target.value)
                                                }}
                                                value={values.cardNumber1}
                                                placeholder="****"
                                            />
                                            <p className="m-0 p-0">-</p>
                                            <Form.Control
                                                name="cardNumber2"
                                                id='cardNumber2'
                                                type='text'
                                                onChange={element => {
                                                    return element.target.value.toString().length > 4
                                                        ? false
                                                        : setFieldValue(element.target.name, element.target.value)
                                                }}
                                                value={values.cardNumber2}
                                                placeholder="****"
                                            />
                                            <p className="m-0 p-0">-</p>
                                            <Form.Control
                                                name="cardNumber3"
                                                id='cardNumber3'
                                                type='text'
                                                onChange={element => {
                                                    return element.target.value.toString().length > 4
                                                        ? false
                                                        : setFieldValue(element.target.name, element.target.value)
                                                }}
                                                value={values.cardNumber3}
                                                placeholder="****"
                                            />
                                            <p className="m-0 p-0">-</p>
                                            <Form.Control
                                                name="cardNumber4"
                                                id='cardNumber4'
                                                type='text'
                                                onChange={element => {
                                                    return element.target.value.toString().length > 4
                                                        ? false
                                                        : setFieldValue(element.target.name, element.target.value)
                                                }}
                                                value={values.cardNumber4}
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
                                                aria-label="Choose Country"
                                                className="form-select-sm select-month"
                                                name="expirationMonth"
                                                onChange={e => setFieldValue(e.target.name, e.target.value)}
                                                value={values.country}
                                            >
                                                <option value="">MM</option>
                                                {monthRange.map(month => {
                                                    return <option value={month} key={month}>{month}</option>
                                                })}
                                            </Form.Select>
                                            <Form.Select
                                                aria-label="Choose Country"
                                                name="expirationYear"
                                                className="form-select-sm select-year"
                                                onChange={e => setFieldValue(e.target.name, e.target.value)}
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
                                            value={values.CVV}
                                            placeholder="***"
                                            onChange={e => setFieldValue(e.target.name, e.target.value)}
                                        />
                                        <span className="error">{errors.CVV}</span>
                                    </Col>
                                    <Col className="mt-4">
                                        <Button type="submit" className="w-100">
                                            PLACE ORDER
                                        </Button>
                                    </Col>
                                </Row>
                            </FormikForm>
                        )}
                    </Formik>
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