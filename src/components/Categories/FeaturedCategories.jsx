import Card from "../UI/Cards/Card";

import { featured } from "../../utils/data";

export default function FeaturedCategories() {
  return (
    <section className="p-2">
      <div className="category-container">
        <div className="my-2 row gap-3 justify-between md-col sm-col">
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
