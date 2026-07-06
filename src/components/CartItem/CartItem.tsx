import styles from "./CartItem.module.scss";
import type { ProductType } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../utilities/Button/Button";
import { Heading } from "../utilities/Heading/Heading";
import RemoveIcon from "../../assets/svg/icon-remove-item.svg?react";
import { useCartDispatch } from "../../context/useCartContext";

type CartItemProps = {
  product: ProductType;
  quantity: number;
  subtotal: number;
};

export function CartItem({ product, quantity, subtotal }: CartItemProps) {
  const dispatch = useCartDispatch();

  return (
    <li className={styles.cartItem}>
      <div>
        <Heading tag="h3" size="h4">
          {product.name}
        </Heading>
        <div className={styles.info}>
          <span className={styles.quantity}>{quantity}x</span>
          <data value={product.price}>@ {formatCurrency(product.price)}</data>
          <data className={styles.subtotal} value={subtotal}>
            {formatCurrency(subtotal)}
          </data>
        </div>
      </div>
      <Button
        variant="removeFromCart"
        onClick={() =>
          dispatch({ type: "Remove", payload: { slug: product.slug } })
        }
      >
        <RemoveIcon aria-hidden="true" />
        <span className="visually-hidden">Remove item</span>
      </Button>
    </li>
  );
}
