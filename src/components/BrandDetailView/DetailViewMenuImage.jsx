export default function DetailMenuImage({
  diningMenuImage,
  takeawayMenuImage,
}) {
  return (
    <section className="p-2">
      <div className="detailpage-container">
        <h4 className="text-500">Menu</h4>
        <div className="row2 gap-2 my-2">
          <div>
            <img src={diningMenuImage} className="brand-image" />
            <p>Dinning menu</p>
          </div>
          <div>
            <img src={takeawayMenuImage} className="brand-image" />
            <p>Takeaway menu</p>
          </div>
        </div>
      </div>
    </section>
  );
}
