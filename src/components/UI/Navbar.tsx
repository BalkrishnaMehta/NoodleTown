import CartItem from "../../models/CartItem";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ShoppingCart } from "lucide-react";

import styles from "../../styles/UI/Navbar.module.css";

const Navbar = ({ textWhite }: { textWhite?: boolean }) => {
  const cartItemCount = useSelector(
    (state: { items: CartItem[] }) => state.items.length
  );
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
};

export default Navbar;
