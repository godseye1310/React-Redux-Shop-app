import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions } from "../../store/cart-reducer";

const CartItem = ({ id, title, quantity, price, totalPrice }) => {
	// const { title, quantity, total, price } = props;

	const dispatch = useDispatch();
	const item = {
		id,
		title,
		quantity,
		price,
		totalPrice,
	};

	const add1Item = () => {
		dispatch(cartActions.addToCart(item));
	};

	const removeItem = () => {
		dispatch(cartActions.removeFormCart(id));
	};

	return (
		<li className={classes.item}>
			<header>
				<h3>{title}</h3>
				<div className={classes.price}>
					${totalPrice.toFixed(2)}{" "}
					<span className={classes.itemprice}>
						(${price.toFixed(2)}/item)
					</span>
				</div>
			</header>
			<div className={classes.details}>
				<div className={classes.quantity}>
					x <span>{quantity}</span>
				</div>
				<div className={classes.actions}>
					<button onClick={removeItem}>-</button>
					<button onClick={add1Item}>+</button>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
