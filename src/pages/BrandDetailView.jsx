import Navbar from "../components/UI/Navbar";
import MasonaryGrid from "../components/UI/MasonaryGrid";
import DetailViewHero from "../components/BrandDetailView/Hero";
import DetailMenuImage from "../components/BrandDetailView/Menu";
import DetailViewCategory from "../components/BrandDetailView/Categories";

import { useParams } from "react-router-dom";

import { brands, brandDetails } from "../utils/data";
import { Menu } from "../utils/Menu";

export default function BrandDetailView() {
  const params = useParams();
  const { title, image } = brands[params.index];
  const details = brandDetails.find((brand) => brand.title === title);
  const menu = Menu.find((menu) => menu.title === title);
  return (
    <>
      <Navbar />
      <MasonaryGrid
        primaryImage={"../assets/brands/brand1/primary.jpg"}
        secondaryImage={"../assets/brands/brand1/secondary.jpg"}
        ternaryImage={"../assets/brands/brand1/ternary.jpg"}
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
