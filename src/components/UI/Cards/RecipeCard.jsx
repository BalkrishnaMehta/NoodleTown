import { ShoppingBag } from "lucide-react";

import styles from "./recipeCard.module.css";

export default function recipeCard({ recipes }) {
  return recipes.map((recipe, index) => {
    return (
      <div
        className={`col align-center ${styles.card}`}
        key={`recipe${index + 1}`}>
        <img
          className={styles.item_image}
          src={recipe.image}
          alt={recipe.title}
        />
        <div
          className={`row justify-between align-center ${styles.title_and_time}`}>
          <h3>{recipe.title}</h3>
          <p className="text-500">{recipe.time}</p>
        </div>
        <p className={`${styles.description} text-500`}>{recipe.description}</p>
        <h2 className={styles.price}>{recipe.price}NGN</h2>

        <div className={styles.triangle}>
          <div className={styles.circle}>
            <ShoppingBag height={15} width={15} />
          </div>
        </div>
      </div>
    );
  });
}
