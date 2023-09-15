import React, { useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { Country, State } from "country-state-city";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAnStationIcon from "@mui/icons-material/TransferWithinAStation";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../reducers/Cart/cartReducer";
import "./shipping.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShippingInfo = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const { shippingInfo } = useSelector((state) => state.cartReducer);

	const [address, setAddress] = useState(shippingInfo.address);
	const [city, setCity] = useState(shippingInfo.city);
	const [phoneNo, setNumber] = useState(shippingInfo.phoneNo);
	const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
	const [country, setCountry] = useState(shippingInfo.country);
	const [state, setState] = useState(shippingInfo.state);

	const shippingSubmit = (e) => {
		e.preventDefault();
		dispatch(
			saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
		);
		navigate("/order/confirm");
	};
	return (
		<>
			<CheckoutSteps activeStep={0} />
			<div className="shippingContainer">
				<div className="shippingBox">
					<h2 className="shippingHeading">Shipping Details</h2>

					<form className="shippingForm" onSubmit={shippingSubmit}>
						<div>
							<HomeIcon />
							<input
								type="text"
								placeholder="Address"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								required
							/>
						</div>

						<div>
							<LocationCityIcon />
							<input
								type="text"
								placeholder="City"
								value={city}
								onChange={(e) => setCity(e.target.value)}
								required
							/>
						</div>

						<div>
							<PinDropIcon />
							<input
								type="number"
								placeholder="Pin Code"
								value={pinCode}
								onChange={(e) => setPinCode(e.target.value)}
								required
							/>
						</div>

						<div>
							<PhoneIcon />
							<input
								type="number"
								placeholder="Phone Number"
								value={phoneNo}
								onChange={(e) => setNumber(e.target.value)}
								required
								size={10}
							/>
						</div>

						<div>
							<PublicIcon />

							<select
								onChange={(e) => setCountry(e.target.value)}
								value={country}
								required
							>
								<option value="">Country</option>
								{Country &&
									Country.getAllCountries().map((item) => (
										<option key={item.isoCode} value={item.isoCode}>
											{item.name}
										</option>
									))}
							</select>
						</div>
						{country && (
							<div>
								<TransferWithinAnStationIcon />

								<select
									onChange={(e) => setState(e.target.value)}
									value={state}
									required
								>
									<option value="">State</option>
									{country &&
										State.getStatesOfCountry(country).map((item) => (
											<option key={item.isoCode} value={item.isoCode}>
												{item.name}
											</option>
										))}
								</select>
							</div>
						)}
						<Button
							type="submit"
							color="error"
							variant="contained"
							sx={{ width: "20vmax" }}
						>
							Continue
						</Button>
					</form>
				</div>
			</div>
		</>
	);
};

export default ShippingInfo;
