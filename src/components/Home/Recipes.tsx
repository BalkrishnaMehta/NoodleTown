import { useEffect, useState } from "react";

import Product from "../../models/Product";

import Tabs from "../UI/Tabs";
import RecipeCard from "../UI/cards/RecipeCard";
import { motion, AnimatePresence } from "framer-motion";

import { usePopularRecipies } from "../../api/productsApi";
import errorToasting from "../../utils/errorToasting";

import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../styles/Home/Recipes.module.css";

const Recipes = () => {
  const {
    data: popularRecipies,
    isLoading,
    isError,
    error,
  } = usePopularRecipies();

  useEffect(() => {
    if (isError) {
      errorToasting(error);
    }
  }, [isError, error]);

  const [tabIndex, setTabIndex] = useState<number>(0);

  const tabs: string[] = popularRecipies ? Object.keys(popularRecipies) : [];
  const recipesData: Product[][] = popularRecipies
    ? Object.values(popularRecipies)
    : [];
  const currentRecipes = recipesData[tabIndex] || [];

  const tabClickHandler = (index: number) => {
    setTabIndex(index);
  };

  return (
    <section className="my-2 inter-font">
      <div className={`col align-center gap-5 ${styles.content}`}>
        <h2>Popular Recipes</h2>
        {isLoading ? (
          <Tabs.Skeleton />
        ) : (
          <Tabs
            tabs={tabs}
            activeIndex={tabIndex}
            tabClickHandler={tabClickHandler}
          />
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tabIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="my-2 row x-scroll-hidden">
          {isLoading ? (
            <RecipeCard.Skeleton count={6} />
          ) : (
            <RecipeCard recipes={currentRecipes} />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Recipes;
