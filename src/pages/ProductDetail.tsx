import { useParams } from "react-router-dom";

import Categories from "../models/Categories";
import Navbar from "../components/UI/Navbar";
import ProductCartActions from "../components/BrandDetailView/ProductCartActions";
import { Menu } from "../utils/Menu";

import styles from "../styles/BrandDetailView/ProductDetail.module.css";

const ProductDetail = () => {
  const { brand, category, product } = useParams();
  const brandIndex = parseInt(brand!);
  const categoryIndex = parseInt(category!);
  const productIndex = parseInt(product!);

  const brandData = Menu[brandIndex];
  const categoriesData: Categories = brandData.categories;
  const categoryData =
    categoriesData[Object.keys(categoriesData)[categoryIndex]];
  const productData = categoryData![productIndex];

  return (
    <>
      <Navbar />
      <div className="category-container">
        <div className={styles.productCard}>
          <div className={styles.imageContainer}>
            <img
              src={`../../../../${productData.image}`}
              alt={productData.title}
              className={styles.productImage}
            />
            <ProductCartActions product={productData} />
          </div>
          <div className={styles.contentContainer}>
            <h1 className={styles.title}>{productData.title}</h1>
            <div className={styles.priceContainer}>
              <span className={styles.priceLabel}>Price:</span>
              <span className={styles.price}>₹{productData.price}</span>
            </div>
            <div className={`col gap-1 ${styles.description}`}>
              <p>{productData.description}</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                accusamus odio sed reiciendis velit aspernatur quibusdam itaque
                atque fugit sint, molestias est, minima nisi ipsam enim sapiente
                laborum labore nesciunt iure? Voluptatem, doloribus dicta itaque
                tempora porro vel suscipit dolorum accusamus reprehenderit
                accusantium tenetur dolorem, ea perferendis? Dolor maiores,
                autem odio voluptas ab nulla commodi maxime quas assumenda alias
                rerum tenetur beatae quaerat possimus sunt placeat ducimus
                magnam aspernatur asperiores sint! Nobis, quo voluptatum ullam
                officiis, enim dolorum minus omnis eveniet nisi, quasi quam
                incidunt iure magnam. Autem ipsum sunt, sapiente ipsa placeat
                nemo ratione aliquam in optio! Aliquid, voluptas?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                possimus quos, dolorem, pariatur unde sint ex incidunt vero
                fugiat exercitationem magnam inventore neque officia esse qui
                maiores sunt? Aperiam reprehenderit aliquam laborum amet,
                impedit totam numquam odio non unde consequatur omnis veniam,
                debitis, corrupti harum enim! Consequuntur exercitationem facere
                veritatis a saepe fugiat sit, et dolor. Deserunt dolor
                praesentium laboriosam labore quisquam sed voluptatibus earum
                officiis sequi eum aliquam ducimus distinctio natus quas
                architecto perferendis, quidem dolorum odit porro ab error,
                eveniet ipsa quasi dolorem. Debitis, rem nam quas, consectetur
                molestias iusto corrupti dolor dolorem neque ullam dignissimos
                pariatur aliquam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
