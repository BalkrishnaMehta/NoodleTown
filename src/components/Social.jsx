import styles from "./Social.module.css";
import pizza1 from "../assets/social/pizza1.png";
import pizza2 from "../assets/social/pizza2.png";
import pizza3 from "../assets/social/pizza3.png";
import pizza4 from "../assets/social/pizza4.png";
import pizza5 from "../assets/social/pizza5.png";
import pizza6 from "../assets/social/pizza6.png";
import { Instagram } from "lucide-react";

export default function Social() {
  let pizzas = [pizza1, pizza2, pizza3, pizza4, pizza5, pizza6];
  return (
    <section className={`p-2 inter-font ${styles.social}`}>
      <div className={`container ${styles.gridContainer}`}>
        <div className="grid gap-1">
          {pizzas.map((pizza, index) => (
            <img key={index} src={pizza} alt={`pizza${index}`} />
          ))}
        </div>
        <div className={`text-white ${styles.overlay}`}>
          <p>Follow Us On Instagram To See Pictures Taken By Our Customers</p>
          <a href="https://www.instagram.com/" className={styles.insta_link}>
            <Instagram size={20} /> &nbsp;: @santorins
          </a>
        </div>
      </div>
    </section>
  );
}
