import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
	const options = {
		value: product.ratings,
		color: "rgba(20,20,20,0.1)",
		activeColor: "#ffd700",
		readOnly: true,
		edit: false,
		precision: 0.5,
		isHalf: true,
		size: window.innerWidth < 800 ? 20 : 25,
	};
	return (
		<Link to={`/product/${product._id}`} className="productCard">
			<img src={product.images[0].url} alt={product.name} />
			<p>{product.name}</p>
			<div>
				<ReactStars {...options} />
				<span className="productCardSpan">
					({product.numOfReviews} Reviews)
				</span>
			</div>
			<span>{`₹${product.price}`}</span>
		</Link>
	);
};

export default ProductCard;
