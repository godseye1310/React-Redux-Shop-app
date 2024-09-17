import { createSlice } from "@reduxjs/toolkit";

const initialState = { isCartDisplay: false };

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		cartDisplay: (state) => {
			state.isCartDisplay = !state.isCartDisplay;
		},
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
