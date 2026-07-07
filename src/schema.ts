import z from "zod";
import { CATEGORIES } from "./data/constants.ts";

const ProductImageSchema = z.object({
  src: z.string(),
  width: z.number().positive(),
  height: z.number().positive(),
});

export const ProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  category: z.enum(CATEGORIES),
  price: z.number().positive(),
  image: z.object({
    thumbnail: ProductImageSchema,
    mobile: ProductImageSchema,
    tablet: ProductImageSchema,
    desktop: ProductImageSchema,
  }),
});

export const ProductsSchema = z.array(ProductSchema);
