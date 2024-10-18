import styles from "./Banner.module.css";

export default function Banner({ children, banner }) {
  return (
    <section className={styles.banner}>
      <img src={banner} alt="" />
      <div className={styles.container}>{children}</div>
    </section>
  );
}
