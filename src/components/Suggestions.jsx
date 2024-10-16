import Card from "./UI/Card";
import { suggestions } from "../utils/data";

export default function Suggestions() {
  return (
    <section className="p-2">
      <div className="container row">
        {suggestions.map((suggestion, index) => {
          return (
            <Card
              key={`suggestion${index}`}
              primaryText={suggestion.primaryText}
              secondaryText={suggestion.secondaryText}
              image={suggestion.image}
              shadow
              paraPadding
              imgHeightClass={"img_height1"}
              borderRadius={"top"}
            />
          );
        })}
      </div>
    </section>
  );
}
