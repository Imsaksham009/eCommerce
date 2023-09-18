import React, { useEffect, useState } from "react";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StorageIcon from "@mui/icons-material/Storage";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../reducers/Admin/adminAction";
import { clearErrors } from "../../reducers/Admin/adminReducer";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Loader/Loader";
import "./adminNewProduct.css";
import { useParams } from "react-router-dom";
import {
	clearAllErrors,
	getProductDetails,
} from "../../reducers/ProductDetail/productDetailAction";

const categ = [
	"Laptop",
	"Smartphones",
	"Footwear",
	"Camera",
	"Monitor",
	"Games",
	"Gym",
];

const AdminNewProduct = () => {
	const dispatch = useDispatch();
	const { loading, isUpdated, error } = useSelector(
		(state) => state.adminReducer
	);

	const { id } = useParams();
	const { product, error: productDetailError } = useSelector(
		(state) => state.productDetailReducer
	);

	const defaultData = {
		name: product.name,
		price: product.price,
		description: product.description,
		category: product.category,
		stock: product.stock,
		productimage: "",
	};
	const [data, setData] = useState(defaultData);
	const { name, price, description, category, stock, productimage } = data;

	const [preview, setPreview] = useState(["/Profile.png"]);
	const [imgLoading, setLoading] = useState(false);

	const handleInputChange = (e) => {
		if (e.target.name === "productimage") {
			setLoading(true);
			const reader = new FileReader();
			const file = e.target.files[0];
			if (file) reader.readAsDataURL(file);

			reader.onload = () => {
				if (reader.readyState === 2) {
					setPreview(reader.result);
					setLoading(false);
				}
			};

			setData({ ...data, productimage: file });
		} else setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const myForm = new FormData();
		myForm.append("name", name);
		myForm.append("price", Number(price));
		myForm.append("stock", Number(stock));
		myForm.append("description", description);
		myForm.append("category", category);
		myForm.append("productimage", productimage);
		updateProduct(dispatch, myForm, id);
	};

	useEffect(() => {
		setData(defaultData);
		// eslint-disable-next-line
	}, [product]);

	useEffect(() => {
		getProductDetails(dispatch, id);
	}, [id, dispatch]);

	useEffect(() => {
		if (productDetailError) {
			toast.error(productDetailError);
			clearAllErrors(dispatch);
		}
	}, [id, productDetailError, dispatch]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (isUpdated) {
			toast.success("Product Updated Successfully");
			dispatch(clearErrors());
		}
	}, [dispatch, error, isUpdated]);

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<div className="dashboard">
				{loading ? (
					<Loader />
				) : (
					<div className="newProductContainer">
						<form
							onSubmit={handleFormSubmit}
							className="createProductForm"
							encType="multipart/form-data"
						>
							<h1>Update Product</h1>

							<div>
								<SpellcheckIcon />
								<input
									type="text"
									placeholder="Product Name"
									required
									name="name"
									value={data.name}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<AttachMoneyIcon />
								<input
									type="number"
									placeholder="Price"
									required
									name="price"
									value={data.price}
									onChange={handleInputChange}
								/>
							</div>

							<div>
								<DescriptionIcon />

								<textarea
									placeholder="Product Description"
									value={data.description}
									required
									onChange={handleInputChange}
									name="description"
									cols="30"
									rows="1"
								></textarea>
							</div>

							<div>
								<AccountTreeIcon />
								<select name="category" required onChange={handleInputChange}>
									<option value="">Choose Category</option>
									{categ.map((cate) => (
										<option key={cate} value={cate}>
											{cate}
										</option>
									))}
								</select>
							</div>

							<div>
								<StorageIcon />
								<input
									type="number"
									placeholder="Stock"
									name="stock"
									required
									value={data.stock}
									onChange={handleInputChange}
								/>
							</div>

							<div id="createProductFormFile">
								<input
									type="file"
									name="productimage"
									accept="image/*"
									onChange={handleInputChange}
								/>
							</div>

							<div id="createProductFormImage">
								<img src={preview} alt="Product Preview" />
							</div>

							<Button
								color="error"
								fullWidth
								variant="outlined"
								id="createProductBtn"
								type="submit"
								disabled={imgLoading ? true : false}
							>
								Update
							</Button>
						</form>
					</div>
				)}
			</div>
		</>
	);
};

export default AdminNewProduct;
