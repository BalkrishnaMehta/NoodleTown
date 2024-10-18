import styles from "./DetailViewHero.module.css";
import { timeFormatter } from "../../utils/timeFormatter";
import { Link } from "react-router-dom";

export default function DetailViewHero({ details, brand, brandLogo }) {
  const date = new Date(Date.now());
  let linkData = (brand + " " + details.address).split(" ").join("+");
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
              <Link to="../cart" className="btn-primary">
                Order Now
              </Link>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${linkData}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline">
                Directions
              </a>

              <a
                href={`https://x.com/intent/tweet?text=Check+out+${linkData}!`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline">
                Share
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
