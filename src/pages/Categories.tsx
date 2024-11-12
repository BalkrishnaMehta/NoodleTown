import Navbar from "../components/UI/Navbar";
import CircularCards from "../components/UI/cards/CircularCards";
import FoodByWeather from "../components/Categories/FoodByWeather";
import FeaturedCategories from "../components/Categories/FeaturedCategories";

import { brands } from "../utils/data";

const Categories = () => {
  return (
    <>
      <Navbar />
      <section className="p-2">
        <div className="category-container">
          <h2 className="text-500">Top brands for you</h2>
          <CircularCards
            titleMargin
            data={brands}
            link={"/categories/"}
            type={"brand"}
          />
        </div>
      </section>
      <FoodByWeather />
      <FeaturedCategories />
    </>
  );
};

export default Categories;
