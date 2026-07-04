import styles from "./ProductList.module.scss";
import { Heading } from "../utilities/Heading/Heading";
import { Wrapper } from "../utilities/Wrapper/Wrapper";
import { ProductCard } from "../ProductCard/ProductCard";
import { products } from "../../data/products";

export function ProductList() {
  return (
    <main>
      <Wrapper>
        <Heading tag="h1" size="h1">
          Desserts
        </Heading>

        <Heading tag="h2" size="h2" className="visually-hidden">
          Selection of our available desserts
        </Heading>

        <ul className={styles.productList}>
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </ul>
      </Wrapper>
    </main>
  );
}
