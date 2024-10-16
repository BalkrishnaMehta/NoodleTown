import styles from "./Card.module.css";

export default function ({
  primaryText,
  secondaryText,
  image,
  shadow,
  paraPadding,
  imgHeightClass,
  overlayText,
  flexBasis,
  borderRadius,
}) {
  let radiusClass = "";

  if (borderRadius === "top") {
    radiusClass = "border_top";
  } else if (borderRadius === "all") {
    radiusClass = "border_all";
  }

  return (
    <div
      className={`${styles.card} ${shadow ? styles.shadow : ""} ${
        flexBasis ? styles.flex_basis : ""
      }`}>
      <img
        src={image}
        alt={primaryText}
        className={`${styles[radiusClass]} ${styles[imgHeightClass]}`}
      />
      <div
        className={`${paraPadding ? styles.data : ""} ${
          overlayText ? styles.overlay : ""
        }`}>
        <h4>{primaryText}</h4>
        <p>{secondaryText}</p>
      </div>
    </div>
  );
}
