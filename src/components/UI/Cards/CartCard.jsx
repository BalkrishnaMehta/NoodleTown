import { useDispatch } from "react-redux";
import styles from "./CartCard.module.css";
import { cartActions } from "../../../store";
import CartActions from "../../Cart/CartAction";
import { useState } from "react";

export default function CartCard({
  title,
  description,
  image,
  price,
  quantity,
}) {
  const [total, setTotal] = useState(price);
  const [couponMessage, setCouponMessage] = useState("");
  const dispatch = useDispatch();

  function handleAddToCart(foodItem) {
    dispatch(cartActions.addItem(foodItem));
  }

  function handleRemoveFromCart(title) {
    dispatch(cartActions.removeItem(title));
  }

  function handleApplyCouponCode(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const couponCode = formData.get("coupon");

    if (total === price) {
      if (couponCode === "Discount10") {
        let t = price - price * 0.1;
        setTotal(t);
        setCouponMessage("10% discount applied");
      } else {
        setCouponMessage("Invalid Coupon code");
      }
    } else {
      setCouponMessage("Coupon already applied");
    }
  }

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
      <form
        onSubmit={(event) => handleApplyCouponCode(event)}
        className={styles.coupon_form}>
        <div className={styles.coupon_grp}>
          <input type="text" placeholder="Apply coupon code" name="coupon" />
          <button className="btn-primary">Apply</button>
        </div>
        {couponMessage && (
          <p className={styles.secondary_text}>{couponMessage}</p>
        )}
      </form>
      <CartActions
        quantity={quantity}
        onDecrease={() => {
          handleRemoveFromCart(title);
        }}
        onIncrease={() => {
          handleAddToCart({ title, description, price, quantity, image });
        }}
      />
      <div className={styles.totals}>
        <div className={styles.amount_row}>
          <p className={styles.secondary_text}>Subtotal</p>
          <p className="text-primary">{`₹${total}`}</p>
        </div>
        <hr />
        <div className={styles.amount_row}>
          <p className={styles.secondary_text}>Total</p>
          <p className="text-primary">{`₹${total * quantity}`}</p>
        </div>
        <button className={`btn-primary ${styles.order_btn}`}>Order Now</button>
      </div>
    </div>
  );
}
