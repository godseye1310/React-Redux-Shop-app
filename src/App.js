import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
// import { uiActions } from "./store/ui-reducer";
// import { cartActions } from "./store/cart-reducer";
import { getCartData, sendCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
	const isCartDisplay = useSelector((state) => state.cart.isCartDisplay);
	const { notification, notificationIsVisible } = useSelector(
		(state) => state.ui
	);

	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch()
		dispatch(getCartData());
	}, [dispatch]);

	const cart = useSelector((state) => state.cart);
	useEffect(() => {
		if (isInitial) {
			isInitial = false;
			return;
		}

		if (cart.changed) {
			dispatch(sendCartData(cart));
		}
	}, [cart, dispatch]);

	return (
		<>
			{notification && notificationIsVisible && (
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
