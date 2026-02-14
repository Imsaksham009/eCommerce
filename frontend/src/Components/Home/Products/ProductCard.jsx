import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import "./productCard.css";

const ProductCard = ({ product }) => {
	const options = {
		value: product.ratings,
		color: "rgba(255,255,255,0.32)",
		activeColor: "#f59e0b",
		readOnly: true,
		edit: false,
		precision: 0.5,
		isHalf: true,
		size: window.innerWidth < 800 ? 19 : 22,
	};

	const formattedPrice = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0,
	}).format(product.price || 0);

	return (
		<Link to={`/product/${product._id}`} className="productCard">
			<div className="productCardImageWrap">
				<img
					src={product.images?.[0]?.url || "/logo192.png"}
					alt={product.name}
				/>
				<span className="productCardBadge">{product.category || "Top Pick"}</span>
			</div>
			<div className="productCardBody">
				<p className="productCardName">{product.name}</p>
				<div className="productCardMeta">
					<ReactStars {...options} />
					<span className="productCardReviews">{product.numOfReviews} reviews</span>
				</div>
				<div className="productCardBottom">
					<span className="productCardPrice">{formattedPrice}</span>
					<span className="productCardCta">View Details</span>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
