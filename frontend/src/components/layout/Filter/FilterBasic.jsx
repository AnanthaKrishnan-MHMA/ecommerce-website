import React from 'react';
import { useRef } from 'react';
import './FilterBasic.css'


function FilterBasic({ onPriceChange }) {
    let minPrice = useRef(0);
    let maxPrice = useRef(1000000);
    let filterDisplay = useRef();
    let sortButton = useRef();
    let filterDisplayElements = useRef([]);
    const handlePriceChange = (checked, priceRange) => {
        // have to create a functionality for multiple cbox selected
        if (checked) {
            onPriceChange(priceRange);
        } else {
            onPriceChange({ minPrice: 0, maxPrice: 100000 })
        }
    }
    const buttonApplyClicked = () => {
        let priceRange = { minPrice: Number(minPrice.current.value), maxPrice: Number(maxPrice.current.value) }
        onPriceChange(priceRange);
    }
    const enableFilter = () => {
        filterDisplay.current.classList.toggle("active");
    }
    const enableSort = () => {

    }
    const showDisplayElements = (ei) => {
        for (let i = 0; i < filterDisplayElements.current.length; i++) {
            if(i===ei){
                filterDisplayElements.current[i].classList.remove("inactive");
            }else{
                filterDisplayElements.current[i].classList.add("inactive");
            }
        }
    }
    return (
        <div className="filter_basic">
            <div ref={filterDisplay} className="filter_basic_main">
                <div ref={el => filterDisplayElements.current[0] = el} className="filter_basic_display">

                    <h4 className='filter_basic_display_header'>Price</h4>
                    <div className='filter_basic_display_options'>
                        <input type="checkbox" name="price-range" id="under-rs500"
                            onChange={(e) => handlePriceChange(e.target.checked, { minPrice: 0, maxPrice: 500 })} />
                        <label htmlFor="under-rs500">Under Rs.500</label>
                    </div>
                    <div className='filter_basic_display_options'>
                        <input type="checkbox" name="price-range" id="rs500-rs1000"
                            onChange={(e) => handlePriceChange(e.target.checked, { minPrice: 500, maxPrice: 1000 })} />
                        <label htmlFor="rs500-rs1000">Rs.500-1000</label>
                    </div>
                    <div className='filter_basic_display_options'>
                        <input type="checkbox" name="price-range" id="rs1000-rs2500"
                            onChange={(e) => handlePriceChange(e.target.checked, { minPrice: 1000, maxPrice: 2500 })} />
                        <label htmlFor="rs1000-rs2500">Rs.1000-2500</label>
                    </div>
                    <div className='filter_basic_display_options'>
                        <input type="checkbox" name="price-range" id="rs2500-rs5000"
                            onChange={(e) => handlePriceChange(e.target.checked, { minPrice: 2500, maxPrice: 5000 })} />
                        <label htmlFor="rs2500-rs5000">Rs.2500-5000</label>
                    </div>
                    <div className='filter_basic_display_options'>
                        <input type="checkbox" name="price-range" id="rs5000+"
                            onChange={(e) => handlePriceChange(e.target.checked, { minPrice: 5000, maxPrice: 1000000 })} />
                        <label htmlFor="rs5000+">Rs.5000+</label>
                    </div>

                    <div className='filter_basic_display_minmax'>
                        <label htmlFor="minPrice">Min</label>
                        <input type="number" name="minPrice" placeholder='min' ref={minPrice} />
                        <label htmlFor="maxPrice">Max</label>
                        <input type="number" name="maxPrice" placeholder='max' ref={maxPrice} />
                    </div>

                    <div className='filter_basic_display_applybutton'>
                        <button className='price-apply-button' onClick={buttonApplyClicked}>apply</button>
                    </div>
                </div>
                <div ref={el => filterDisplayElements.current[1] = el} className="filter_basic_display inactive">
                    <h1>category display</h1>
                    {/* 
                <h4>Price</h4>
                <div>
                    <input type="checkbox" name="price-range" id="under-rs500"
                        onChange={(e) => handlePriceChange(e.target.checked, { minPrice: 0, maxPrice: 500 })} />
                    <label htmlFor="under-rs500">Under Rs.500</label>
                </div>
                <div>
                    <input type="checkbox" name="price-range" id="rs500-rs1000"
                        onChange={(e) => handlePriceChange(e.target.checked, { minPrice: 500, maxPrice: 1000 })} />
                    <label htmlFor="rs500-rs1000">Rs.500-1000</label>
                </div>
                <div>
                    <input type="checkbox" name="price-range" id="rs1000-rs2500"
                        onChange={(e) => handlePriceChange(e.target.checked, { minPrice: 1000, maxPrice: 2500 })} />
                    <label htmlFor="rs1000-rs2500">Rs.1000-2500</label>
                </div>
                <div>
                    <input type="checkbox" name="price-range" id="rs2500-rs5000"
                        onChange={(e) => handlePriceChange(e.target.checked, { minPrice: 2500, maxPrice: 5000 })} />
                    <label htmlFor="rs2500-rs5000">Rs.2500-5000</label>
                </div>
                <div>
                    <input type="checkbox" name="price-range" id="rs5000+"
                        onChange={(e) => handlePriceChange(e.target.checked, { minPrice: 5000, maxPrice: 1000000 })} />
                    <label htmlFor="rs5000+">Rs.5000+</label>
                </div>

                <div>
                    <label htmlFor="minPrice">Min</label>
                    <input type="number" name="minPrice" placeholder='min' ref={minPrice} />
                </div>
                <div>
                    <label htmlFor="maxPrice">Max</label>
                    <input type="number" name="maxPrice" placeholder='max' ref={maxPrice} />
                </div>
                <div>
                    <button className='price-apply-button' onClick={buttonApplyClicked}>apply</button>
                </div> */}
                </div>
                <div className="filter_basic_options">
                    <h4>Filters</h4>
                    <button onClick={()=>showDisplayElements(0)}>Price</button>
                    <button onClick={()=>showDisplayElements(1)}>Category</button>
                </div>
            </div>
            <div className="filter_basic_collapsed">
                <button onClick={enableSort}>sort by</button>
                <button onClick={enableFilter}>Filters</button>
            </div>

        </div>
    );
}

export default FilterBasic;