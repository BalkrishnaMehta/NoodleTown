import Suggestion from "../../models/Suggestion";
import Card from "../UI/Cards/Card";

const Suggestions = ({ suggestions }: { suggestions: Suggestion[] }) => {
  return (
    <section>
      <div className="p-2 container row gap-3 justify-between sm-col">
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
              animate
            />
          );
        })}
      </div>
    </section>
  );
};

export default Suggestions;
