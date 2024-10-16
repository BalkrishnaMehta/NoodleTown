import styles from "./MasonaryGrid.module.css";

export default function MasonaryGrid({
  primaryImage,
  secondaryImage,
  ternaryImage,
  overlayText,
  rounded,
}) {
  return (
    <div className={styles.grid}>
      <div className={styles.main}>
        <img
          src={primaryImage}
          alt="primary image"
          className={rounded ? styles.rounded : ""}
        />
        {overlayText && (
          <div className={`text-white ${styles.overlay}`}>
            <h2>{overlayText}</h2>
          </div>
        )}
      </div>
      <div>
        <img
          src={secondaryImage}
          alt="secondary image"
          className={rounded ? styles.rounded : ""}
        />
      </div>
      <div>
        <img
          src={ternaryImage}
          alt="ternary image"
          className={rounded ? styles.rounded : ""}
        />
      </div>
    </div>
  );
}
