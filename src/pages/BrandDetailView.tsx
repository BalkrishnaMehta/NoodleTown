import Navbar from "../components/UI/Navbar";
import MasonaryGrid from "../components/UI/ImageGridGallery";
import DetailViewHero from "../components/BrandDetailView/Hero";
import DetailMenuImage from "../components/BrandDetailView/Menu";
import DetailViewCategory from "../components/BrandDetailView/Categories";

import { useParams } from "react-router-dom";

import { brands, brandDetails } from "../utils/data";
import { Menu } from "../utils/Menu";

const BrandDetailView = () => {
  const params = useParams<{ index: string }>();
  const brand = brands[+params.index!];

  const { title, image } = brand;

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
        animateOnce
      />
      {details && (
        <DetailViewHero details={details} brand={title} brandLogo={image} />
      )}
      {details && (
        <DetailMenuImage
          diningMenuImage={details.diningMenuImage}
          takeawayMenuImage={details.takeawayMenuImage}
        />
      )}
      {menu && menu.categories && Object.keys(menu.categories).length > 0 && (
        <DetailViewCategory categories={menu.categories} />
      )}
    </>
  );
};

export default BrandDetailView;
