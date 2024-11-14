import Navbar from "../UI/Navbar";
import Search from "../../forms/Search";

import styles from "../../styles/Home/Hero.module.css";

const Hero = () => {
  return (
    <header className={`col ${styles.hero}`}>
      <Navbar textWhite />
      <div
        className={`col align-center justify-evenly text-center ${styles.hero_content}`}>
        <div>
          <h1 className="text-700">Noodletown</h1>
          <p className="text-500">Discover best food around you</p>
        </div>
        <Search />
      </div>
    </header>
  );
};

export default Hero;
