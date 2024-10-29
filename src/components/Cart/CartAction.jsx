import { PrimaryButton, SecondaryButton } from "../UI/Button";

export default function CartActions({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="row gap-1 align-center">
      <SecondaryButton onClick={onDecrease}>-</SecondaryButton>
      <p>{quantity}</p>
      <PrimaryButton onClick={onIncrease}>+</PrimaryButton>
    </div>
  );
}
