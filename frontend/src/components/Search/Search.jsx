import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Search.css";

function Search(props) {
    const [keyword,setKeyword] = useState("");
    const setKeywordFun=(textInp)=>{
        setKeyword(textInp);
    }
    return (
        <div className='search'>
            <input type="text" onChange={(e)=>{setKeywordFun(e.target.value)}}/>
            <Link to={`/products/${keyword}`}>
                <button>search</button>
            </Link>
        </div>
    );
}

export default Search;