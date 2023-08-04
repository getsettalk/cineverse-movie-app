import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
                    Welcome to Cinematica, where enchanting stories come to life. This magical movie app grants access to a vast collection of timeless classics and captivating new releases.
                    Immerse yourself in mesmerizing plots, brilliant performances, and breathtaking visuals.
                    From romance to adventure, comedy to drama, Cinematica delivers an enchanting cinematic experience right at your fingertips. Lights, camera, action! <br />
                    Developed By Sujeet Kumar
                </div>
                <div className="socialIcons">
                    <span className="icon">
                        <FaFacebookF />
                    </span>
                    <span className="icon">
                        <FaInstagram />
                    </span>
                    <span className="icon">
                        <FaTwitter />
                    </span>
                    <span className="icon" onClick={() => window.open("https://www.linkedin.com/in/sujeet-kumar-sharma-b36609201/")}>
                        <FaLinkedin />
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;