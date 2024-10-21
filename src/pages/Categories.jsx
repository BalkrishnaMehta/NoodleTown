import Navbar from "../components/UI/Navbar";
import CircularCards from "../components/UI/Cards/CircularCards";
import FoodByWeather from "../components/Categories/FoodByWeather";
import FeaturedCategories from "../components/Categories/FeaturedCategories";

import { brands } from "../utils/data";

export default function Categories() {
  return (
    <>
      <Navbar />
      <section className="p-2">
        <div className="category-container">
          <h2 className="text-500">Top brands for you</h2>
          <CircularCards titleMargin data={brands} link={"/categories/"} />
        </div>
      </section>
      <FoodByWeather />
      <FeaturedCategories />
    </>
  );
}
