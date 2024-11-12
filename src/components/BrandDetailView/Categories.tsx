import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store";

import CartActions from "../Cart/CartAction";
import { PrimaryButton } from "../UI/Button";

import styles from "./Categories.module.css";
import Product from "../../models/Product";
import CartItem from "../../models/CartItem";
import { AnimatePresence, motion } from "framer-motion";

interface Categories {
  [key: string]: Product[] | undefined;
}

const DetailViewCategory = ({ categories }: { categories: Categories }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const cart = useSelector((state: { items: CartItem[] }) => state.items);
  const dispatch = useDispatch();
  const currentCategory = categories[Object.keys(categories)[tabIndex]] || [];

  function handleAddToCart(foodItem: Product) {
    dispatch(cartActions.addItem(foodItem));
  }

  function handleRemoveFromCart(title: string) {
    dispatch(cartActions.removeItem(title));
  }

  return (
    <section className="p-2">
      <div className="detailpage-container">
        <h4 className="text-500">Order Online</h4>
        <div className="row gap-2 sm-col my-2">
          <ul className={`my-2 ${styles.categories}`}>
            {Object.keys(categories).map(
              (title, index) =>
                categories[title] && (
                  <li
                    onClick={() => {
                      setTabIndex(index);
                    }}
                    className={index === tabIndex ? styles.active : ""}
                    key={`category${index}`}>
                    {`${title} ${
                      index !== 0 ? `(${categories[title].length})` : ""
                    }`}
                  </li>
                )
            )}
          </ul>
          <div className={styles.items}>
            <h2 className="text-500">{Object.keys(categories)[tabIndex]}</h2>
            <ul>
              {currentCategory.map((foodItem: Product, index: number) => {
                const cartItem = cart.find(
                  (item) => item.title === foodItem.title
                );
                const quantity = cartItem ? cartItem.quantity : 0;

                return (
                  <div className="my-2 row gap-1" key={`foodItem${index}`}>
                    <div>
                      <img
                        src={foodItem.image}
                        // alt={foodItem.title}
                        className={styles.item_image}
                      />
                    </div>
                    <div className={styles.data_item_content}>
                      <p>{foodItem.title}</p>
                      <p className={styles.description}>
                        {foodItem.description}
                      </p>
                      <p className={styles.price}>{`₹${foodItem.price}`}</p>
                      <AnimatePresence mode="wait">
                        {quantity === 0 ? (
                          <motion.div
                            key="add-to-cart"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}>
                            <PrimaryButton
                              classes={styles.cart_btn}
                              onClick={() => handleAddToCart(foodItem)}>
                              Add To Cart
                            </PrimaryButton>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="cart-actions"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}>
                            <CartActions
                              quantity={quantity}
                              onDecrease={() =>
                                handleRemoveFromCart(foodItem.title)
                              }
                              onIncrease={() => handleAddToCart(foodItem)}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailViewCategory;
