import { useState } from "react";
import styles from "./Recipes.module.css";
import RecipeCard from "./UI/RecipeCard";
import Tabs from "./UI/Tabs";
import { Pizza, Sides, Chicken, Dessert, Drinks } from "../utils/data";

export default function Recipes() {
  const tabs = ["Pizza", "Sides", "Chicken", "Dessert", "Drinks"];
  const recipesData = {
    Pizza,
    Sides,
    Chicken,
    Dessert,
    Drinks,
  };
  const [tabIndex, setTabIndex] = useState(0);
  const currentRecipes = recipesData[tabs[tabIndex]];

  function tabClickHandler(index) {
    setTabIndex(index);
  }

  return (
    <section className="my-2">
      <div className={styles.content}>
        <h2>Popular Recipes</h2>
        <Tabs
          tabs={tabs}
          activeIndex={tabIndex}
          tabClickHandler={tabClickHandler}
        />
      </div>
      <div className={`${styles.carousal} my-2`}>
        <RecipeCard recipes={currentRecipes} />
      </div>
    </section>
  );
}
