import {
    MDBBtn,
    MDBCol,
    MDBIcon,
    MDBInput, MDBRow,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane
} from "mdb-react-ui-kit";
import {useEffect, useState} from "react";
import {Form, Formik} from "formik";
import * as Yup from 'yup'
import {addPaymentDetails, changePaymentMode} from "../redux/payment/paymentActions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

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
        }).typeError("Invalid CVV")
        .test('digits', 'Invalid CVV', (CVV) => {
            return CVV.toString().length <= 3
        }),
})

const PaymentDetails = () => {

    const [iconsActive, setIconsActive] = useState('online')
    const [monthRange, setMonthRange] = useState([])
    const [yearRange, setYearRange] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleIconsClick = (tabName) => {
        if (tabName === iconsActive) return
        setIconsActive(tabName);
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
            <MDBTabs className='mb-3'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleIconsClick('online')} active={iconsActive === 'online'}>
                        <MDBIcon fas icon='credit-card' className='me-2'/> Card
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleIconsClick('offline')} active={iconsActive === 'offline'}>
                        <MDBIcon fas icon='chart-line' className='me-2'/> Cash on Delivery
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane show={iconsActive === 'online'}>
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
                            <Form>
                                <MDBRow>
                                    <MDBCol md={12} className="form-group">
                                        <label className="fs-8">Cardholder Name*</label>
                                        <MDBInput
                                            name="cardHolderName"
                                            placeholder="Cardholder Name"
                                            id='cardHolderName'
                                            type='text'
                                            onChange={element => setFieldValue(element.target.name, element.target.value)}
                                            value={values.cardHolderName}
                                        />
                                        <span className="error"> {errors.cardHolderName} </span>
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow>
                                    <MDBCol md={12} className="form-group">
                                        <label htmlFor="cardNumber1" className="fs-8">Card Number</label>
                                        <div className="card-number">
                                            <input
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
                                            <input
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
                                            <input
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
                                            <input
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
                                    </MDBCol>

                                    <MDBCol md={6} className="date-range">
                                        <label className="fs-8">Expiration Date</label>
                                        <select name="expirationMonth"
                                                className="form-select-sm select-month"
                                                onChange={e => setFieldValue(e.target.name, e.target.value)}
                                        >
                                            <option value="">MM</option>
                                            {monthRange.map(month => {
                                                return <option value={month} key={month}>{month}</option>
                                            })}
                                        </select>
                                        <select
                                            name="expirationYear"
                                            className="form-select-sm select-year"
                                            onChange={e => setFieldValue(e.target.name, e.target.value)}
                                        >
                                            <option value="">YYYY</option>
                                            {yearRange.map(year => {
                                                return <option value={year} key={year}>{year}</option>
                                            })}
                                        </select>
                                        <span className="error">{errors.expirationMonth || errors.expirationYear}</span>

                                    </MDBCol>
                                    <MDBCol md={6}>
                                        <label className="fs-8">CVV*</label>
                                        <input
                                            className="form-control"
                                            name="CVV"
                                            type="text"
                                            value={values.CVV}
                                            placeholder="***"
                                            onChange={e => setFieldValue(e.target.name, e.target.value)}
                                        />
                                        <span className="error">{errors.CVV}</span>
                                    </MDBCol>
                                    <MDBCol className="mt-4">
                                        <MDBBtn type="submit" className="w-100">
                                            PLACE ORDER
                                        </MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </Form>
                        )}
                    </Formik>
                </MDBTabsPane>
                <MDBTabsPane show={iconsActive === 'offline'}>
                    <MDBBtn className="w-100">
                        PLACE ORDER WITH CASH ON DELIVERY
                    </MDBBtn>
                </MDBTabsPane>
            </MDBTabsContent>
        </div>
    )
}

export default PaymentDetails