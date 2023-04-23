import products from "../data/products";
import Rating from "../common/Rating";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../redux/cart/cartActions";
import {Link} from "react-router-dom";
import {Card, Row, Col, Button} from "react-bootstrap";
import CurrencyFormat from "react-currency-format";

const Products = () => {

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    return (
        <div className="products-box container-fluid">
            {products.map(product => {
                return <Card className="mb-5 product-card" key={product.id}>
                    <Card.Body>
                        <Row>
                            <Col md={2} className="product-image-box">
                                <img src={product.image} alt={product.name} className="w-100 product-image"/>
                            </Col>
                            <Col md={8}>
                                <div className="desc-box">
                                    <p>{product.name}</p>
                                    <Rating count={product.rating}/>
                                    <p className="mt-2 desc">{product.description}</p>
                                </div>
                            </Col>
                            <Col md={2}>
                                <div className="pricing-details h-100">
                                    <div className="top">
                                        <h4>
                                            <CurrencyFormat
                                                value={parseFloat(product.discounted_price).toFixed(2)}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'$'}/>
                                        </h4>
                                        <p className="text-warning mb-1 fs9">
                                            <strike>
                                                <CurrencyFormat
                                                    value={parseFloat(product.original_price).toFixed(2)}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}/>
                                            </strike>
                                        </p>
                                        <p className="text-success fs9">Free Shipping</p>
                                    </div>
                                    <div className="bottom">
                                        {!!!cart.items.filter(item => item.id === product.id).length
                                            ?
                                            <Button color="primary" onClick={() => dispatch(addItemToCart(product))}>
                                                {cart.loading ? "..." : <>
                                                    <i className="fas fa-shopping-cart"/> Add to Cart
                                                </>}
                                            </Button>
                                            : <Link to="/cart">
                                                <Button>Go to Cart</Button>
                                            </Link>

                                        }
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            })}
        </div>
    )
}

export default Products