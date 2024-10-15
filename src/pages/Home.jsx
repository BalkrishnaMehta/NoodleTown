import Banner from "../components/Banner";
import Hero from "../components/Hero";
import Recipes from "../components/Recipes";
import bannerPizza from "../../src/assets/bannerPizza.png";
import Offer from "../components/Offer";
import burger from "../assets/offers/burger.png";
import icecream from "../assets/offers/icecream.png";
import fruits from "../assets/offers/fruits.png";
import Social from "../components/Social";
import Footer from "../components/UI/Footer";
import Suggestions from "../components/Suggestions";
import CircularCards from "../components/UI/CircularCards";

export default function Home() {
  const cuisines = [
    {
      title: "Chicken Noodles",
      image: "assets/cuisines/cuisine1.png",
    },
    {
      title: "French Fries",
      image: "assets/cuisines/cuisine2.png",
    },
    {
      title: "Avacado Mint Noodles",
      image: "assets/cuisines/cuisine3.png",
    },
  ];
  return (
    <>
      <Hero />
      <Suggestions />
      <CircularCards
        title={"Our best delivered cuisines"}
        data={cuisines}
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
      <Offer
        primaryImage={burger}
        offerText={"Buy 2 get 1 free"}
        secondaryImage={icecream}
        ternaryImage={fruits}
      />
      <Social />
      <Footer />
    </>
  );
}
