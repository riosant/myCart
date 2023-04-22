import products from "../data/products";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBRow} from "mdb-react-ui-kit";
import Rating from "../common/Rating";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../redux/cart/cartActions";
import {Link} from "react-router-dom";

const Products = () => {

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    return (
        <div className="products-box container-fluid">
            {products.map(product => {
                return <MDBCard className="mb-5 product-card" key={product.id}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol md={2}>
                                <img src={product.image} alt={product.name}/>
                            </MDBCol>
                            <MDBCol md={8}>
                                <div className="desc-box">
                                    <p>{product.name}</p>
                                    <Rating count={product.rating}/>
                                    <p className="mt-2 desc">{product.description}</p>
                                </div>
                            </MDBCol>
                            <MDBCol md={2}>
                                <div className="pricing-details h-100">
                                    <div className="top">
                                        <h4> {product.currency}{parseFloat(product.discounted_price).toFixed(2)}</h4>
                                        <p className="text-warning mb-1 fs9">
                                            <strike>{product.currency}{parseFloat(product.discounted_price).toFixed(2)}</strike>
                                        </p>
                                        <p className="text-success fs9">Free Shipping</p>
                                    </div>
                                    <div className="bottom">
                                        {!!!cart.items.filter(item => item.id === product.id).length
                                            ?
                                            <MDBBtn color="primary" onClick={() => dispatch(addItemToCart(product))}>
                                                {cart.loading ? "..." : <>
                                                    <i className="fas fa-shopping-cart"/> Add to Cart
                                                </>}
                                            </MDBBtn>
                                            : <Link to="/cart">
                                                <MDBBtn>Go to Cart</MDBBtn>
                                            </Link>

                                        }
                                    </div>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            })}
        </div>
    )
}

export default Products