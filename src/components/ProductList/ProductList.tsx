import styles from "./ProductList.module.scss";
import productData from "../../lib/products.json";
import { ProductsSchema } from "../../schema";
import { Heading } from "../utilities/Heading/Heading";
import { Wrapper } from "../utilities/Wrapper/Wrapper";
import { ProductCard } from "../ProductCard/ProductCard";

function getProducts() {
  const result = ProductsSchema.safeParse(productData);

  if (!result.success) throw new Error("Invalid Product data format");

  return result.data;
}

export function ProductList() {
  const products = getProducts();

  return (
    <section aria-labelledby="product-list-heading">
      <Wrapper>
        <Heading tag="h1" size="h1" text="Desserts" id="product-list-heading" />
        <ul className={styles.productList}>
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </ul>
      </Wrapper>
    </section>
  );
}
