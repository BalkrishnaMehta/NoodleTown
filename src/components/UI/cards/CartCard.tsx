import CartActions from "../../Cart/CartAction";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store";

import styles from "../../../styles/UI/cards/CartCard.module.css";

import CartItem from "../../../models/CartItem";
import Product from "../../../models/Product";
import { motion } from "framer-motion";

const CartCard = ({ title, description, image, price, quantity }: CartItem) => {
  const dispatch = useDispatch();

  function handleAddToCart(foodItem: Product) {
    dispatch(cartActions.addItem(foodItem));
  }

  function handleRemoveFromCart(title: string) {
    dispatch(cartActions.removeItem(title));
  }

  return (
    <motion.div layout className={styles.card}>
      <img src={image} alt={title} />
      <div className={styles.data}>
        <div className="row justify-between">
          <h4>{title}</h4>
          <p className="text-primary">{`₹${price}`}</p>
        </div>
        <p className={styles.secondary_text}>{description}</p>
      </div>
      <CartActions
        quantity={quantity}
        onDecrease={() => {
          handleRemoveFromCart(title);
        }}
        onIncrease={() => {
          handleAddToCart({ title, description, price, image });
        }}
      />
    </motion.div>
  );
};

export default CartCard;
