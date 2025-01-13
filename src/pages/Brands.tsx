import Navbar from "../components/UI/Navbar";
import CircularCards from "../components/UI/Cards/CircularCards";
import SeasonalProducts from "../components/Brand/SeasonalProducts";
import FeaturedCategories from "../components/Brand/FeaturedCategories";
import { useRestaurant } from "../api/restaurantsApi";
import errorToasting from "../utils/errorToasting";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";

const Brands = () => {
  const { data: brands, isLoading, isError, error } = useRestaurant();

  useEffect(() => {
    if (isError) {
      errorToasting(error);
    }
  }, [isError, error]);

  return (
    <>
      <Navbar />
      <section>
        <h2 className="text-500 px-4">Top brands for you</h2>
        <div className="category-container p-2">
          {isLoading || isError ? (
            <div
              className={
                "my-2 row gap-3 justify-between align-center text-center"
              }>
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="col gap-3">
                    <Skeleton height={96} width={96} circle={true} />
                    <p>
                      <Skeleton width={120} height={24} />
                    </p>
                  </div>
                ))}
            </div>
          ) : brands && brands.length > 0 ? (
            <CircularCards titleMargin data={brands} type={"brand"} />
          ) : (
            <p>No Brand found.</p>
          )}
        </div>
      </section>
      <SeasonalProducts />
      <FeaturedCategories />
    </>
  );
};

export default Brands;
