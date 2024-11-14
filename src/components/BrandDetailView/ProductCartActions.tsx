import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import CartActions from "../Cart/CartAction";
import { PrimaryButton } from "../UI/Button";
import { AnimatePresence, motion } from "framer-motion";
import Product from "../../models/Product";
import { cartActions } from "../../store/cart/cartSlice";

interface ProductCartActionsProps {
  product: Product;
}

const ProductCartActions = ({ product }: ProductCartActionsProps) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  const cartItem = cart.find((item) => item.title === product.title);
  const quantity = cartItem ? cartItem.quantity : 0;

  function handleAddToCart() {
    dispatch(cartActions.addItem(product));
  }

  function handleRemoveFromCart() {
    dispatch(cartActions.removeItem(product.title));
  }

  return (
    <AnimatePresence mode="wait">
      {quantity === 0 ? (
        <motion.div
          key="add-to-cart"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}>
          <PrimaryButton classes={"add-to-cart-btn"} onClick={handleAddToCart}>
            Add To Cart
          </PrimaryButton>
        </motion.div>
      ) : (
        <motion.div
          key="cart-actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}>
          <CartActions
            quantity={quantity}
            onDecrease={handleRemoveFromCart}
            onIncrease={handleAddToCart}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductCartActions;
