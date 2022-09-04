import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import "./Product.css";

function Product({ product }) {
    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt="product" />
            <p className='productCard__title'>{product.name}</p>
            <div>
                <ReactStars
                    count={5} //total number of stars
                    value={product.ratings} //input rating value
                    edit={false}
                    size={window.innerWidth < 600 ? 10:14}
                    isHalf={true}
                    activeColor="tomato"
                />
                <span>({product.numOfReviews} ratings)</span>
            </div>
            <p className='productCard__price'>₹{product.price}</p>
        </Link>
    );
}

export default Product;