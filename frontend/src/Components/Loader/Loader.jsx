import React from "react";
import loader from "./loader.gif";
const Loader = () => {
	return (
		<img
			src={loader}
			alt="loading"
			style={{
				margin: "0% 46%",
				width: "130px",
				height: "130px",
			}}
		/>
	);
};

export default Loader;
