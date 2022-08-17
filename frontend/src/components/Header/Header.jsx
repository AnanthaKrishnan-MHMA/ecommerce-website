import React from 'react';
import logo from "../../logo/logo64.svg";
import { ReactNavbar } from "overlay-navbar";
import { ImSearch} from 'react-icons/im';
function Header(props) {
    return (
        <div>
            <ReactNavbar
                logo={logo}
                navColor1="#B2A4FF"
                logoWidth="10vmax"
                logHoverSize="10px"
                logoHoverColor="#c674fb"
                link1Text="HOME" link2Text="PRODUCTS" link3Text="ABOUT US" link4Text="CONTACT US"
                link1Url="/" link2Url="/procucts" link3Url="/about" link4Url="/contact"
                link1Size="1.3vmax"
                link1Color="rgba(35,35,35,0.8)"
                nav1justifyContent="flex-end"
                nav2justifyContent="flex-end"
                nav3justifyContent="flex-start"
                nav4justifyContent="flex-start"
                link1Margin="1vmax"
                link1ColorHover="#c674fb"
                profileIconColor="rgba(35,35,35,0.8)"
                cartIconColor="rgba(35,35,35,0.8)"
                searchIconColor="red" SearchIconElement={<ImSearch/>} searchIconSize="2vmax" 
            />
        </div>
    );
}

export default Header;