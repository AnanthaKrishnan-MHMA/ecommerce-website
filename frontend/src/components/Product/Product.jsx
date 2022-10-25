import React from 'react';
import { Link } from 'react-router-dom';
import Rating from "@mui/material/Rating";
import "./Product.css";

function Product({ product }) {
    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt="product" />
            <div>
                <Rating name="product-ratings"
                    value={product.ratings}
                    defaultValue={0} precision={0.5}
                    style={{color:"tomato"}}
                    readOnly />
                <span className='productCard__numOfReviews'>({product.numOfReviews} ratings)</span>
            </div>
            <p className='productCard__title'>{product.name}</p>
            <p className='productCard__price'>₹{product.price}</p>
        </Link>
    );
}

export default Product;