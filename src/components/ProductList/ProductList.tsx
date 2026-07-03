import styles from "./ProductList.module.scss";
import { Heading } from "../utilities/Heading/Heading";
import { Wrapper } from "../utilities/Wrapper/Wrapper";
import { ProductCard } from "../ProductCard/ProductCard";
import { products } from "../../data/products";

export function ProductList() {
  return (
    <section aria-labelledby="product-list-heading">
      <Wrapper>
        <Heading tag="h1" size="h1" text="Desserts" id="product-list-heading" />
        <ul className={styles.productList}>
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </ul>
      </Wrapper>
    </section>
  );
}
