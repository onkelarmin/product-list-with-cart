import styles from "./ConfirmationItem.module.scss";
import type { ProductType } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import { Heading } from "../utilities/Heading/Heading";
import { Image } from "../utilities/Image/Image";

type ConfirmationItemProps = {
  product: ProductType;
  quantity: number;
  subtotal: number;
};

export function ConfirmationItem({
  product,
  quantity,
  subtotal,
}: ConfirmationItemProps) {
  return (
    <li className={styles.confirmationItem}>
      <Image
        image={product.image.thumbnail}
        alt={product.name}
        className={styles.image}
      />
      <div>
        <Heading tag="h3" size="h4" className="mar-block-end-8">
          {product.name}
        </Heading>
        <div className={styles.details}>
          <span className={styles.quantity}>{quantity}x</span>
          <data value={product.price}>@ {formatCurrency(product.price)}</data>
        </div>
      </div>
      <data className={styles.subtotal} value={subtotal}>
        {formatCurrency(subtotal)}
      </data>
    </li>
  );
}
