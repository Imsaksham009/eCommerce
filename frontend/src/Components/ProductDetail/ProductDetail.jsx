import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	createNewReview,
	getProductDetails,
} from "../../reducers/ProductDetail/productDetailAction";
import { toast, ToastContainer } from "react-toastify";
import Carousel from "react-material-ui-carousel";
import ReviewCard from "../ReviewCard/ReviewCard.jsx";

import {
	Button,
	Rating,
	Typography,
	Modal,
	Box,
	Fade,
	Backdrop,
	TextField,
} from "@mui/material";
import Loader from "../Loader/Loader";
import { clearAllErrors } from "../../reducers/ProductDetail/productDetailAction";
import Metadata from "../Layout/metadata";
import { addToCart } from "../../reducers/Cart/cartReducer";
import "./productDetail.css";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const ProductDetail = () => {
	const dispatch = useDispatch();

	const { id } = useParams();
	const { error, product, loading, review, isReviewDeleted } = useSelector(
		(state) => state.productDetailReducer
	);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [value, setValue] = useState(1);

	const [comment, setComment] = useState("");
	const [rating, setRating] = useState(0);

	const handleNewReview = (e) => {
		e.preventDefault();
		createNewReview(dispatch, id, rating, comment);
		handleClose();
	};

	const addToCartHandler = () => {
		dispatch(
			addToCart({
				product: product._id,
				name: product.name,
				price: product.price,
				stock: product.stock,
				image: product.images[0].url,
				quantity: value,
			})
		);
		toast.success("Item added to Cart", {
			position: "bottom-right",
		});
	};

	useEffect(() => {
		if (review) {
			toast.success(review);
			clearAllErrors(dispatch);
		}
		if (isReviewDeleted) {
			toast.success("Review Deleted");
			clearAllErrors(dispatch);
		}
		getProductDetails(dispatch, id);
	}, [dispatch, id, review, isReviewDeleted]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearAllErrors(dispatch);
		}
	}, [error, dispatch]);

	const options = {
		value: product.ratings,
		readOnly: true,
		precision: 0.5,
		size: window.innerWidth < 800 ? "small" : "medium",
	};

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<div className="page">
				{loading ? (
					<Loader />
				) : (
					<>
						<Metadata title={`${product.name}`} />
						<div className="ProductDetails">
							<div>
								<Carousel sx={{ width: "35vmax", height: "40vmax" }}>
									{product.images &&
										product.images.map((item, i) => (
											<img
												className="CarouselImage"
												key={i}
												src={item.url}
												alt={`${i} Slide`}
											/>
										))}
								</Carousel>
							</div>

							<div>
								<div className="detailsBlock-1">
									<h2>{product.name}</h2>
									<p>Product # {product._id}</p>
								</div>

								<div className="detailsBlock-2">
									<Rating {...options} />
									<span className="detailsBlock-2-span">
										{" "}
										({product.numOfReviews} Reviews)
									</span>
								</div>

								<div className="detailsBlock-3">
									<h1>{`₹${product.price}`}</h1>
									<div className="detailsBlock-3-1">
										<div className="detailsBlock-3-1-1">
											<button
												disabled={value === 1 ? true : false}
												onClick={() => setValue(value - 1)}
											>
												-
											</button>
											<input
												readOnly
												type="number"
												value={value}
												min={1}
												max={product.stock}
											/>
											<button
												disabled={value >= product.stock ? true : false}
												onClick={() => setValue(value + 1)}
											>
												+
											</button>
										</div>
										<Button
											sx={{ margin: "1vmax" }}
											color={product.stock < 1 ? "error" : "success"}
											variant="outlined"
											disabled={product.stock < 1 ? true : false}
											onClick={addToCartHandler}
										>
											Add to Cart
										</Button>
									</div>

									<p>
										Status:
										<b
											className={product.stock < 1 ? "redColor" : "greenColor"}
										>
											{product.stock < 1 ? "OutOfStock" : "InStock"}
										</b>
									</p>
								</div>

								<div className="detailsBlock-4">
									Description : <p>{product.description}</p>
								</div>

								<div>
									<Button color="error" variant="outlined" onClick={handleOpen}>
										Add A review
									</Button>
									<Modal
										open={open}
										onClose={handleClose}
										aria-labelledby="review"
										aria-describedby="Submit a review"
										closeAfterTransition
										slots={{ backdrop: Backdrop }}
										slotProps={{
											backdrop: {
												timeout: 500,
											},
										}}
									>
										<Fade in={open}>
											<Box sx={style}>
												<Typography
													id="Add a Review"
													variant="h6"
													component="h2"
												>
													Add a Review
												</Typography>
												<Box sx={{ mt: 2 }}>
													<form onSubmit={handleNewReview}>
														<div>
															<Rating
																name="rating"
																defaultValue={0}
																value={Number(rating)}
																onChange={(e) => setRating(e.target.value)}
																precision={0.5}
																size="large"
																sx={{ marginBottom: "2vmax" }}
																required
															/>
														</div>
														<div>
															<TextField
																id="outlined-basic"
																label="Your Review"
																variant="outlined"
																multiline
																value={comment}
																maxRows={10}
																onChange={(e) => setComment(e.target.value)}
																sx={{ marginBottom: "2vmax", width: "25vmax" }}
																required
															/>
														</div>
														<Button type="submit" color="success">
															Submit
														</Button>
													</form>
												</Box>
											</Box>
										</Fade>
									</Modal>
								</div>
							</div>
						</div>
						<div>
							<h3 className="reviewsHeading">Reviews</h3>
							{product.reviews && product.reviews[0] ? (
								<div className="reviews">
									{product.reviews.map((review) => {
										return (
											<ReviewCard
												key={review._id}
												review={review}
												pid={product._id}
											/>
										);
									})}
								</div>
							) : (
								<p className="noReviews">No Reviews Yet</p>
							)}
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default ProductDetail;
