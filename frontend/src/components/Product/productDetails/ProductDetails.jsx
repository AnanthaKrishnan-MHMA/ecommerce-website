import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from "../../../redux/features/product.feature";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactStars from 'react-rating-stars-component';
import "./ProductDetails.css"
import { useState } from 'react';

function ProductDetails() {
    const [productQuantity, setPQ] = useState(1);
    let dispatch = useDispatch();
    let productsState = useSelector((state) => state.products);
    let prodId = useParams().id;
    useEffect(() => {
        dispatch(fetchProductDetails(prodId));
    }, [dispatch, prodId]);
    let { product, loading, error } = productsState;
    const incPQ = () => {
        if (productQuantity < 3) setPQ(productQuantity + 1);
    }
    const decPQ = () => {
        if (productQuantity > 1) setPQ(productQuantity - 1);
    }
    return (
        <Fragment>
            {console.log("component loaded")}
            <div className="productDetails">
                <div className="productDetails__left">
                    {product.images &&
                        <Carousel showThumbs={false}>
                            {product.images.map((img, k) => (
                                <div key={k}>
                                    <img src={img.url} alt="product" />
                                </div>
                            ))}
                        </Carousel>
                    }
                </div>
                <div className="productDetails__right">
                    <div className="productDetails__right_block1">
                        <div className="productDetails__right_block1_1">
                            <h2>{product.name}</h2>
                            <p className='product_id'>id: #{product._id}</p>
                        </div>
                        {product.ratings &&
                            <div className="productDetails__right_block1_2">
                                < ReactStars
                                    count={5} //total number of stars
                                    value={product.ratings} //input rating value
                                    edit={false}
                                    size={window.innerWidth < 600 ? 20 : 24}
                                    isHalf={true}
                                    activeColor="tomato"
                                />
                                <span>({product.numOfReviews} ratings)</span>
                            </div>
                        }
                    </div>
                    <div className="productDetails__right_quantity">
                        <button className='incDecBtn' onClick={decPQ}>-</button>
                        <p>{productQuantity}</p>
                        <button className='incDecBtn' onClick={incPQ}>+</button>
                    </div>

                    {product.stock < 1 ? <p className='outofstock'>sorry! currently out of stock</p>
                        : product.stock < 5 ? <p className='instock__hurry'>Hurry up! only {product.stock} left</p>
                            : <p className='instock'>instock</p>}
                    <h1 className='productPrice'>₹{product.price}.00</h1>
                    <button className='buyNowBtn'>Buy now</button>
                    <h3>description:</h3>
                    <p>{product.description}</p>
                </div>
            </div>
        </Fragment>
    );
}

export default ProductDetails;