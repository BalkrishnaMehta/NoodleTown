import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import Product from "../../models/Product";
import { useUpdateCart } from "../../api/cartApi";
import { RootState } from "../../store";
import QuantityControl from "../Cart/QuantityControl";
import { PrimaryButton } from "../UI/Button";

export default function ProductCartActions({ product }: { product: Product }) {
  const cart = useSelector((state: RootState) => state.cart.items);
  const { mutate } = useUpdateCart();

  const quantity =
    cart?.find((item) => item.product.id === product.id)?.quantity ?? 0;

  return (
    <AnimatePresence mode="wait">
      {quantity === 0 ? (
        <motion.div
          key="add-to-cart"
          initial={{ visibility: "hidden", y: 10 }}
          animate={{ visibility: "visible", y: 0 }}
          exit={{ visibility: "hidden", y: -10 }}
          transition={{ duration: 0.2 }}>
          <PrimaryButton
            classes="add-to-cart-btn"
            onClick={() => mutate({ product, quantity: 1, method: "POST" })}>
            Add To Cart
          </PrimaryButton>
        </motion.div>
      ) : (
        <motion.div
          key="cart-actions"
          initial={{ visibility: "hidden", y: 10 }}
          animate={{ visibility: "visible", y: 0 }}
          exit={{ visibility: "hidden", y: -10 }}
          transition={{ duration: 0.2 }}>
          <QuantityControl product={product} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
