import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-reducer";

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

export const sendCartData = (cart) => {
	return (dispatch) => {
		const { cartList, totalItems } = cart;
		const postCartData = async () => {
			dispatch(uiActions.setShowNotification(true));
			dispatch(
				uiActions.showNotification({
					status: "pending",
					title: "Sending...",
					message: "Sending cart data!",
				})
			);
			// console.log(isInitial);

			try {
				const response = await fetch(
					"https://redux-store-5937e-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
					{
						method: "PUT",
						body: JSON.stringify({ cartList, totalItems }),
					}
				);

				if (!response.ok) {
					throw new Error("Sending cart data failed");
				}

				dispatch(
					uiActions.showNotification({
						status: "success",
						title: "Success!",
						message: "Sent cart data successfully!",
					})
				);
			} catch (error) {
				console.log(error);
				dispatch(
					uiActions.showNotification({
						status: "error",
						title: "Error!",
						message: "Sending cart data failed!",
					})
				);
			} finally {
				setTimeout(() => {
					dispatch(uiActions.setShowNotification(false));
					dispatch(
						uiActions.showNotification({
							status: "",
							title: "",
							message: "",
						})
					);
				}, 1500);
			}
		};
		postCartData();
	};
};
