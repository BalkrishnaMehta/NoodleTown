import { Check, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import styles from "../../../styles/UI/cards/RecipeCard.module.css";
import Product from "../../../models/Product";
import Image from "../Image";
import { useNavigate } from "react-router-dom";
import { useUpdateCart } from "../../../api/cartApi";
import CartItem from "../../../models/CartItem";
import { useState } from "react";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

interface RecipeCardProps {
  recipes: Product[];
}

const RecipeCard = ({ recipes }: RecipeCardProps) => {
  const navigate = useNavigate();

  const cart = useSelector((state: RootState) => state.cart.items);
  const { mutate } = useUpdateCart();
  const [animatingItem, setAnimatingItem] = useState<string | null>(null);

  // useEffect(() => {
  //   if (isError) {
  //     errorToasting(error);
  //   }
  // }, [isError, error]);

  function handleAddToCart(product: Product) {
    setAnimatingItem(product.id);
    mutate({
      product,
      quantity: 1,
      method: "POST",
    });
  }

  function handleRemoveFromCart(product: Product) {
    setAnimatingItem(product.id);
    mutate({
      product,
      quantity: 1,
      method: "DELETE",
    });
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const cartAnimation = {
    initial: { scale: 1, rotate: -45 },
    animate: { scale: 1.05, rotate: 315 },
    exit: { scale: 0.8, opacity: 0, rotate: -45 },
    transition: { duration: 0.5 },
  };

  return recipes.map((recipe, index) => {
    let inCart: boolean = false;
    if (cart) {
      inCart = cart.some((item: CartItem) => item.product.id === recipe.id);
    }

    return (
      <motion.div
        key={`recipe${index + 1}`}
        onClick={() => navigate(`/products/${recipe.id}`)}
        className={`col align-center ${styles.card}`}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}>
        <Image
          classes={styles.item_image}
          src={recipe.imageUrl || ""}
          alt={recipe.title}
        />
        <div>
          <h3 className={styles.title}>{recipe.title}</h3>
        </div>
        <p className={`${styles.description} text-500`}>{recipe.description}</p>
        <h2 className={styles.price}>₹{recipe.price}</h2>

        <div className={styles.triangle} onClick={(e) => e.stopPropagation()}>
          <motion.div
            className={`${styles.circle} ${inCart && styles.delete}`}
            onClick={
              inCart
                ? () => handleRemoveFromCart(recipe)
                : () => handleAddToCart(recipe)
            }
            initial="initial"
            animate={animatingItem === recipe.id ? "animate" : "initial"}
            exit="exit"
            variants={cartAnimation}>
            {inCart ? (
              <Check height={15} width={15} />
            ) : (
              <ShoppingBag height={15} width={15} />
            )}
          </motion.div>
        </div>
      </motion.div>
    );
  });
};

RecipeCard.Skeleton = ({ count = 1 }) => {
  return Array(count)
    .fill(0)
    .map((_, index) => (
      <div key={index} className={`col align-center ${styles.card}`}>
        <div className={styles.item_image}>
          <Skeleton className={styles.item_image} borderRadius={16} />
        </div>

        <p className={styles.title}>
          <Skeleton height={20} />
        </p>

        <p className={styles.description}>
          <Skeleton count={2} height={12} />
        </p>

        <div className={styles.price}>
          <Skeleton width={80} height={30} />
        </div>

        <div className={styles.triangle}>
          <Skeleton circle={true} height={32} width={32} />
        </div>
      </div>
    ));
};

export default RecipeCard;
