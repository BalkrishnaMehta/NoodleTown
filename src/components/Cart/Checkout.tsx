import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import styles from "../../styles/Cart/Checkout.module.css";
import CouponForm from "../../forms/CouponForm";
import { cartActions } from "../../store/cart/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const [discount, setDiscount] = useState(0);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountedPrice = total - total * (discount / 100);

  function handleOrderNow() {
    cart.forEach((item) => {
      dispatch(cartActions.removeItemFromCart(item.title));
    });

    let order = {
      cart,
      subTotal: discountedPrice,
      total: total,
    };

    console.log(order);
    alert("Order Placed successfully");
  }

  return (
    <div className="my-2">
      <CouponForm discount={discount} setDiscount={setDiscount} />
      <div className={styles.totals}>
        <div className="row justify-between py-half">
          <p className={styles.secondary_text}>Subtotal</p>
          <p className="text-primary">{`₹${discountedPrice}`}</p>
        </div>
        <hr />
        <div className="row justify-between py-half">
          <p className={styles.secondary_text}>Total</p>
          <p className="text-primary">{`₹${total}`}</p>
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
