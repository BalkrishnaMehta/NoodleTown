import styles from "./FeaturedCategories.module.css";
import { featured } from "../utils/data";
import Card from "./UI/Card";

export default function FeaturedCategories() {
  return (
    <section className="p-2">
      <div className="category-container">
        <div className={`my-2 row ${styles.featured_row}`}>
          {featured.map((category, index) => {
            return (
              <Card
                primaryText={category.title}
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
