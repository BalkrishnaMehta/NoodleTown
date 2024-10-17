import styles from "./DetailViewHero.module.css";
import { timeFormatter } from "../utils/timeFormatter";

export default function DetailViewHero({ details, brand, brandLogo }) {
  const date = new Date(Date.now());
  return (
    <section className="p-2">
      <div className="detailpage-container">
        <div className="row2 gap-2">
          <img src={brandLogo} alt={brand} className={styles.logo} />
          <div>
            <h2>{brand}</h2>
            <div className={`row ${styles.data}`}>
              <div>
                <p>{details.tags.join(", ")}</p>
                <p>{details.address}</p>
                <p>
                  <span className={styles.shop_indicator}>
                    {date.getHours() > details.shopTiming[date.getDay()][0] &&
                    date.getHours() < details.shopTiming[date.getDay()][1]
                      ? "Open Now "
                      : "Closed "}
                  </span>
                  {timeFormatter(details.shopTiming[date.getDay()])}
                  {" (Today)"}
                </p>
              </div>
              <div>
                <p>
                  Average Cost:{" "}
                  <span className={styles.cost}>
                    {details.averageOrderValue} per {details.typicalGroupSize}{" "}
                    Person
                  </span>
                </p>
              </div>
            </div>
            <div className={`row ${styles.btns}`}>
              <button className="btn-primary">Order Now</button>
              <button className="btn-outline">Directions</button>
              <button className="btn-outline">Share</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
