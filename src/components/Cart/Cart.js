import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
	const cartList = useSelector((state) => state.cart.cartList);
	// console.log(cartList);

	return (
		<Card className={classes.cart}>
			<h2>Your Shopping Cart</h2>
			<ul>
				{cartList.map((item) => {
					return (
						<CartItem
							key={item.id}
							id={item.id}
							title={item.title}
							quantity={item.quantity}
							price={+item.price}
							totalPrice={+item.totalPrice}
						/>
					);
				})}
			</ul>
		</Card>
	);
};

export default Cart;
