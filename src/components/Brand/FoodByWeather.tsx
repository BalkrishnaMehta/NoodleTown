import { foods } from "../../utils/data";
import Card from "../UI/Cards/Card";

export default function FoodByWeather() {
  return (
    <section>
      <div className="category-container p-2">
        <h2 className="category-heading">Food according to weather</h2>
        <div className="my-2 grid gap-2">
          {foods.map((food, index) => {
            return (
              <Card
                primaryText={food.title}
                primaryFontBold
                secondaryText={food.time}
                image={food.image}
                imgHeightClass={"img_height2"}
                borderRadius={"all"}
                key={`food${index}`}
                animate
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
