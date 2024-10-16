import styles from "./CartCard.module.css";

export default function CartCard({ title, description, image, price }) {
  return (
    <div className={styles.card}>
      <img src={image} alt="" />
      <div className={styles.data}>
        <div>
          <h4>{title}</h4>
          <p className={styles.secondary_text}>{description}</p>
        </div>
        <p className="text-primary">{`₹${price}`}</p>
      </div>
      <form className={styles.coupon_form}>
        <input type="text" placeholder="Apply coupon code" />
        <button className="btn-primary">Apply</button>
      </form>
      <div className={styles.quantity}>
        <button className="btn-secondary">-</button>
        <p>01</p>
        <button className="btn-primary">+</button>
      </div>
      <div>
        <div className={styles.amount_row}>
          <p className={styles.secondary_text}>Subtotal</p>
          <p className="text-primary">₹120</p>
        </div>
        <hr />
        <div className={styles.amount_row}>
          <p className={styles.secondary_text}>Total</p>
          <p className="text-primary">₹140</p>
        </div>
        <button className={`btn-primary ${styles.order_btn}`}>Order Now</button>
      </div>
    </div>
  );
}
