import { ShoppingBag } from "lucide-react";
import styles from "./recipeCard.module.css";

export default function recipeCard({ recipes }) {
  return recipes.map((recipe, index) => {
    return (
      <div className={styles.card} key={`recipe${index + 1}`}>
        <img
          className={styles.item_image}
          src={recipe.image}
          alt={recipe.title}
        />
        <div className={styles.title_and_time}>
          <h3>{recipe.title}</h3>
          <p className="light-text">{recipe.time}</p>
        </div>
        <p className={`${styles.desciption} light-text`}>
          {recipe.description}
        </p>
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
