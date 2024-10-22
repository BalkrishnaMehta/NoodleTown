import CartActions from "../../Cart/CartAction";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store";

import styles from "./CartCard.module.css";

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

  function handleOrderNow(itemData) {
    dispatch(cartActions.removeItemFromCart(itemData.title));
    alert(`${itemData.title}, Order Placed successfully`);
    console.log(itemData);
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
        <p className={styles.secondary_text}>
          {couponMessage ? couponMessage : "\u00A0"}
        </p>
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
        <div className="row justify-between py-half">
          <p className={styles.secondary_text}>Subtotal</p>
          <p className="text-primary">{`₹${total}`}</p>
        </div>
        <hr />
        <div className="row justify-between py-half">
          <p className={styles.secondary_text}>Total</p>
          <p className="text-primary">{`₹${total * quantity}`}</p>
        </div>
        <button
          className={`btn-primary ${styles.order_btn}`}
          onClick={() => {
            handleOrderNow({
              title,
              description,
              price: total,
              quantity,
              image,
            });
          }}>
          Order Now
        </button>
      </div>
    </div>
  );
}
