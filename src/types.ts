import type z from "zod";
import type { ProductSchema } from "./schema";

export type ProductType = z.infer<typeof ProductSchema>;

export type CartItem = {
  product: ProductType;
  quantity: number;
  subtotal: number;
};
