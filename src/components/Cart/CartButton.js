import { useDispatch } from "react-redux";
import classes from "./CartButton.module.css";
import { cartActions } from "../../store/cart-reducer";

const CartButton = (props) => {
	const dispatch = useDispatch();
	const toggleCart = () => {
		dispatch(cartActions.cartDisplay());
	};
	return (
		<button onClick={toggleCart} className={classes.button}>
			<span>My Cart</span>
			<span className={classes.badge}>1</span>
		</button>
	);
};

export default CartButton;
