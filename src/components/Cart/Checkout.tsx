import { FormEvent, useState } from "react";
import CartItem from "../../models/CartItem";
import { cartActions } from "../../store";
import { useDispatch } from "react-redux";

import styles from "../../styles/Cart/Checkout.module.css";

const Checkout = ({ price, cart }: { price: number; cart: CartItem[] }) => {
  const [total, setTotal] = useState(price);
  const [couponMessage, setCouponMessage] = useState("");
  const dispatch = useDispatch();

  function handleApplyCouponCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
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

  function handleOrderNow() {
    cart.forEach((item) => {
      dispatch(cartActions.removeItemFromCart(item.title));
    });
    let order = { cart, subTotal: total, total: price };
    console.log(order);
    alert("Order Placed successfully");
  }

  return (
    <div className="my-2">
      <form
        onSubmit={(event) => handleApplyCouponCode(event)}
        className={styles.coupon_form}>
        <div className={`row ${styles.coupon_grp}`}>
          <input type="text" placeholder="Apply coupon code" name="coupon" />
          <button className="btn-primary">Apply</button>
        </div>
        <p className={styles.secondary_text}>
          {couponMessage ? couponMessage : "\u00A0"}
        </p>
      </form>
      <div className={styles.totals}>
        <div className="row justify-between py-half">
          <p className={styles.secondary_text}>Subtotal</p>
          <p className="text-primary">{`₹${total}`}</p>
        </div>
        <hr />
        <div className="row justify-between py-half">
          <p className={styles.secondary_text}>Total</p>
          <p className="text-primary">{`₹${price}`}</p>
        </div>
        <button
          className={`btn-primary ${styles.order_btn}`}
          onClick={handleOrderNow}>
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
