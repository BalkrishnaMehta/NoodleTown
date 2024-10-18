import styles from "../BrandDetailView/DetailViewCategory.module.css";

export default function CartActions({ quantity, onDecrease, onIncrease }) {
  return (
    <div className={`${styles.center} ${styles.flex}`}>
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
