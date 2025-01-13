import { FormEvent, useEffect, useState } from "react";
import CouponForm from "../forms/CouponForm";
import CartItem from "../../models/CartItem";
import Addresses from "./Addresses";
import { PrimaryButton } from "../UI/Button";
import { useAddresses } from "../../api/addressApi";
import Address from "../../models/Address";
import { useValidateCoupon } from "../../api/couponApi";
import Order from "../../models/Order";
import { useMakeOrder } from "../../api/orderApi";
import errorToasting from "../../utils/errorToasting";
import Skeleton from "react-loading-skeleton";
import Spinner from "../UI/Spinner";

const Checkout = ({ cart }: { cart: CartItem[] }) => {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(-1);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string>("");

  const {
    data: addresses,
    isLoading: addressesLoading,
    isError,
    error,
  } = useAddresses();

  useEffect(() => {
    if (isError) {
      errorToasting(error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (!addressesLoading && addresses && addresses.length > 0) {
      const defaultIndex = addresses.findIndex(
        (address: Address) => address.isDefault === true
      );
      if (defaultIndex !== -1) {
        setSelectedAddressIndex(defaultIndex);
      }
    }
  }, [addresses, addressesLoading]);

  const { mutate, isPending: isApplyingCoupon } = useValidateCoupon();

  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc: number, item: CartItem) => acc + item.product.price * item.quantity,
      0
    );
  }

  useEffect(() => {
    setCouponMessage("");
    setDiscountAmount(0);
  }, [cart]);

  function handleApplyCouponCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const couponCode = formData.get("coupon") as string;

    if (!couponCode) {
      setCouponMessage("Please enter a valid coupon code.");
      return;
    }

    mutate(
      { couponCode, orderTotal: total },
      {
        onSuccess: (data) => {
          const { discountAmount, message } = data;
          setDiscountAmount(discountAmount);
          setCouponMessage(message || "Coupon applied successfully.");
        },
        onError: (error) => {
          setCouponMessage(error.message);
        },
      }
    );
  }

  const { mutate: makeOrder, isPending: isMakingOrder } = useMakeOrder();

  function handleOrderNow() {
    const address: Address = addresses[selectedAddressIndex];
    const order: Order = {
      total,
      discount: discountAmount,
      netTotal: total - discountAmount,
      address: `${address.line1} ${address.line2}. ${address.city}, ${address.state} - ${address.pincode}`,
      products: cart,
    };

    makeOrder({
      addressTitle: address.title,
      order,
    });
  }

  return (
    <>
      <div className="col gap-1">
        {addressesLoading ? (
          <Addresses.Skeleton />
        ) : !isError ? (
          <Addresses
            selectedAddressIndex={selectedAddressIndex}
            setSelectedAddressIndex={setSelectedAddressIndex}
            addresses={addresses}
          />
        ) : (
          <></>
        )}
        <hr />
        <div>
          <CouponForm
            handleApplyCouponCode={handleApplyCouponCode}
            couponMessage={couponMessage}
            isApplyingCoupon={isApplyingCoupon}
          />
          <div>
            <hr />
            <div className="row justify-between py-half">
              <p>Total</p>
              {cart && cart.length !== 0 ? (
                <p className="text-primary">{`₹${total}`}</p>
              ) : (
                <Skeleton height={20} width={40} />
              )}
            </div>
            <div className="row justify-between py-half">
              <p>Discount</p>
              {cart && cart.length !== 0 ? (
                <p className="text-secondary">-&nbsp;{`₹${discountAmount}`}</p>
              ) : (
                <Skeleton height={20} width={40} />
              )}
            </div>
            <div className="row justify-between py-half">
              <p>Net Total</p>
              {cart && cart.length !== 0 ? (
                <p className="text-primary">{`₹${total - discountAmount}`}</p>
              ) : (
                <Skeleton height={20} width={40} />
              )}
            </div>
            <PrimaryButton
              classes="w-100 my-2"
              onClick={handleOrderNow}
              disabled={
                cart === undefined ||
                selectedAddressIndex === -1 ||
                isMakingOrder
              }>
              {isMakingOrder ? (
                <Spinner size="15px" color="#fff" borderThickness="2px" />
              ) : (
                "Order Now"
              )}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
