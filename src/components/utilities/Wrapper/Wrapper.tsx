import styles from "./Wrapper.module.scss";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type WrapperProps = {
  width?: "narrow" | "wide" | "full";
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

export function Wrapper({ width, children }: WrapperProps) {
  return (
    <div className={styles.wrapper} data-width={width}>
      {children}
    </div>
  );
}
