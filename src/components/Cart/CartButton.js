import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { cartActions } from "../../store/cart-reducer";

const CartButton = (props) => {
	const dispatch = useDispatch();
	const toggleCart = () => {
		dispatch(cartActions.cartDisplay());
	};

	const cartList = useSelector((state) => state.cart.cartList);
	const totalItems = cartList.reduce((acc, curr) => {
		return acc + curr.quantity;
	}, 0);
	return (
		<button onClick={toggleCart} className={classes.button}>
			<span>My Cart</span>
			<span className={classes.badge}>{totalItems}</span>
		</button>
	);
};

export default CartButton;
