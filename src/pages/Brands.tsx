import Navbar from "../components/UI/Navbar";
import CircularCards from "../components/UI/Cards/CircularCards";
import FoodByWeather from "../components/Brand/FoodByWeather";
import FeaturedCategories from "../components/Brand/FeaturedCategories";

import { brands } from "../utils/data";

const Brands = () => {
  return (
    <>
      <Navbar />
      <section className="p-2">
        <div className="category-container">
          <h2 className="text-500">Top brands for you</h2>
          <CircularCards
            titleMargin
            data={brands}
            link={"/brands/"}
            type={"brand"}
          />
        </div>
      </section>
      <FoodByWeather />
      <FeaturedCategories />
    </>
  );
};

export default Brands;
