import { Rating } from "@mui/material";
import React from "react";
import profilePng from "../../images/Profile.png";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../reducers/ProductDetail/productDetailAction";

const ReviewCard = ({ review, pid }) => {
	const options = {
		value: review.rating,
		readOnly: true,
		precision: 0.5,
		size: window.innerWidth < 800 ? "small" : "medium",
	};

	const { user } = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();

	const handleDeleteButton = () => {
		deleteReview(dispatch, pid, review._id);
	};

	return (
		<div className="reviewCard">
			<img src={profilePng} alt="" />
			<p>{review.name}</p>
			<Rating {...options} />
			<span>{review.comment}</span>
			{user && user._id === review.user ? (
				<DeleteIcon onClick={handleDeleteButton} />
			) : (
				<></>
			)}
		</div>
	);
};

export default ReviewCard;
