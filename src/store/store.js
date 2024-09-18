import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-reducer";
import uiReducer from "./ui-reducer";

const store = configureStore({
	reducer: {
		cart: cartReducer,
		ui: uiReducer,
	},
});

export default store;
