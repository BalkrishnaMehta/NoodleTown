import Hero from "../components/Hero";
import Suggestions from "../components/Suggestions";
import CircularCards from "../components/UI/CircularCards";
import { cuisines } from "../utils/data";
import Recipes from "../components/Recipes";
import Banner from "../components/Banner";
import bannerPizza from "../../src/assets/bannerPizza.png";
import MasonaryGrid from "../components/UI/MasonaryGrid";
import burger from "../assets/offers/burger.png";
import icecream from "../assets/offers/icecream.png";
import fruits from "../assets/offers/fruits.png";
import Social from "../components/Social";
import Footer from "../components/UI/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Suggestions />
      <CircularCards
        title={"Our best delivered cuisines"}
        data={cuisines}
        containerClass="container"
        headingClass
        divider
        description={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\
          eiusmod tempor incididunt ut labore et dolore"
        }
      />
      <Recipes />
      <Banner banner={bannerPizza}>
        <h1 className="text-white">
          Fastest food <span className="text-primary">delivery </span> in the
          town
        </h1>
      </Banner>
      <section className="p-2">
        <div className="container">
          <MasonaryGrid
            primaryImage={burger}
            overlayText={"Buy 2 get 1 free"}
            secondaryImage={icecream}
            ternaryImage={fruits}
            rounded
          />
        </div>
      </section>
      <Social />
      <Footer />
    </>
  );
}
