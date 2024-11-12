import Recipe from "../../../models/Recipe";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import styles from "../../../styles/UI/cards/RecipeCard.module.css";

const RecipeCard = ({ recipes }: { recipes: Recipe[] }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return recipes.map((recipe, index) => {
    return (
      <motion.div
        key={`recipe${index + 1}`}
        className={`col align-center ${styles.card}`}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}>
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
        <h2 className={styles.price}>{recipe.price} NGN</h2>

        <div className={styles.triangle}>
          <div className={styles.circle}>
            <ShoppingBag height={15} width={15} />
          </div>
        </div>
      </motion.div>
    );
  });
};

export default RecipeCard;
