import React from 'react';
import { useRef } from 'react';
import './FilterBasic.css'

function FilterBasic({ onPriceChange, onCategoryChange, onBrandChange }) {
    let minPrice = useRef(0);
    let maxPrice = useRef(1000000);
    let filterDisplay = useRef();

    const handlePriceChange = (e, priceRange) => {
        cbOnlyOneActive(e.target)

        if (e.target.checked) {
            onPriceChange(priceRange);
        } else {
            onPriceChange({ minPrice: 0, maxPrice: 100000 })
        }
    }

    const handleCategoryChange = (e, queryStr) => {
        cbOnlyOneActive(e.target)
        if (e.target.checked) {
            onCategoryChange(queryStr);
        } else {
            onCategoryChange("");
        }
    }
    const handleBrandChange = (e) => {

            let arr = document.getElementsByClassName(e.target.className);
            let brandQuery = [];
            [].forEach.call(arr, (el) => {
                if(el.checked){
                    brandQuery.push(el.value);
                }
            })
            onBrandChange(brandQuery.join("|"));
    }

    const onClickSubmit = (e) => {
        e.preventDefault();

        const minPriceNum = Number(minPrice.current.value);
        const maxPriceNum = Number(maxPrice.current.value);
        if (minPriceNum >= 0 &&
            minPriceNum < maxPriceNum) {
            // deselecting already selected price range if any.
            let group = document.getElementsByClassName("checkbox-price");
            [].forEach.call(group, (el) => {
                el.checked = false;
            });
            onPriceChange(
                {
                    minPrice: minPrice.current.value,
                    maxPrice: maxPrice.current.value
                }
            );
        }

    }
    // To restrict selection of group of checkbox to only one at a time
    const cbOnlyOneActive = (target) => {
        const arr = document.getElementsByClassName(target.className);

        for (let el of arr) {
            if (target !== el) {
                el.checked = false;
            }
        }
    }

    return (
        <div className="filter_basic">
            <div ref={filterDisplay} className="filter_basic_main">
                {/* price */}
                <div className="filter_basic_main_category">

                    <ul>
                        <li><strong>Price</strong></li>
                        <li><input className="checkbox-price" type="checkbox" onChange={(e) => handlePriceChange(e, { minPrice: 0, maxPrice: 500 })} /><label>Below Rs.500</label></li>
                        <li><input className="checkbox-price" type="checkbox" onChange={(e) => handlePriceChange(e, { minPrice: 500, maxPrice: 1000 })} /><label>Rs.500-1000</label></li>
                        <li><input className="checkbox-price" type="checkbox" onChange={(e) => handlePriceChange(e, { minPrice: 1000, maxPrice: 2000 })} /><label>Rs.1000-2000</label></li>
                        <li><input className="checkbox-price" type="checkbox" onChange={(e) => handlePriceChange(e, { minPrice: 2000, maxPrice: 5000 })} /><label>Rs.2000-5000</label></li>
                        <li><input className="checkbox-price" type="checkbox" onChange={(e) => handlePriceChange(e, { minPrice: 5000, maxPrice: 1000000 })} /><label>Rs.5000+</label></li>
                    </ul>
                    <form>
                        <label htmlFor="minPrice">min</label>
                        <input type="number" name='minPrice' ref={minPrice} required />

                        <label htmlFor="maxPrice">max</label>
                        <input type="number" name='maxPrice' ref={maxPrice} required />

                        <input type="submit" value="apply"
                            onClick={onClickSubmit} />
                    </form>
                </div>
                {/* category */}
                <div className="filter_basic_main_category">
                    <ul>

                        <li><strong>category</strong></li>
                        <li><input className="checkbox-category" type="checkbox" onChange={(e) => handleCategoryChange(e, "toys")} /><label>Toys</label></li>
                        <li><input className="checkbox-category" type="checkbox" onChange={(e) => handleCategoryChange(e, "fashion")} /><label>Fashion</label></li>
                        <li><input className="checkbox-category" type="checkbox" onChange={(e) => handleCategoryChange(e, "furniture")} /><label>Furniture</label></li>
                        <li><input className="checkbox-category" type="checkbox" onChange={(e) => handleCategoryChange(e, "home appliances")} /><label>Home Appliances</label></li>
                        <li><input className="checkbox-category" type="checkbox" onChange={(e) => handleCategoryChange(e, "electronics")} /><label>Electronics</label></li>
                    </ul>
                </div>
                {/* brand */}
                <div className="filter_basic_main_category">
                    <ul>
                        <li><strong>Brand</strong></li>
                        <li><input className="checkbox-brand" value="nike" type="checkbox" onChange={(e) => handleBrandChange(e)} /><label>Nike</label></li>
                        <li><input className="checkbox-brand" value="addidas" type="checkbox" onChange={(e) => handleBrandChange(e)} /><label>Addidas</label></li>
                        <li><input className="checkbox-brand" value="nivia" type="checkbox" onChange={(e) => handleBrandChange(e)} /><label>Nivia</label></li>
                        <li><input className="checkbox-brand" value="roadster" type="checkbox" onChange={(e) => handleBrandChange(e)} /><label>Roadster</label></li>
                        <li><input className="checkbox-brand" value="lambo" type="checkbox" onChange={(e) => handleBrandChange(e)} /><label>Lambo</label></li>
                        <li><input className="checkbox-brand" value="mambo" type="checkbox" onChange={(e) => handleBrandChange(e)} /><label>Mambo</label></li>
                    </ul>
                </div>
                {/* brand dupe*/}
                <div className="filter_basic_main_category">
                    <ul>
                        <li><strong>Brand</strong></li>
                        <li><input type="checkbox" onChange={(e) => handleBrandChange(e.target.checked, "nike")} /><label>Nike</label></li>
                        <li><input type="checkbox" onChange={(e) => handleBrandChange(e.target.checked, "addidas")} /><label>Addidas</label></li>
                        <li><input type="checkbox" onChange={(e) => handleBrandChange(e.target.checked, "nivia")} /><label>Nivia</label></li>
                        <li><input type="checkbox" onChange={(e) => handleBrandChange(e.target.checked, "roadster")} /><label>Roadster</label></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FilterBasic;