import Card from "./UI/Card";

export default function Suggestions() {
  const suggestions = [
    {
      primaryText: "Dining out",
      secondaryText: "Explore curated lists of top restraunts",
      image: "assets/suggestions/suggestion1.png",
    },
    {
      primaryText: "Dining out",
      secondaryText: "Explore curated lists of top restraunts",
      image: "assets/suggestions/suggestion2.png",
    },
    {
      primaryText: "Dining out",
      secondaryText: "Explore curated lists of top restraunts",
      image: "assets/suggestions/suggestion3.png",
    },
  ];
  return (
    <section className="my-2">
      <div className="container p-2 row">
        {suggestions.map((suggestion, index) => {
          return (
            <Card
              key={`suggestion${index}`}
              primaryText={suggestion.primaryText}
              secondaryText={suggestion.secondaryText}
              image={suggestion.image}
              shadow
              borderRadius={"top"}
            />
          );
        })}
      </div>
    </section>
  );
}
