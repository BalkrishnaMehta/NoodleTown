import Card from "../UI/Cards/Card";

import { foods } from "../../utils/data";

export default function FoodByWeather() {
  return (
    <section className="p-2">
      <div className="category-container">
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
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
