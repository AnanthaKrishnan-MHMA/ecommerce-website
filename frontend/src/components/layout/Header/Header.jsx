import React from 'react';
import logo from "../../../logo/logo64.svg";
import { ReactNavbar } from "overlay-navbar";

function Header(props) {
    return (
        <div>
            
            <ReactNavbar
                logo={logo}
                navColor1="#87c7d9"
                logoWidth="10vmax"
                logHoverSize="10px"
                logoHoverColor="#c674fb"
                link1Text="HOME" link2Text="PRODUCTS" link3Text="ABOUT US" link4Text="CONTACT US"
                link1Url="/" link2Url="/procucts" link3Url="/about" link4Url="/contact"
                link1Size="1.3vmax"
                link1Color="rgb(231,231,231)"
                nav1justifyContent="flex-end"
                nav2justifyContent="flex-end"
                nav3justifyContent="flex-start"
                nav4justifyContent="flex-start"
                link1Margin="1vmax"
                link1ColorHover="#c674fb"
                profileIconColor="rgb(231,231,231)" profileIconMargin="1vmax"
                cartIconColor="rgb(231,231,231)" cartIconMargin="1vmax"
                searchIconColor="rgb(231,231,231)" searchIconMargin="1vmax"
            />
        </div>
    );
}

export default Header;