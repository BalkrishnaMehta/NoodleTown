import { useState } from "react";
import styles from "./DetailViewCategory.module.css";

export default function DetailViewCategory({ categories }) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <section className="p-2">
      <div className="detailpage-container">
        <h4>Order Online</h4>
        <div className="row2 gap-2 my-2">
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
            <h3>{Object.keys(categories)[tabIndex]}</h3>
            <ul>
              {categories[Object.keys(categories)[tabIndex]].map(
                (foodItem, index) => {
                  return (
                    <div className={styles.flex} key={`foodItem${index}`}>
                      <div>
                        <img
                          src={foodItem.image}
                          className={styles.item_image}
                          //   alt={foodItem.title}
                        />
                      </div>
                      <div className={styles.data_item_content}>
                        <p>{foodItem.title}</p>
                        <p className={styles.description}>
                          {foodItem.description}
                        </p>
                        <p>{`₹${foodItem.price}`}</p>
                        {true ? (
                          <button
                            className={`btn-primary ${styles.cart_btn}`}
                            onClick={() => {}}>
                            Add To Cart
                          </button>
                        ) : (
                          <div className={`${styles.flex} ${styles.center}`}>
                            <button
                              className="btn-secondary"
                              onClick={() => {}}>
                              -
                            </button>
                            <p>{"1"}</p>
                            <button className="btn-primary" onClick={() => {}}>
                              +
                            </button>
                          </div>
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
