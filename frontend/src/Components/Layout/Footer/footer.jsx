import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import logo from "../../../images/logo.png";
import "./Footer.css";

const Footer = () => {
	return (
		<footer id="footer">
			<div className="leftFooter">
				<h4>DOWNLOAD OUR APP</h4>
				<p>Download App for Android and IOS mobile phone</p>
				<img src={playStore} alt="playstore" />
				<img src={appStore} alt="Appstore" />
			</div>

			<div className="midFooter">
				<img width="500px" src={logo} alt="" />
				<p>High Quality is our first priority</p>

				<p>Copyrights 2023 &copy; Saksham Gupta</p>
			</div>

			<div className="rightFooter">
				<h4>Follow Us</h4>
				<a
					href="http://instagram.com/imsaksham009"
					target="_blank"
					rel="noreferrer"
				>
					Instagram
				</a>
				<a href="http://youtube.com/" target="_blank" rel="noreferrer">
					Youtube
				</a>
				<a href="http://instagram.com/" target="_blank" rel="noreferrer">
					Facebook
				</a>
			</div>
		</footer>
	);
};

export default Footer;
