import { Fragment } from "react";
import styles from "./CircularCards.module.css";
import { Link } from "react-router-dom";

export default function CircularCards({ data, titleMargin, divider, link }) {
  return (
    <div className={`row my-2 ${styles.centerText}`}>
      {data.map((elem, index) => {
        const content = (
          <div className={styles.circular_card}>
            <img src={elem.image} alt={elem.title} />
            <p className={titleMargin ? styles.brand_title : undefined}>
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
