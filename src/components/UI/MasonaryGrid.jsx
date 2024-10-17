import styles from "./MasonaryGrid.module.css";

export default function MasonaryGrid({
  primaryImage,
  secondaryImage,
  ternaryImage,
  overlayText,
  gridGap2x,
  rounded,
  gridItemHeight,
}) {
  return (
    <div
      className={`${styles.grid} ${gridGap2x ? styles.gap2x : ""} ${
        gridItemHeight ? styles.grid_item_height : ""
      }`}>
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
