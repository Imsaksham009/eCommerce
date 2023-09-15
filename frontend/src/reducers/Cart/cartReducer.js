import { createSlice } from "@reduxjs/toolkit";



const cartReducer = createSlice({
    name: "cart",
    initialState: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const itemExist = state.cartItems.find((i, index) => {
                return i.product === item.product;
            });

            if (!itemExist) {
                state.cartItems.push(item);
            } else {
                state.cartItems = state.cartItems.map((i) => {
                    if (i.product === item.product)
                        return item;
                    else return i;
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeCartItem: (state, action) => {
            const item = action.payload;
            state.cartItems = state.cartItems.filter((i) => {
                return i.product !== item.product;
            });
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        },
        clearCart: (state, action) => {
            state.error = null;
            state.loading = false;
            state.cartItems = [];
            localStorage.removeItem("cartItems");
        },
        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
            localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));

        }
    }
});


export const { addToCart, removeCartItem, saveShippingInfo, clearCart } = cartReducer.actions;

export default cartReducer.reducer;