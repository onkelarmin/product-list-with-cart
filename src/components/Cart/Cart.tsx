import styles from "./Cart.module.scss";
import { useCartValue } from "../../context/useCartContext";
import { Heading } from "../utilities/Heading/Heading";
import { products } from "../../data/products";
import { CartItem } from "../CartItem/CartItem";
import { formatCurrency } from "../../utils/formatCurrency";
import CarbonNeutralIcon from "../../assets/svg/icon-carbon-neutral.svg?react";
import { Button } from "../utilities/Button/Button";
import EmptyCartIllustration from "../../assets/svg/illustration-empty-cart.svg?react";
import { useState } from "react";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";

export function Cart() {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const cart = useCartValue();

  const cartItems = Object.entries(cart).map(([slug, quantity]) => {
    const product = products.find((product) => product.slug === slug);

    if (product == null) throw new Error(`Unknown product slug: '${slug}'`);

    return {
      product,
      quantity,
      subtotal: quantity * product.price,
    };
  });

  const totalQuantity = cartItems.reduce((qty, item) => {
    return qty + item.quantity;
  }, 0);

  const totalPrice = cartItems.reduce((price, item) => {
    return price + item.subtotal;
  }, 0);

  return (
    <aside className={styles.cart} aria-labelledby="cart-title">
      <Heading tag="h2" size="h2" id="cart-title">
        Your Cart ({totalQuantity})
      </Heading>

      {totalQuantity === 0 ? (
        <div className={styles.emptyCart}>
          <EmptyCartIllustration aria-hidden="true" />
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul aria-label="Cart items">
            {cartItems.map((item) => (
              <CartItem
                key={item.product.slug}
                product={item.product}
                quantity={item.quantity}
                subtotal={item.subtotal}
              />
            ))}
          </ul>

          <div className={styles.totalPrice}>
            <span>Order Total</span>
            <data value={totalPrice} aria-label="Order total">
              {formatCurrency(totalPrice)}
            </data>
          </div>

          <div className={styles.carbonNeutral}>
            <CarbonNeutralIcon aria-hidden="true" />
            <p>
              This is a <span className={styles.strong}>carbon-neutral</span>{" "}
              delivery
            </p>
          </div>

          <Button onClick={() => setIsConfirmationModalOpen(true)}>
            Confirm Order
          </Button>

          <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            onClose={() => setIsConfirmationModalOpen(false)}
            cartItems={cartItems}
            totalPrice={totalPrice}
          />
        </>
      )}
    </aside>
  );
}
