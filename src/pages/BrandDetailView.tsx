import Navbar from "../components/UI/Navbar";
import ImageGridGallery from "../components/UI/ImageGridGallery";
import DetailViewHero from "../components/BrandDetails/Hero";
import ProductCategories from "../components/BrandDetails/ProductCategories";

import { useParams } from "react-router-dom";
import MenuImage from "../components/BrandDetails/Menu";
import { useEffect } from "react";
import errorToasting from "../utils/errorToasting";
import Skeleton from "react-loading-skeleton";
import { useRestaurantDetails, useRestaurantMenu } from "../api/restaurantsApi";

const BrandDetailView = () => {
  const { brand: restaurantId } = useParams();

  const {
    data: details,
    isLoading: isRestaurantsLoading,
    isError: isRestaurantsError,
    error: restaurantError,
  } = useRestaurantDetails(restaurantId || "");

  useEffect(() => {
    if (isRestaurantsError) {
      errorToasting(restaurantError);
    }
  }, [isRestaurantsError, restaurantError]);

  const {
    data: menu,
    isLoading,
    isError,
    error,
  } = useRestaurantMenu(restaurantId || "");

  useEffect(() => {
    if (isError) {
      errorToasting(error);
    }
  }, [isError, error]);

  return (
    <>
      <Navbar />
      {isRestaurantsLoading || isRestaurantsError ? (
        <>
          <ImageGridGallery.Skeleton />
          <DetailViewHero.Skeleton />
        </>
      ) : (
        <>
          <ImageGridGallery
            primaryImage={details!.coverImages[0]}
            secondaryImage={details!.coverImages[1]}
            ternaryImage={details!.coverImages[2]}
            gridItemHeight
            animateOnce
          />
          <DetailViewHero details={details!} />
        </>
      )}

      <section className="p-2">
        <div className="detailpage-container">
          <h4 className="text-500">Menu</h4>
          <div className="my-2 row gap-2 sm-col">
            {isRestaurantsLoading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index}>
                      <div className={"brand-image"}>
                        <Skeleton
                          className="brand-image"
                          height={300}
                          borderRadius={16}
                        />
                      </div>
                      <p>
                        <Skeleton width={120} height={16} />
                      </p>
                    </div>
                  ))
              : details?.menuImages.map((image: string, index: number) => (
                  <MenuImage
                    key={index}
                    imageUrl={image}
                    title={`Menu-Image ${index + 1}`}
                  />
                ))}
          </div>
        </div>
      </section>

      {isLoading ? (
        <ProductCategories.Skeleton />
      ) : (
        <ProductCategories menu={menu} />
      )}
    </>
  );
};

export default BrandDetailView;
