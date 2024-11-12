import ShopDetails from "../../models/shopDetails";

import { OutlineButton, PrimaryButton } from "../UI/Button";
import { Link } from "react-router-dom";

import { timeFormatter } from "../../utils/timeFormatter";

import styles from "../../styles/BrandDetailView/Hero.module.css";

interface Props {
  details: ShopDetails;
  brand: string;
  brandLogo: string;
}

const DetailViewHero = ({ details, brand, brandLogo }: Props) => {
  const date = new Date(Date.now());
  const currentDay = date.getDay();
  let linkData = (brand + " " + details.address).split(" ").join("+");
  return (
    <section className="p-2">
      <div className="detailpage-container">
        <div className="row gap-2 sm-col">
          <img src={brandLogo} alt={brand} className={styles.logo} />
          <div>
            <h2>{brand}</h2>
            <div className={`row gap-2 sm-col ${styles.data}`}>
              <div>
                <p>{details.tags.join(", ")}</p>
                <p>{details.address}</p>
                <p>
                  <span className={styles.shop_indicator}>
                    {details.shopTiming[currentDay]
                      ? date.getHours() > details.shopTiming[currentDay][0] &&
                        date.getHours() < details.shopTiming[currentDay][1]
                        ? "Open Now "
                        : "Closed "
                      : "Closed"}
                  </span>
                  {details.shopTiming[currentDay] &&
                    timeFormatter(
                      details.shopTiming[currentDay][0],
                      details.shopTiming[currentDay][1]
                    )}
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
            <div className={`row gap-3 sm-col ${styles.btns}`}>
              <Link to="../cart">
                <PrimaryButton>Order Now</PrimaryButton>
              </Link>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${linkData}`}
                target="_blank"
                rel="noopener noreferrer">
                <OutlineButton>Directions</OutlineButton>
              </a>

              <a
                href={`https://x.com/intent/tweet?text=Check+out+${linkData}!`}
                target="_blank"
                rel="noopener noreferrer">
                <OutlineButton>Share</OutlineButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailViewHero;
