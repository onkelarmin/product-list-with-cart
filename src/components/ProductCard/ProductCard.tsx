import type { ProductType } from "../../types";

type ProductCardProps = {
  product: ProductType;
};

export function ProductCard({ product }: ProductCardProps) {
  return <article>{product.name}</article>;
}
