import React, { Fragment } from 'react';
import {CgMouse} from "react-icons/all";
import './Home.css';
function Home(props) {
    return (
        <Fragment>
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>Explore The Best Deals and Find Amazing Products</h1>
                <a href="#container">
                    <button>
                        scroll <CgMouse/>
                    </button>
                </a>
            </div>
        </Fragment>
    );
}

export default Home;