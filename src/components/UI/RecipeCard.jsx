import { ShoppingBag } from "lucide-react";
import styles from "./recipeCard.module.css";
import recipe1 from "../../assets/recipes/recipe1.png";
import recipe2 from "../../assets/recipes/recipe2.png";
import recipe3 from "../../assets/recipes/recipe3.png";
import recipe4 from "../../assets/recipes/recipe4.png";
import recipe5 from "../../assets/recipes/recipe5.png";
import recipe6 from "../../assets/recipes/recipe6.png";

export default function recipeCard({ recipes }) {
  const recipeImages = [recipe1, recipe2, recipe3, recipe4, recipe5, recipe6];

  return recipes.map((recipe, index) => {
    console.log(`recipe${index + 1}`);
    return (
      <div className={styles.card} key={`recipe${index + 1}`}>
        <img
          className={styles.item_image}
          src={recipeImages[index]}
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
