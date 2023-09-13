import React from "react";
import "./cart.css";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CartItemCard from "./CartItemCard";
import { addToCart, removeCartItem } from "../../reducers/Cart/cartReducer";
const Cart = () => {
	const { cartItems } = useSelector((state) => state.cartReducer);

	const dispatch = useDispatch();

	const increaseQuantity = (item) => {
		const newQty = item.quantity + 1;
		dispatch(addToCart({ ...item, quantity: newQty }));
	};

	const decreaseQuantity = (item) => {
		const newQty = item.quantity - 1;
		dispatch(addToCart({ ...item, quantity: newQty }));
	};

	const deleteCartItems = (item) => {
		dispatch(removeCartItem(item));
	};

	let totalPrice = 0;
	const grossTotalPrice = () => {
		cartItems.forEach((element) => {
			totalPrice += element.price * element.quantity;
		});
		return totalPrice;
	};

	return (
		<>
			{cartItems.length === 0 ? (
				<div className="emptyCart">
					<RemoveShoppingCartIcon />

					<Typography>No Product in Your Cart</Typography>
					<Link to="/products">View Products</Link>
				</div>
			) : (
				<>
					<div className="cartPage">
						<div className="cartHeader">
							<p>Product</p>
							<p>Quantity</p>
							<p>Subtotal</p>
						</div>

						{cartItems &&
							cartItems.map((item) => (
								<div className="cartContainer" key={item.product}>
									<CartItemCard item={item} deleteCartItems={deleteCartItems} />
									<div className="cartInput">
										<button
											disabled={item.quantity === 1}
											onClick={() => decreaseQuantity(item)}
										>
											-
										</button>
										<input type="number" value={item.quantity} readOnly />
										<button
											disabled={item.quantity === item.stock}
											onClick={() => increaseQuantity(item)}
										>
											+
										</button>
									</div>
									<p className="cartSubtotal">{`₹ ${
										item.price * item.quantity
									}`}</p>
								</div>
							))}

						<div className="cartGrossProfit">
							<div></div>
							<div className="cartGrossProfitBox">
								<p>Gross Total</p>
								<p>{`₹${grossTotalPrice()}`}</p>
							</div>
							<div></div>
							<div className="checkOutBtn">
								<Button variant="contained">Check Out</Button>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Cart;
