import React from 'react';
import ReactLoading from "react-loading"
import { Fragment } from "react";
import "./Loader.css"

function Loader({on,type,color}) {
    return (
        <Fragment>
            {on && <div className='loader'>
                <ReactLoading type={type} color={color}/>
            </div>}
        </Fragment>
    );
}

export default Loader;