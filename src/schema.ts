import z from "zod";
import { CATEGORIES } from "./lib/constants";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(CATEGORIES),
  price: z.number().positive(),
  image: z.object({
    thumbnail: z.string(),
    mobile: z.string(),
    tablet: z.string(),
    desktop: z.string(),
  }),
});

export const ProductsSchema = z.array(ProductSchema);
