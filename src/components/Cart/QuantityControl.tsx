import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { useUpdateCart } from "../../api/cartApi";
import { SecondaryButton, PrimaryButton } from "../UI/Button";
import { RootState } from "../../store";
import Product from "../../models/Product";

export default function QuantityControl({ product }: { product: Product }) {
  const { mutate } = useUpdateCart();
  const cart = useSelector((state: RootState) => state.cart.items);
  const reduxQuantity =
    cart?.find((item) => item.product.id === product.id)?.quantity ?? 0;

  const [visualQuantity, setVisualQuantity] = useState(reduxQuantity);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setVisualQuantity(reduxQuantity);
  }, [reduxQuantity]);

  const debouncedUpdateCart = (finalQuantity: number) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      const delta = finalQuantity - reduxQuantity;
      if (delta !== 0) {
        mutate({
          product,
          quantity: Math.abs(delta),
          method: delta > 0 ? "POST" : "DELETE",
        });
      }
    }, 700);
  };

  const handleIncrement = () => {
    const newQuantity = visualQuantity + 1;
    setVisualQuantity(newQuantity);
    debouncedUpdateCart(newQuantity);
  };

  const handleDecrement = () => {
    if (visualQuantity > 0) {
      const newQuantity = visualQuantity - 1;
      setVisualQuantity(newQuantity);
      debouncedUpdateCart(newQuantity);
    }
  };

  return (
    <div
      className="row gap-1 align-center"
      onClick={(e) => e.stopPropagation()}>
      <SecondaryButton
        onClick={handleDecrement}
        disabled={visualQuantity === 0}>
        -
      </SecondaryButton>
      <motion.p
        key={visualQuantity}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          opacity: { duration: 0.15 },
          y: { type: "spring", stiffness: 300, damping: 25 },
        }}>
        {visualQuantity}
      </motion.p>
      <PrimaryButton onClick={handleIncrement} disabled={visualQuantity === 0}>
        +
      </PrimaryButton>
    </div>
  );
}

QuantityControl.Skeleton = () => (
  <div className="row gap-1 align-center">
    <Skeleton width={30} height={30} borderRadius={3.2} />
    <Skeleton width={30} height={30} />
    <Skeleton width={30} height={30} borderRadius={3.2} />
  </div>
);
