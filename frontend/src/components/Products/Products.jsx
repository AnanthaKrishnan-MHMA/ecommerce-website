import React, { useState, useEffect, Fragment } from 'react';
import "./Products.css";
import "../layout/Pagination/CustomPagination.css"
import Product from "../Product/Product";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/features/product.feature';
import Loader from '../layout/Loader/Loader';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import FilterBasic from '../layout/Filter/FilterBasic';

function Products() {
    let dispatch = useDispatch();
    let { keyword = "", page = 1 } = useParams();
    let productState = useSelector(state => state.products);
    const [activePage, setActivePage] = useState(page);
    const [price, setPrice] = useState({ minPrice: 0, maxPrice: 100000 });
    useEffect(() => {
        dispatch(fetchProducts({ keyword, activePage, price }));
        window.scroll(0, 0);
    }, [dispatch, keyword, activePage, price]);
    let { products, loading, resultPerPage, filteredProductsCount, productsCount } = productState;

    const handlePageChange = (e) => {
        setActivePage(e);
    }
    const onPriceChange = (newPrice) => {
        setPrice(newPrice)
    };

    return (
        <Fragment>
            <div className='products'>
                <Loader type={"spin"} color={"rgb(115,191,214)"} on={loading} />

                <div className="products__block1">
                    <FilterBasic onPriceChange={onPriceChange} />
                </div>
                
                <div className="products__block2">
                    {products.length > 0 &&
                        products.map((prod, k) => <Product product={prod} key={k} />)}
                </div>
            </div>
            {filteredProductsCount > resultPerPage &&
                <div className="paginationBox">
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        pageRangeDisplayed={5}
                        activeClass={"pag__active"}
                        onChange={handlePageChange}
                    />
                </div>}
        </Fragment >
    );
}

export default Products;