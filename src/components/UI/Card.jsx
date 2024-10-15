import styles from "./Card.module.css";

export default function ({
  primaryText,
  secondaryText,
  image,
  shadow,
  borderRadius,
}) {
  let radiusClass = "";

  if (borderRadius === "top") {
    radiusClass = "border_top";
  } else if (borderRadius === "all") {
    radiusClass = "border_all";
  }

  return (
    <div className={`${styles.card} ${shadow ? styles.shadow : ""}`}>
      <img src={image} alt="" className={styles[radiusClass]} />
      <h4>{primaryText}</h4>
      <p>{secondaryText}</p>
    </div>
  );
}
