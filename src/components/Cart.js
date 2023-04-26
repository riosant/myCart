import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {decreaseQuantity, increaseQuantity, removeItemFromCart,} from "../redux/cart/cartActions";
import {Link} from "react-router-dom";
import {Button, Card, Col, Row} from "react-bootstrap";

const Cart = () => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const [cartValue, setCartValue] = useState(0);

    const getCartValue = () => {
        const value = cart.items.reduce((acc, item) => parseFloat(acc) + parseFloat(item.discounted_price * item.quantity), 0)
        setCartValue(value)
    }

    useEffect(() => {
        getCartValue()
    }, [getCartValue])

    return (
        <div className="cart-box">
            <h3><i className="fas fa-shopping-cart"/> Cart</h3>
            <br/>
            <Row>
                <Col md={9}>
                    <Card>
                        <Card.Body>
                            {!!!cart.items.length && 'There are no items in your cart'}
                            {cart.items.map(product => {
                                return <div key={product.id}>
                                    <Row className="mb-4">
                                        <Col md={2}>
                                            <img src={product.image} alt={product.name} className="product-image"/>
                                        </Col>
                                        <Col md={8}>
                                            <div className="cart-desc-box">
                                                <div><p className="prod-name">{product.name}</p></div>
                                                <div className="btn-remove"
                                                     onClick={() => dispatch(removeItemFromCart(product.id))}>
                                                    <i className="fas fa-trash"/> Remove
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={2} className="qty-box-container">
                                            <div className="qty-box">
                                                <div className="btn-inc">
                                                    <Button size="sm"
                                                            onClick={() => product.quantity === 1
                                                                ? false : dispatch(decreaseQuantity(product.id))}>
                                                        <i className="fas fa-minus"></i>
                                                    </Button>
                                                </div>
                                                <div>{product.quantity}</div>
                                                <div className="btn-dec">
                                                    <Button size="sm"
                                                            onClick={() => dispatch(increaseQuantity(product.id))}>
                                                        <i className="fas fa-plus"></i>
                                                    </Button>
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
                                        </Col>
                                    </Row>
                                    <hr/>
                                </div>
                            })}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="card-subtotal">
                        <Card.Body>
                            <h6 className="mb-3 cart-subtotal">
                                <p><i className="fas fa-caret-right"/> Subtotal</p>
                                <p>${parseFloat(cartValue).toFixed(2)}</p>
                            </h6>
                            <Link to="/checkout">
                                <Button className="w-100">
                                    Proceed to Checkout
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Cart