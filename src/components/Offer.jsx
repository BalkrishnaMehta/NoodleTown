import styles from "./Offer.module.css";

export default function offer({
  primaryImage,
  offerText,
  secondaryImage,
  ternaryImage,
}) {
  return (
    <section className={`container p-2 ${styles.offers}`}>
      <div className={` ${styles.grid}`}>
        <div className={styles.main_offer}>
          <img src={primaryImage} alt="" />
          <div className={`text-white ${styles.overlay}`}>
            <h2>{offerText}</h2>
          </div>
        </div>
        <div>
          <img src={secondaryImage} alt="" />
        </div>
        <div>
          <img src={ternaryImage} alt="" />
        </div>
      </div>
    </section>
  );
}
