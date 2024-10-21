import playstore from "../../assets/footer/playstore.png";
import appstore from "../../assets/footer/appstore.png";
import mobile from "../../assets/footer/mobile.jpg";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className="p-2 my-2">
      <div className="container">
        <div className={styles.grid}>
          <h2 className={styles.title}>Download our app</h2>
          <a
            href="https://play.google.com/"
            className={styles.playstore}
            target="_blank">
            <img src={playstore} alt="playstore" />
          </a>
          <a
            target="_blank"
            href="https://www.apple.com/in/app-store/"
            className={styles.appstore}>
            <img src={appstore} alt="appstore" />
          </a>
          <img src={mobile} className={styles.mobile} alt="mobile" />
        </div>
      </div>
    </footer>
  );
}
