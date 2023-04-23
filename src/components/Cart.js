import {useDispatch, useSelector} from "react-redux";
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBRow} from "mdb-react-ui-kit";
import React, {useEffect, useState} from "react";
import {decreaseQuantity, increaseQuantity, removeItemFromCart,} from "../redux/cart/cartActions";
import {Link} from "react-router-dom";

const Cart = () => {

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const [cartValue, setCartValue] = useState(0);


    const getCartValue = () => {
        const value = cart.items.reduce((acc, item) => {
            return acc = parseFloat(acc) + parseFloat(item.discounted_price)
        }, 0)
        setCartValue(value)
    }

    useEffect(() => {
        getCartValue()
    }, [])

    return (
        <div className="cart-box">
            <h3><i className="fas fa-shopping-cart"/> Cart</h3>
            <br/>

            <MDBRow>
                <MDBCol md={9}>
                    <MDBCard>
                        <MDBCardBody>
                            {!!!cart.items.length && 'There are no items in your cart'}
                            {cart.items.map(product => {
                                return <div key={product.id}>
                                    <MDBRow className="mb-4">
                                        <MDBCol md={2}>
                                            <img src={product.image} alt={product.name} className="product-image"/>
                                        </MDBCol>
                                        <MDBCol md={8}>
                                            <div className="cart-desc-box">
                                                <div><p className="prod-name">{product.name}</p></div>
                                                <div className="btn-remove"
                                                     onClick={() => dispatch(removeItemFromCart(product.id))}>
                                                    <i className="fas fa-trash"/> Remove
                                                </div>
                                            </div>
                                        </MDBCol>
                                        <MDBCol md={2} className="qty-box-container">
                                            <div className="qty-box">
                                                <div className="btn-inc">
                                                    <MDBBtn size="sm" outline rounded
                                                            onClick={() => product.quantity === 1
                                                                ? false : dispatch(decreaseQuantity(product.id))}>
                                                        <i className="fas fa-minus"></i>
                                                    </MDBBtn>
                                                </div>
                                                <div>{product.quantity}</div>
                                                <div className="btn-dec">
                                                    <MDBBtn size="sm" outline rounded
                                                            onClick={() => dispatch(increaseQuantity(product.id))}>
                                                        <i className="fas fa-plus"></i>
                                                    </MDBBtn>
                                                </div>
                                            </div>

                                            <div className="price fs-8">
                                            <span
                                                className="text-danger"><strike>{product.currency}{parseFloat(product.original_price).toFixed(2)}</strike></span>
                                                <span
                                                    className="text-success">{product.currency}{parseFloat(product.discounted_price).toFixed(2)}</span>
                                            </div>
                                            <div className="amount-saved fs-8 text-success">
                                                You
                                                save {product.currency}{parseFloat(product.original_price - product.discounted_price).toFixed(2)}
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr/>
                                </div>
                            })}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md={3}>
                    <MDBCard className="card-subtotal">
                        <MDBCardBody>
                            <h6 className="mb-3 cart-subtotal">
                                <p><i className="fas fa-caret-right"/> Subtotal</p>
                                <p>${parseFloat(cartValue).toFixed(2)}</p>
                            </h6>
                            <Link to="/checkout">
                                <MDBBtn className="w-100">
                                    Proceed to Checkout
                                </MDBBtn>
                            </Link>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>

        </div>
    )
}

export default Cart