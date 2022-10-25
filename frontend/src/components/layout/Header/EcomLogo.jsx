import React from 'react';
import logo from "../../../logo/ecom_logo_tsp.png";
import './EcomLogo.css'
function EcomLogo() {
    return (
        <div className='ecom-logo'>
            <img src={logo} alt="ecommerce logo" />
        </div>
    );
}

export default EcomLogo;