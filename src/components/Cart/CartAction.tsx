import { motion } from "framer-motion";
import { PrimaryButton, SecondaryButton } from "../UI/Button";

interface CartActionProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export default function CartActions({
  quantity,
  onDecrease,
  onIncrease,
}: CartActionProps) {
  return (
    <div className="row gap-1 align-center">
      <SecondaryButton onClick={onDecrease}>-</SecondaryButton>
      <motion.p
        key={quantity}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: 1.2 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { type: "spring", stiffness: 300, damping: 20 },
        }}>
        {quantity}
      </motion.p>
      <PrimaryButton onClick={onIncrease}>+</PrimaryButton>
    </div>
  );
}
