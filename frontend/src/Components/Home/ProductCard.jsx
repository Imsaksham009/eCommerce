import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
	const options = {
		value: 2.5,
		color: "rgba(20,20,20,0.1)",
		activeColor: "#ffd700",
		readOnly: true,
		edit: false,
		precision: 0.5,
		isHalf: true,
		size: window.innerWidth < 600 ? 20 : 25,
	};
	return (
		<Link className="productCard">
			<img src={product.imageUrl} alt={product.name} />
			<p>{product.name}</p>
			<div>
				<ReactStars {...options} />
				<span className="productCardSpan"> (250 Reviews)</span>
			</div>
			<span>{`₹${product.price}`}</span>
		</Link>
	);
};

export default ProductCard;
