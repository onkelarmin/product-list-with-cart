import styles from "./Heading.module.scss";
import type { ComponentPropsWithoutRef } from "react";

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
  text: string;
} & ComponentPropsWithoutRef<"h1">;

export function Heading({ tag, size, text }: HeadingProps) {
  const Component = tag;

  return (
    <Component className={styles.heading} data-size={sizes[size]}>
      {text}
    </Component>
  );
}
