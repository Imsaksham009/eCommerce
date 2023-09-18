import React, { useEffect, useState } from "react";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StorageIcon from "@mui/icons-material/Storage";
import { Button } from "@mui/material";

import "./adminNewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { createNewProduct } from "../../reducers/Admin/adminAction";
import { clearErrors } from "../../reducers/Admin/adminReducer";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Loader/Loader";

const categ = [
	"Laptop",
	"Smartphones",
	"Footwear",
	"Camera",
	"Monitor",
	"Games",
	"Gym",
];

const defaultData = {
	name: "",
	price: "",
	description: "",
	category: "",
	stock: "",
	productimage: "",
};

const AdminNewProduct = () => {
	const dispatch = useDispatch();
	const { loading, isNewProduct, error } = useSelector(
		(state) => state.adminReducer
	);
	const [data, setData] = useState(defaultData);

	const { name, price, description, category, stock, productimage } = data;

	const [preview, setPreview] = useState(["/Profile.png"]);
	const [imgLoading, setLoading] = useState(true);

	const handleInputChange = (e) => {
		if (e.target.name === "productimage") {
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
		createNewProduct(dispatch, myForm);
		setData(defaultData);
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (isNewProduct) {
			toast.success("Product Created Successfully");
			dispatch(clearErrors());
		}
	}, [dispatch, error, isNewProduct]);

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
							<h1>Create Product</h1>

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
									required
									multiple
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
								Create
							</Button>
						</form>
					</div>
				)}
			</div>
		</>
	);
};

export default AdminNewProduct;
