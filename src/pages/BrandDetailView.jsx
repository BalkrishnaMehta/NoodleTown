import Navbar from "../components/UI/Navbar";
import MasonaryGrid from "../components/UI/MasonaryGrid";
import { brandDetails } from "../utils/data";
import { Menu } from "../utils/Menu";
import DetailViewHero from "../components/DetailViewHero";
import DetailMenuImage from "../components/DetailViewMenuImage";
import DetailViewCategory from "../components/DetailViewCategory";

export default function BrandDetailView({ title, image }) {
  const details = brandDetails.find((brand) => brand.title === title);
  const menu = Menu.find((menu) => menu.title === title);
  return (
    <>
      <Navbar />
      <MasonaryGrid
        primaryImage={"assets/brands/brand1/primary.jpg"}
        secondaryImage={"assets/brands/brand1/secondary.jpg"}
        ternaryImage={"assets/brands/brand1/ternary.jpg"}
        gridItemHeight
      />
      <DetailViewHero details={details} brand={title} brandLogo={image} />
      <DetailMenuImage
        diningMenuImage={details.diningMenuImage}
        takeawayMenuImage={details.takeawayMenuImage}
      />
      <DetailViewCategory categories={menu.categories} />
    </>
  );
}
