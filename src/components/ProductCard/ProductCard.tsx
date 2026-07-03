import type { ProductType } from "../../types";
import { Image } from "../utilities/Image/Image";

type ProductCardProps = {
  product: ProductType;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      <Image
        image={product.image.desktop}
        alt={product.name}
        responsiveSources={product.image}
        sizes={{
          mobile: "calc(100vw - 3rem)",
          tablet: "calc(33vw - 5rem - 3rem)",
          desktop: "calc((76rem - 24rem - 2rem - 3rem) / 3)",
        }}
      />
    </article>
  );
}
