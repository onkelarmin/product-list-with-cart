import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps<T extends ElementType> = {
  As?: T;
  variant?: "default" | "addToCart" | "counter";
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

const DEFAULT_TYPE = "button";

export function Button<T extends ElementType = typeof DEFAULT_TYPE>({
  As,
  variant = "default",
  children,
  ...rest
}: ButtonProps<T>) {
  const Component = As ?? DEFAULT_TYPE;

  return (
    <Component className={styles.button} data-variant={variant} {...rest}>
      {children}
    </Component>
  );
}
