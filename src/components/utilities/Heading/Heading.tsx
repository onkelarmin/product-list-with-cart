import styles from "./Heading.module.scss";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const sizes = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
};

type HeadingProps = {
  tag: keyof typeof sizes;
  size: keyof typeof sizes;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"h1">;

export function Heading({
  tag,
  size,
  children,
  className,
  ...rest
}: HeadingProps) {
  const Component = tag;

  return (
    <Component
      className={`${styles.heading} ${className}`}
      data-size={sizes[size]}
      {...rest}
    >
      {children}
    </Component>
  );
}
