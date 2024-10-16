import { Fragment } from "react";
import styles from "./CircularCards.module.css";

export default function CircularCards({
  title,
  description,
  data,
  headingClass,
  paraClass,
  containerClass,
  divider,
}) {
  return (
    <section className="p-2">
      <div className={containerClass}>
        {title && (
          <h2 className={headingClass ? "text-primary" : "category-heading"}>
            {title}
          </h2>
        )}
        {description && <p>{description}</p>}
        <div className={`row my-2 ${styles.centerText}`}>
          {data.map((elem, index, data) => {
            return (
              <Fragment key={`data${index}`}>
                <div className={styles.circular_card}>
                  <img src={elem.image} alt={elem.title} />
                  <p className={paraClass ? styles.brand_title : undefined}>
                    {elem.title}
                  </p>
                </div>
                {divider && data.length !== index + 1 && (
                  <div className={styles.divider}></div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
