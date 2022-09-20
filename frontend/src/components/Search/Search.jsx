import React, { Fragment } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import "./Search.css";

function Search() {
    let navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const onSubmitHandler = (e) => {
        e.preventDefault();
        let searchKey = keyword.trim();
        if (searchKey) {
            navigate(`/products/${keyword}`);
        } else {
            navigate(`/products`);
        }
    }
    return (
        <Fragment>
            <form className='searchBox' onSubmit={onSubmitHandler}>
                <div>
                    <input type="text" placeholder='search product ...' onChange={(e) => { setKeyword(e.target.value) }} />
                    <input type="submit" value="Search" />
                </div>
            </form>
        </Fragment>
    );
}

export default Search;