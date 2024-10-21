import CartActions from "../Cart/CartAction";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store";

import styles from "./Categories.module.css";

export default function DetailViewCategory({ categories }) {
  const [tabIndex, setTabIndex] = useState(0);
  const cart = useSelector((state) => state.items);
  const dispatch = useDispatch();

  function handleAddToCart(foodItem) {
    dispatch(cartActions.addItem(foodItem));
  }

  function handleRemoveFromCart(title) {
    dispatch(cartActions.removeItem(title));
  }

  return (
    <section className="p-2">
      <div className="detailpage-container">
        <h4 className="text-500">Order Online</h4>
        <div className="row gap-2 sm-col my-2">
          <ul className={`my-2 ${styles.categories}`}>
            {Object.keys(categories).map((title, index) => {
              return (
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
              );
            })}
          </ul>
          <div className={styles.items}>
            <h2 className="text-500">{Object.keys(categories)[tabIndex]}</h2>
            <ul>
              {categories[Object.keys(categories)[tabIndex]].map(
                (foodItem, index) => {
                  const cartItem = cart.find(
                    (item) => item.title === foodItem.title
                  );
                  const quantity = cartItem ? cartItem.quantity : 0;

                  return (
                    <div className="my-2 row gap-1" key={`foodItem${index}`}>
                      <div>
                        <img
                          src={foodItem.image}
                          className={styles.item_image}
                          // alt={foodItem.title}
                        />
                      </div>
                      <div className={styles.data_item_content}>
                        <p>{foodItem.title}</p>
                        <p className={styles.description}>
                          {foodItem.description}
                        </p>
                        <p className={styles.price}>{`₹${foodItem.price}`}</p>
                        {quantity === 0 ? (
                          <button
                            className={`btn-primary ${styles.cart_btn}`}
                            onClick={() => {
                              handleAddToCart(foodItem);
                            }}>
                            Add To Cart
                          </button>
                        ) : (
                          <CartActions
                            quantity={quantity}
                            onDecrease={() => {
                              handleRemoveFromCart(foodItem.title);
                            }}
                            onIncrease={() => {
                              handleAddToCart(foodItem);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
