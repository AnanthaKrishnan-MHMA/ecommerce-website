import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearProduct, fetchProductDetails } from "../../../redux/features/product.feature";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactStars from 'react-rating-stars-component';
import "./ProductDetails.css"
import { useState } from 'react';
import ReviewCard from "./ReviewCard.jsx"
import Loader from '../../layout/Loader/Loader';

function ProductDetails() {
    const [productQuantity, setPQ] = useState(1);
    let dispatch = useDispatch();
    let productsState = useSelector((state) => state.products);
    let prodId = useParams().id;
    
    let { product, loading, error } = productsState;
    let { ratings } = product;
    useEffect(() => {
        dispatch(fetchProductDetails(prodId));
        window.scrollTo(0, 0);
        return ()=>{
            dispatch(clearProduct());
        }
    }, [dispatch, prodId]);

    const incPQ = () => {
        if (productQuantity < 3) setPQ(productQuantity + 1);
    }
    const decPQ = () => {
        if (productQuantity > 1) setPQ(productQuantity - 1);
    }
    return (
        <Fragment>
            <Loader type={"spin"} color={"rgb(115,191,214)"} on={loading} />

            <div className="productDetails">
                <div className="productDetails__block1">
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
                            <div className="productDetails__right_block1_2">
                                {ratings >= 0 && 
                                    < ReactStars
                                        count={5} //total number of stars
                                        value={ratings} //input rating value
                                        edit={false}
                                        size={window.innerWidth < 600 ? 17 : 18}
                                        isHalf={true}
                                        activeColor="tomato"
                                    />}
                                <span>({product.numOfReviews} ratings)</span>
                            </div>
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
                        {product.stock>0 &&
                        <button className='buyNowBtn'>Add to cart</button>}
                        <h3>description:</h3>
                        <p>{product.description}</p>
                    </div>
                </div>
                <div className="productDetails__bottom">
                    {product.reviews && product.reviews.map((review, k) => (
                        <ReviewCard name={review.name} rating={review.rating} comment={review.comment} key={k} />
                    ))}
                </div>
            </div>
        </Fragment>
    );
}

export default ProductDetails;