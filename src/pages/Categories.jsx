import CircularCards from "../components/UI/CircularCards";
import { brands } from "../utils/data";
import Navbar from "../components/UI/Navbar";
import FeaturedCategories from "../components/FeaturedCategories";
import FoodByWeather from "../components/FoodByWeather";
export default function Categories() {
  return (
    <>
      <Navbar />
      <CircularCards
        title={"Top brands for you"}
        containerClass="category-container"
        paraClass
        data={brands}
      />
      <FoodByWeather />
      <FeaturedCategories />
    </>
  );
}
