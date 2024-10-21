import { Fragment } from "react";
import { Link } from "react-router-dom";

import styles from "./CircularCards.module.css";

export default function CircularCards({ data, titleMargin, divider, link }) {
  return (
    <div className="my-2 row gap-3 justify-between sm-col align-center text-center">
      {data.map((elem, index) => {
        const content = (
          <div className={styles.circular_card}>
            <img src={elem.image} alt={elem.title} />
            <p className={`text-600 ${titleMargin ? styles.brand_title : ""}`}>
              {elem.title}
            </p>
          </div>
        );

        return (
          <Fragment key={`data${index}`}>
            {link ? <Link to={`${link}${index}`}>{content}</Link> : content}
            {divider && data.length !== index + 1 && (
              <div className={styles.divider}></div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
