import Card from "../UI/Cards/Card";
import { suggestions } from "../../utils/data";

export default function Suggestions() {
  return (
    <section>
      <div className="container row p-2">
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
