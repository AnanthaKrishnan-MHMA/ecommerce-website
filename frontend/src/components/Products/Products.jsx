import React, { useState } from 'react';
import "./Products.css";
import "../layout/Pagination/CustomPagination.css"
import Product from "../Product/Product";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/features/product.feature';
import Loader from '../layout/Loader/Loader';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Fragment } from 'react';
import Pagination from 'react-js-pagination';
function Products() {
    let dispatch = useDispatch();
    let { keyword = "", page = 1 } = useParams();
    let productSate = useSelector(state => state.products);
    const[activePage,setActivePage] = useState(page);
    useEffect(() => {
        dispatch(fetchProducts({keyword,activePage}));
    }, [dispatch, keyword, activePage]);
    let { products, loading, resultPerPage, productsCount } = productSate;
    // 
    const collapseDivs = useRef([]);
    const filters = [
        {
            name: "Price",
            values: [
                "under 500 ₹",
                "500 - 1000 ₹",
                "1000 - 2500 ₹",
                "2500 - 5000 ₹"
            ]
        },
        {
            name: "Brand",
            values: [
                "brand 1",
                "brand 2",
                "brand 3",
                "brand 4"
            ]
        },
        {
            name: "ratings1",
            values: [
                "1",
                "2",
                "3",
                "4"
            ]
        },
        {
            name: "ratings2",
            values: [
                "1",
                "2",
                "3",
                "4"
            ]
        },
        {
            name: "ratings3",
            values: [
                "1",
                "2",
                "3",
                "4"
            ]
        },
        {
            name: "ratings4",
            values: [
                "1",
                "2",
                "3",
                "4"
            ]
        },
        {
            name: "ratings5",
            values: [
                "1",
                "2",
                "3",
                "4"
            ]
        },
        {
            name: "ratings6",
            values: [
                "1",
                "2",
                "3",
                "4"
            ]
        },
        {
            name: "ratings7",
            values: [
                "1",
                "2",
                "3",
                "4"
            ]
        },
    ]
    // 
    const toggleActive = (element) => {
        element.classList.toggle("active");
    }
    const handlePageChange = (e) => {
        setActivePage(e);
    }
    return (
        <Fragment>
            <div className='products'>
                <Loader type={"spin"} color={"rgb(115,191,214)"} on={loading} />
                <div className="products__block1">
                    {filters.map((filter, k) =>
                        <div className="products__block1_1" key={k}>
                            <div onClick={() => toggleActive(collapseDivs.current[k])} className="products__block1_1_header">
                                <h5>{filter.name} </h5>
                                <div className="collapse_indicator">
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div ref={(el) => (collapseDivs.current[k] = el)} className="products__block1_1_options">
                                {filter.values.map((value, i) =>
                                    <div className='products__block1_1_options_block' key={i}>
                                        <label htmlFor={value}>{value}</label>
                                        <input type="checkbox" id={value} name={filter.name} value={value} />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="products__block2">
                    {products.length > 0 &&
                        products.map((prod, k) => <Product product={prod} key={k} />)}
                </div>
            </div>
            <div className="paginationBox">
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    pageRangeDisplayed={5}
                    activeClass={"pag__active"}
                    onChange={handlePageChange}
                />
            </div>
        </Fragment>
    );
}

export default Products;