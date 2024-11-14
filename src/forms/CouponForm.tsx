import { FormEvent, useState } from "react";
import styles from "../styles/forms/CouponForm.module.css";

interface CouponFormProps {
  discount: number;
  setDiscount: (discount: number) => void;
}

const CouponForm = ({ discount, setDiscount }: CouponFormProps) => {
  const [couponMessage, setCouponMessage] = useState("");
  const coupons = ["Discount10", "Festive20"];

  function handleApplyCouponCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const couponCode = formData.get("coupon");

    if (typeof couponCode === "string") {
      const discountValue = parseInt(couponCode?.slice(-2));

      if (discountValue > discount || discount == 0) {
        if (coupons.includes(couponCode)) {
          setDiscount(discountValue);
          setCouponMessage(`${discountValue}% discount applied`);
        } else {
          setCouponMessage("Invalid Coupon code");
        }
      } else {
        setCouponMessage("Better discount already applied");
      }
    }
  }

  return (
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
  );
};

export default CouponForm;
