import React, { Fragment } from 'react';
import { CgMouse } from "react-icons/all";
import Product from "../Product/Product.jsx"
import MetaData from './MetaData.jsx';
import './Home.css';
import ReactLoading from "react-loading"
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/features/product.feature.js';

function Home() {
    let dispatch = useDispatch();
    let productsState = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    let { products, loading, error } = productsState;
    return (
        <Fragment>
            <MetaData title={"Ecommerce"} />
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>Explore The Best Deals and Find Amazing Products</h1>
                <a href="#container">
                    <button>
                        scroll <CgMouse />
                    </button>
                </a>
            </div>
            <h3 className='homeHeading'>Featured Products</h3>
            <div className="container" id='container'>
                {
                    loading === true ? <ReactLoading type={"spin"} color={"black"} />
                        : products.length > 0 ? products.map((prod, k) => {
                            return <Product product={prod} key={k} />
                        })
                            : error ? <p className='container__error'>{error}</p>
                                : <p>seems like there are no featured products....</p>
                }
            </div>
        </Fragment>
    );
}

export default Home;