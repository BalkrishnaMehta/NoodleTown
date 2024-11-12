import CartItem from "../models/CartItem";

import Navbar from "../components/UI/Navbar";
import { PrimaryButton } from "../components/UI/Button";
import CartCard from "../components/UI/cards/CartCard";

import { useSelector } from "react-redux";

import { emptyCart } from "../assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import styles from "../styles/Cart/Cart.module.css";
import Checkout from "../components/Cart/Checkout";

export default function Cart() {
  const cart = useSelector((state: { items: CartItem[] }) => state.items);

  function calculateTotal() {
    return cart.reduce((acc, item) => {
      return (acc += item.price);
    }, 0);
  }
  return (
    <>
      <Navbar />
      <section className="p-2">
        <div className="category-container">
          <h2 className="text-500">Your Cart</h2>

          {cart.length !== 0 ? (
            <div className={styles.cart_layout}>
              <div className={`my-2 row wrap gap-2 ${styles.cart}`}>
                {cart.map((item) => (
                  <CartCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    quantity={item.quantity}
                  />
                ))}
              </div>
              <Checkout price={calculateTotal()} cart={cart} />
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring" }}
              className="my-2 col gap-2 justify-center align-center text-center empty-cart">
              <img src={emptyCart} alt="Empty cart" />
              <h2>Fill it with deliciousness</h2>
              <Link to={"/categories"}>
                <PrimaryButton>Add Products</PrimaryButton>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
