import { featured } from "../../utils/data";
import Card from "../UI/Cards/Card";

export default function FeaturedCategories() {
  return (
    <section>
      <div className="category-container p-2">
        <div className="my-2 row gap-3 justify-between x-scroll-hidden">
          {featured.map((category, index) => {
            return (
              <Card
                primaryText={category.title}
                primaryFontBold
                secondaryText={category.time}
                image={category.image}
                imgHeightClass={"img_height3"}
                overlayText
                flexBasis
                borderRadius={"all"}
                key={`category${index}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
