import React from 'react';
import Search from '../../Search/Search';
import EcomLogo from './EcomLogo';
import './FullHeader.css'
function FullHeader(props) {
    return (
        <div className='full-header'>
            <EcomLogo/>
            <Search />
        </div>
    );
}

export default FullHeader;