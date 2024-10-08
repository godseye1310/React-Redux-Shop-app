import { cartActions } from "./cart-reducer";
import { uiActions } from "./ui-reducer";

export const getCartData = () => {
	return (dispatch) => {
		const fetchCartData = async () => {
			dispatch(uiActions.setShowNotification(true));
			dispatch(
				uiActions.showNotification({
					status: "pending",
					title: "Fetching ...",
					message: "Fetching cart data!",
				})
			);
			console.log("fetching");
			try {
				const response = await fetch(
					"https://redux-store-5937e-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
				);
				if (!response.ok) {
					throw new Error("Fetching cart data failed");
				}
				const data = await response.json();
				console.log(data);
				const fetchCartData = data.cartList;
				console.log(fetchCartData);
				dispatch(cartActions.replaceCart(data));
				dispatch(
					uiActions.showNotification({
						status: "success",
						title: "Success!",
						message: "Fetched cart data successfully!",
					})
				);
				console.log("fetched");
			} catch (error) {
				console.log(error);
				dispatch(
					uiActions.showNotification({
						status: "error",
						title: "Error!",
						message: "Fetching cart data failed!",
					})
				);
			} finally {
				setTimeout(() => {
					dispatch(uiActions.setShowNotification(false));
					dispatch(
						uiActions.showNotification({
							status: " ",
							title: " ",
							message: " ",
						})
					);
				}, 1500);
			}
		};
		fetchCartData();
	};
};

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
