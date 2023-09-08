// import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";

const Product = () => {
	const { id } = useParams();
	return <div>{id}</div>;
};

export default Product;
