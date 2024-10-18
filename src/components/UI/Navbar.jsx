import { useSelector } from "react-redux";
import styles from "./Navbar.module.css";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar({ textWhite }) {
  const cartItemCount = useSelector((state) => state.items.length);
  // let cartItemCount = 5;
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <h4 className="text-primary">Noodletown</h4>
      </Link>
      <ul>
        <li>
          <Link
            to="/categories"
            className={textWhite ? "text-white" : undefined}>
            Menu
          </Link>
        </li>
        <li>
          <Link
            to="/cart"
            className={`${styles.cart} ${textWhite ? "text-white" : ""}`}>
            <span>{cartItemCount}</span>
            <ShoppingCart />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
