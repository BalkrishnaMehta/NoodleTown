import CircularCards from "../components/UI/Cards/CircularCards";
import { brands } from "../utils/data";
import Navbar from "../components/UI/Navbar";
import FeaturedCategories from "../components/Categories/FeaturedCategories";
import FoodByWeather from "../components/Categories/FoodByWeather";
export default function Categories() {
  return (
    <>
      <Navbar />
      <section className="p-2">
        <div className="category-container">
          <h2 className="category-heading">Top brands for you</h2>
          <CircularCards titleMargin data={brands} link={"/categories/"} />
        </div>
      </section>
      <FoodByWeather />
      <FeaturedCategories />
    </>
  );
}
