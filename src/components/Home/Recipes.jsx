import Tabs from "../UI/Tabs";
import RecipeCard from "../UI/Cards/RecipeCard";

import { useState } from "react";

import { Pizza, Sides, Chicken, Dessert, Drinks } from "../../utils/data";

import styles from "./Recipes.module.css";

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
    <section className="my-2 inter-font">
      <div className={`col align-center gap-5 ${styles.content}`}>
        <h2>Popular Recipes</h2>
        <Tabs
          tabs={tabs}
          activeIndex={tabIndex}
          tabClickHandler={tabClickHandler}
        />
      </div>
      <div className={`${styles.carousal} my-2 row`}>
        <RecipeCard recipes={currentRecipes} />
      </div>
    </section>
  );
}
