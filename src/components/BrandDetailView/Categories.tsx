import { useState } from "react";

import styles from "../../styles/BrandDetailView/Categories.module.css";
import Product from "../../models/Product";
import { Menu } from "../../utils/Menu";
import { useNavigate, useParams } from "react-router-dom";
import Categories from "../../models/Categories";
import ProductCartActions from "./ProductCartActions";

const DetailViewCategory = () => {
  const { brand } = useParams();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  let { categories }: { categories: Categories } = Menu[parseInt(brand!)];
  let currentCategory = categories[Object.keys(categories)[tabIndex]] || [];

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
                return (
                  <div
                    className={`my-2 row gap-1 ${styles.item_Card}`}
                    key={`foodItem${index}`}
                    onClick={() =>
                      navigate(
                        `/brands/${brand}/categories/${tabIndex}/products/${index}`
                      )
                    }>
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
                      <div
                        className={styles.productActions}
                        onClick={(e) => e.stopPropagation()}>
                        <ProductCartActions product={foodItem} />
                      </div>
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
