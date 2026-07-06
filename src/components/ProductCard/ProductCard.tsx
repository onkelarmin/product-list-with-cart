import styles from "./ProductCard.module.scss";
import { useCartDispatch, useCartValue } from "../../context/useCartContext";
import type { ProductType } from "../../types";
import { Button } from "../utilities/Button/Button";
import { ProductCounter } from "../ProductCounter/ProductCounter";
import CartIcon from "../../assets/svg/icon-add-to-cart.svg?react";
import { Heading } from "../utilities/Heading/Heading";
import { formatCurrency } from "../../utils/formatCurrency";
import { Picture } from "../utilities/Picture/Picture";

type ProductCardProps = {
  product: ProductType;
};

export function ProductCard({ product }: ProductCardProps) {
  const cart = useCartValue();
  const dispatch = useCartDispatch();
  const isInCart = Object.hasOwn(cart, product.slug);

  return (
    <article className={styles.productCard}>
      <Picture
        sources={product.image}
        alt={product.name}
        imgClassName={`${styles.image} ${isInCart && styles.isInCart}`}
        priority
      />

      <div className={styles.controls}>
        {isInCart ? (
          <ProductCounter slug={product.slug} />
        ) : (
          <Button
            variant="addToCart"
            onClick={() =>
              dispatch({ type: "Add", payload: { slug: product.slug } })
            }
          >
            <CartIcon className={styles.cartIcon} aria-hidden="true" />
            <span>Add to Cart</span>
          </Button>
        )}
      </div>

      <div className={styles.info}>
        <p>{product.category}</p>
        <Heading tag="h3" size="h3">
          {product.name}
        </Heading>
        <p className={styles.price}>{formatCurrency(product.price)}</p>
      </div>
    </article>
  );
}
