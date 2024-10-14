import styles from "./Navbar.module.css";
import { ShoppingCart } from "lucide-react";

export default function Nav({ textWhite }) {
  let cartItemCount = 5;
  return (
    <nav className={styles.nav}>
      <h4 className="text-primary">Noodletown</h4>
      <ul>
        <li>
          <a href="#" className={textWhite ? "text-white" : undefined}>
            Menu
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`${styles.cart} ${textWhite ? "text-white" : ""}`}>
            <span>{cartItemCount}</span>
            <ShoppingCart />
          </a>
        </li>
      </ul>
    </nav>
  );
}
