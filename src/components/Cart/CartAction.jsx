export default function CartActions({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="row gap-1 align-center">
      <button className="btn-secondary" onClick={onDecrease}>
        -
      </button>
      <p>{quantity}</p>
      <button className="btn-primary" onClick={onIncrease}>
        +
      </button>
    </div>
  );
}
