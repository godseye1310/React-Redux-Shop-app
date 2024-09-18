import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui-reducer";

let isInitial = true;

function App() {
	const isCartDisplay = useSelector((state) => state.cart.isCartDisplay);
	const notification = useSelector((state) => state.ui.notification);

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartList, totalItems } = cart;
	useEffect(() => {
		const postCartData = async () => {
			dispatch(
				uiActions.showNotification({
					status: "pending",
					title: "Sending...",
					message: "Sending cart data!",
				})
			);
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
				// setTimeout(() => {
				// 	dispatch(uiActions.showNotification(null));
				// }, 1500);
			}
		};

		if (isInitial) {
			isInitial = false;
			return;
		}
		postCartData();
	}, [cartList, totalItems, dispatch]);
	return (
		<>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{isCartDisplay && <Cart />}
				<Products />
			</Layout>
		</>
	);
}

export default App;
