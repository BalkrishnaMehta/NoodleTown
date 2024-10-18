import { useSelector } from "react-redux";
import CartCard from "../components/UI/Cards/CartCard";
import Navbar from "../components/UI/Navbar";

export default function Cart() {
  const cart = useSelector((state) => state.items);
  return (
    <>
      <Navbar />
      <section className="p-2">
        <div className="category-container">
          <h2 className={"category-heading"}>Your Cart</h2>
          <div className="cart-items gap-2 my-2">
            {cart.map((item, index) => {
              return (
                <CartCard
                  key={`cart-item${index}`}
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
