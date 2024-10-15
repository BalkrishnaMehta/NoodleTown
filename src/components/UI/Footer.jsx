import styles from "./Footer.module.css";
import playstore from "../../assets/footer/playstore.png";
import appstore from "../../assets/footer/appstore.png";
import mobile from "../../assets/footer/mobile.jpg";

export default function Footer() {
  return (
    <footer className="p-2 my-2">
      <div className="container">
        <div className={styles.grid}>
          <h2 className={styles.title}>Download our app</h2>
          <img src={playstore} className={styles.playstore} alt="playstore" />
          <img src={appstore} className={styles.appstore} alt="appstore" />
          <img src={mobile} className={styles.mobile} alt="mobile" />
        </div>
      </div>
    </footer>
  );
}
