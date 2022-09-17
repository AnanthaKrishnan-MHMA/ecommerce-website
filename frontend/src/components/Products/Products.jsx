import React from 'react';
import "./Products.css";
import Product from "../Product/Product";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/features/product.feature';
import Loader from '../layout/Loader/Loader';
import { useRef } from 'react';


function Products() {
    let dispatch = useDispatch();
    let productSate = useSelector(state => state.products);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    let { products, loading} = productSate;
    const collapseDivs = useRef([]);
    const element1 = useRef();
    const element2 = useRef();
    const element3 = useRef();
    const toggleActive = (element)=>{
        console.log(element);
        element.current.classList.toggle("active"); 
    }
    return (
        <div className='products'>
            <Loader type={"spin"} color={"rgb(115,191,214)"} on={loading} />
            <div className="products__block1">
                <div onClick={()=>toggleActive(element1)}  className="products__block1_1">
                    <div className="products__block1_1_header">
                        <h5>Price </h5>
                        <div className="collapse_indicator">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div ref={element1} className="products__block1_1_options">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                    </div>
                </div>
                <div onClick={()=>toggleActive(element2)}  className="products__block1_1">
                    <div className="products__block1_1_header">
                        <h5>Brand </h5>
                        <div className="collapse_indicator">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div ref={element2} className="products__block1_1_options">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                    </div>
                </div>
                <div onClick={()=>toggleActive(element3)} className="products__block1_1">
                    <div className="products__block1_1_header">
                        <h5>Rating </h5>
                        <div className="collapse_indicator">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div ref={element3} className="products__block1_1_options">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                    </div>
                </div>
                <div onClick={()=>toggleActive(element3)} className="products__block1_1">
                    <div className="products__block1_1_header">
                        <h5>Rating </h5>
                        <div className="collapse_indicator">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div ref={element3} className="products__block1_1_options">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                    </div>
                </div>
                <div onClick={()=>toggleActive(element3)} className="products__block1_1">
                    <div className="products__block1_1_header">
                        <h5>Rating </h5>
                        <div className="collapse_indicator">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div ref={element3} className="products__block1_1_options">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                    </div>
                </div>
                <div onClick={()=>toggleActive(element3)} className="products__block1_1">
                    <div className="products__block1_1_header">
                        <h5>Rating </h5>
                        <div className="collapse_indicator">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div ref={element3} className="products__block1_1_options">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                    </div>
                </div>
            </div>
            <div className="products__block2">
                {products.length > 0 &&
                    products.map((prod, k) => <Product product={prod} key={k} />)}
            </div>

        </div>
    );
}

export default Products;