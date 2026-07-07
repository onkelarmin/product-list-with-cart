import styles from "./ConfirmationModal.module.scss";
import { createPortal } from "react-dom";
import ConfirmationIcon from "../../assets/svg/icon-order-confirmed.svg?react";
import { Heading } from "../utilities/Heading/Heading";
import { useEffect, useRef } from "react";
import { Button } from "../utilities/Button/Button";
import { useCartDispatch } from "../../context/useCartContext";
import type { CartItem } from "../../types";
import { ConfirmationItem } from "../ConfirmationItem/ConfirmationItem";
import { formatCurrency } from "../../utils/formatCurrency";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalPrice: number;
};

export function ConfirmationModal({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
}: ConfirmationModalProps) {
  const dispatch = useCartDispatch();

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog == null) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog == null) return;

    dialog.addEventListener("close", onClose);

    return () => {
      dialog.removeEventListener("close", onClose);
    };
  }, [onClose]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.confirmationModal}
      aria-labelledby="confirmation-modal-title"
    >
      <ConfirmationIcon aria-hidden="true" className="mar-block-end-24" />

      <Heading tag="h2" size="h1" id="confirmation-modal-title">
        Order Confirmed
      </Heading>

      <p className="mar-block-start-8">We hope you enjoy your food!</p>

      <div className={styles.cart}>
        <ul>
          {cartItems.map((item) => (
            <ConfirmationItem
              key={item.product.slug}
              product={item.product}
              quantity={item.quantity}
              subtotal={item.subtotal}
            />
          ))}
        </ul>
        <div className={styles.totalPrice}>
          <span>Order Total</span>
          <data value={totalPrice}>{formatCurrency(totalPrice)}</data>
        </div>
      </div>

      <Button
        onClick={() => {
          dispatch({ type: "Clear" });
          onClose();
        }}
      >
        Start New Order
      </Button>
    </dialog>,
    document.body,
  );
}
