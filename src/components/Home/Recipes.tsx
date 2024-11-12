import Recipe from "../../models/Recipe";
import Tabs from "../UI/Tabs";
import RecipeCard from "../UI/cards/RecipeCard";
import { useState } from "react";
import { Pizza, Sides, Chicken, Dessert, Drinks } from "../../utils/data";
import { motion, AnimatePresence } from "framer-motion";

import styles from "../../styles/Home/Recipes.module.css";

interface RecipesData {
  [key: string]: Recipe[];
}

const Recipes = () => {
  const tabs = ["Pizza", "Sides", "Chicken", "Dessert", "Drinks"];
  const recipesData: RecipesData = {
    Pizza,
    Sides,
    Chicken,
    Dessert,
    Drinks,
  };

  const [tabIndex, setTabIndex] = useState<number>(0);
  const currentRecipes = recipesData[tabs[tabIndex]];

  function tabClickHandler(index: number) {
    setTabIndex(index);
  }

  return (
    <section className="my-2 inter-font">
      <div className={`col align-center gap-5 ${styles.content}`}>
        <h2>Popular Recipes</h2>
        <Tabs
          tabs={tabs}
          activeIndex={tabIndex}
          tabClickHandler={tabClickHandler}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tabIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="my-2 row x-scroll-hidden">
          <RecipeCard recipes={currentRecipes} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Recipes;
