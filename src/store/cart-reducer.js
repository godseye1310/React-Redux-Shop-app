import { createSlice } from "@reduxjs/toolkit";

const initialState = { isCartDisplay: false, cartList: [], totalItems: 0 };

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		cartDisplay: (state) => {
			state.isCartDisplay = !state.isCartDisplay;
		},
		replaceCart: (state, action) => {
			state.totalItems = action.payload.totalItems;
			state.cartList = action.payload.cartList;
		},
		addToCart: (state, actions) => {
			state.totalItems++;
			const newItem = actions.payload;
			const existingItem = state.cartList.find(
				(item) => item.id === newItem.id
			);
			if (!existingItem) {
				state.cartList.push({
					...newItem,
					quantity: 1,
					totalPrice: +newItem.price,
				});
				// state.cartList = [
				// 	...state.cartList,
				// 	{ ...newItem, quantity: 1, totalPrice: +newItem.price },
				// ];
			} else {
				existingItem.quantity++;
				existingItem.totalPrice += existingItem.price;
				// state.cartList = state.cartList.map((item) => {
				// 	return item.id === newItem.id
				// 		? {
				// 				...item,
				// 				quantity: item.quantity + 1,
				// 				totalPrice:
				// 					+newItem.price * (item.quantity + 1),
				// 		  }
				// 		: item;
				// });
			}
		},
		removeFormCart: (state, actions) => {
			state.totalItems--;
			const id = actions.payload;
			const removeItem = state.cartList.find((item) => item.id === id);
			if (removeItem.quantity > 1) {
				removeItem.quantity--;
				removeItem.totalPrice -= removeItem.price;
			} else {
				removeItem.totalPrice -= removeItem.price;
				state.cartList = state.cartList.filter((item) => {
					return !(item.id === id);
				});
			}
			// state.cartList = state.cartList
			// 	.map((item) => {
			// 		return item.id === id && item.quantity >= 1
			// 			? {
			// 					...item,
			// 					quantity: item.quantity - 1,
			// 					totalPrice: item.totalPrice - item.price,
			// 			  }
			// 			: item;
			// 	})
			// 	.filter((item) => {
			// 		return !(item.quantity === 0 && item.id === id);
			// 	});
		},
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
