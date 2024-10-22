import Navbar from "../components/UI/Navbar";
import CartCard from "../components/UI/Cards/CartCard";

import { useSelector } from "react-redux";

export default function Cart() {
  const cart = useSelector((state) => state.items);
  return (
    <>
      <Navbar />
      <section className="p-2">
        <div className="category-container">
          <h2 className={"text-500"}>Your Cart</h2>
          <div className="my-2 row wrap gap-2">
            {cart.map((item, index) => {
              return (
                <CartCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  quantity={item.quantity}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
