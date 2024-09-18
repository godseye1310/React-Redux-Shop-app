import { createSlice } from "@reduxjs/toolkit";

const initialState = { isCartDisplay: false, cartList: [], totalItems: 0 };

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		cartDisplay: (state) => {
			state.isCartDisplay = !state.isCartDisplay;
		},
		addToCart: (state, actions) => {
			state.totalItems++;
			const newItem = actions.payload;
			const existingItem = state.cartList.find(
				(item) => item.id === newItem.id
			);
			if (!existingItem) {
				state.cartList = [
					...state.cartList,
					{ ...newItem, quantity: 1, totalPrice: +newItem.price },
				];
			} else {
				state.cartList = state.cartList.map((item) => {
					return item.id === newItem.id
						? {
								...item,
								quantity: item.quantity + 1,
								totalPrice:
									+newItem.price * (item.quantity + 1),
						  }
						: item;
				});
			}
		},
		removeFormCart: (state, actions) => {
			state.totalItems--;
			const id = actions.payload;
			state.cartList = state.cartList
				.map((item) => {
					return item.id === id && item.quantity >= 1
						? {
								...item,
								quantity: item.quantity - 1,
								totalPrice: item.totalPrice - item.price,
						  }
						: item;
				})
				.filter((item) => {
					return !(item.quantity === 0 && item.id === id);
				});
		},
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
