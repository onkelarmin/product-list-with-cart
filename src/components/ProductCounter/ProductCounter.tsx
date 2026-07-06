import styles from "./ProductCounter.module.scss";
import { useCartDispatch, useCartValue } from "../../context/useCartContext";
import DecrementIcon from "../../assets/svg/icon-decrement-quantity.svg?react";
import IncrementIcon from "../../assets/svg/icon-increment-quantity.svg?react";
import { Button } from "../utilities/Button/Button";

type ProductCounterProps = {
  slug: string;
  productName: string;
};

export function ProductCounter({ slug, productName }: ProductCounterProps) {
  const cart = useCartValue();
  const dispatch = useCartDispatch();

  const count = cart[slug];

  return (
    <div className={styles.productCounter}>
      <Button
        variant="counter"
        onClick={() => dispatch({ type: "Decrement", payload: { slug } })}
      >
        <DecrementIcon />
        <span className="visually-hidden">Decrease {productName} quantity</span>
      </Button>

      <div className={styles.count}>{count}</div>

      <Button
        variant="counter"
        onClick={() => dispatch({ type: "Add", payload: { slug } })}
      >
        <IncrementIcon />
        <span className="visually-hidden">Increase {productName} quantity</span>
      </Button>
    </div>
  );
}
