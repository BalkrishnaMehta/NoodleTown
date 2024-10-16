import CartCard from "../components/UI/CartCard";
import Navbar from "../components/UI/Navbar";
import { cart } from "../utils/data";

export default function Cart() {
  return (
    <>
      <Navbar />
      <section className="p-2">
        <div className="category-container">
          <h2 className={"category-heading"}>Your Cart</h2>
          <div
            style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
            className="my-2">
            {cart.map((item, index) => {
              return (
                <CartCard
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
