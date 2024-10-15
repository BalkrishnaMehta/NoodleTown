import styles from "./CircularCards.module.css";

export default function CircularCards({ title, description, data }) {
  return (
    <section className="p-2">
      <div className="container">
        {title && <h2 className="text-primary">{title}</h2>}
        {description && <p>{description}</p>}
        <div className={`row my-2 ${styles.centerText}`}>
          {data.map((elem, index, data) => {
            return (
              <>
                <div className={styles.circular_card}>
                  <img src={elem.image} alt={elem.title} />
                  <p>{elem.title}</p>
                </div>
                {data.length !== index + 1 && (
                  <div className={styles.divider}></div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}
