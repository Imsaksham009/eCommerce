import { Rating } from "@mui/material";
import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
	const options = {
		value: review.rating,
		readOnly: true,
		precision: 0.5,
		size: window.innerWidth < 800 ? "small" : "medium",
	};

	return (
		<div className="reviewCard">
			<img src={profilePng} alt="" />
			<p>{review.name}</p>
			<Rating {...options} />
			<span>{review.comment}</span>
		</div>
	);
};

export default ReviewCard;
