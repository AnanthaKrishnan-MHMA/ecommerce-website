import React from 'react';
import logo from "../../../logo/ecom_logo_tsp.png";
import { ReactNavbar } from "overlay-navbar";

function Header(props) {
    return (
        <div>

            <ReactNavbar
                navColor1="white"
                logo={logo} logoAnimationTime="1"
                logoWidth="20vmax" logHoverSize="10px" logoHoverColor="white"
                link1Text="HOME" link2Text="PRODUCTS" link3Text="ABOUT US" link4Text="CONTACT US"
                link1Url="/" link2Url="/procucts" link3Url="/about" link4Url="/contact"
                link1Size="1.3vmax" link1Color="rgba(21,21,21,0.8)" link1Margin="1.5vmax"
                link1ColorHover="#246ec9" link1AnimationTime="0"
                nav1justifyContent="flex-end"
                nav2justifyContent="flex-end"
                nav3justifyContent="flex-start"
                nav4justifyContent="flex-start"
                profileIconColor="rgba(21,21,21,0.8)" profileIconMargin="1vmax"
                cartIconColor="rgba(21,21,21,0.8)" cartIconMargin="1vmax"
                searchIconColor="rgba(21,21,21,0.8)" searchIconMargin="1vmax"
            />
        </div>
    );
}

export default Header;