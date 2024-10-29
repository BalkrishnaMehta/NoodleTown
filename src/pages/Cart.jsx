import Navbar from "../components/UI/Navbar";
import CartCard from "../components/UI/Cards/CartCard";
import { PrimaryButton } from "../components/UI/Button";

import { useSelector } from "react-redux";

import image from "../assets/cart/a.png";
import { Link } from "react-router-dom";

export default function Cart() {
  const cart = useSelector((state) => state.items);

  return (
    <>
      <Navbar />
      <section className="p-2">
        <div className="category-container">
          <h2 className="text-500">Your Cart</h2>

          {cart.length !== 0 ? (
            <div className="my-2 row wrap gap-2">
              {cart.map(
                (
                  item // Changed to curly braces and added return
                ) => (
                  <CartCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    quantity={item.quantity}
                  />
                )
              )}
            </div>
          ) : (
            <div className="my-2 col gap-2 justify-center align-center text-center empty-cart">
              <img src={image} alt="Empty cart" />
              <h2>Fill it with deliciousness</h2>
              <Link to={"/categories"}>
                <PrimaryButton>Add Products</PrimaryButton>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
