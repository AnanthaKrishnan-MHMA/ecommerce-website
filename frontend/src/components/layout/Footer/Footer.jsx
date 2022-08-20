import React from 'react';
import appstore from "../../../logo/appstore.svg";
import googleplay from "../../../logo/googleplay.svg";
import "./Footer.css";

function Footer(props) {
    return (
        <footer className='footer'>
            <div className="footer__left">
                <h4>Download Our App</h4>
                <p>Download app for Android and IOS mobile phones</p>

                <img src={appstore} alt="App Store" />
                <img src={googleplay} alt="Google Play" />
            </div>
            <div className="footer__center">
                <h1>ECOMMERCE</h1>
                <p>High Quality Is Our First Priority</p>

                <p>Copyrights 2022 &copy; AnanthaKrishnan</p>
            </div>
            <div className="footer__right">
                <h4>Follow Us</h4>
                <a href="youtube.com/ananthakrishnan">Youtube</a>
                <a href="youtube.com/ananthakrishnan">Facebook</a>
                <a href="youtube.com/ananthakrishnan">Instagram</a>
            </div>
        </footer>
    );
}
export default Footer;
