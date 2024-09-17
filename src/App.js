import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
	const isCartDisplay = useSelector((state) => state.cart.isCartDisplay);
	return (
		<Layout>
			{isCartDisplay && <Cart />}
			<Products />
		</Layout>
	);
}

export default App;
