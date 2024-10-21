import Hero from "../components/Home/Hero";
import Suggestions from "../components/Home/Suggestions";
import CircularCards from "../components/UI/Cards/CircularCards";
import Recipes from "../components/Home/Recipes";
import Banner from "../components/Home/Banner";
import MasonaryGrid from "../components/UI/MasonaryGrid";
import Social from "../components/Home/Social";
import Footer from "../components/UI/Footer";

import { cuisines } from "../utils/data";

import bannerPizza from "../../src/assets/bannerPizza.png";
import burger from "../assets/offers/burger.png";
import icecream from "../assets/offers/icecream.png";
import fruits from "../assets/offers/fruits.png";

export default function Home() {
  return (
    <>
      <Hero />
      <Suggestions />
      <section className="p-2">
        <div className="container">
          <h2 className="text-primary">Our best delivered cuisines</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            doeiusmod tempor incididunt ut labore et dolore
          </p>
          <CircularCards data={cuisines} divider />
        </div>
      </section>
      <Recipes />
      <Banner banner={bannerPizza}>
        <h1 className="text-white">
          Fastest food <span className="text-primary">delivery </span> in the
          town
        </h1>
      </Banner>
      <section className="p-2 offer-section">
        <div className="container">
          <MasonaryGrid
            primaryImage={burger}
            overlayText={"Buy 2 get 1 free"}
            secondaryImage={icecream}
            ternaryImage={fruits}
            gridGap2x
            rounded
          />
        </div>
      </section>
      <Social />
      <Footer />
    </>
  );
}
