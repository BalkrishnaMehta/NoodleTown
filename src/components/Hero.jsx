import styles from "./Hero.module.css";
import Navbar from "./UI/Navbar";
import Search from "./Search";

export default function Hero() {
  return (
    <header className={styles.hero}>
      <Navbar textWhite />
      <div className={styles.hero_content}>
        <div>
          <h1>Noodletown</h1>
          <p>Discover best food around you</p>
        </div>
        <Search />
      </div>
    </header>
  );
}
