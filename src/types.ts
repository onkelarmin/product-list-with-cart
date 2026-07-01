import type z from "zod";
import type { ProductSchema } from "./schema";

export type ProductType = z.infer<typeof ProductSchema>;
