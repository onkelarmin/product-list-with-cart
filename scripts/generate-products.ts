import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { ProductsSchema } from "../src/schema.ts";

const inputPath = path.resolve("src", "data", "products.json");
const outputPath = path.resolve("src", "data", "products.ts");

function validateProducts(data: unknown) {
  const result = ProductsSchema.safeParse(data);

  if (!result.success) {
    throw new Error("Invalid product data format");
  }

  return result.data;
}

function toImportPath(imagePath: string) {
  return imagePath.replace(/^\.\/assets\//, "../assets/");
}

function toVariableName(productSlug: string, variantName: string) {
  return `${productSlug}-${variantName}`
    .replace(/-([a-z0-9])/g, (_, char: string) => char.toUpperCase())
    .replace(/^[0-9]/, "_$&");
}

const rawJson = await readFile(inputPath, "utf8");
const parsed = JSON.parse(rawJson);
const productsData = validateProducts(parsed);

const imports = new Set<string>();
const productEntries: string[] = [];

for (const product of productsData) {
  const imageEntries: string[] = [];

  for (const [variantName, image] of Object.entries(product.image)) {
    const variableName = toVariableName(product.slug, variantName);
    const importPath = toImportPath(image.src);

    imports.add(`import ${variableName} from ${JSON.stringify(importPath)};`);

    imageEntries.push(`${variantName}: {
      src: ${variableName},
      width: ${image.width},
      height: ${image.height},
    }`);
  }

  productEntries.push(`{
    name: ${JSON.stringify(product.name)},
    slug: ${JSON.stringify(product.slug)},
    category: ${JSON.stringify(product.category)},
    price: ${product.price},
    image: {
      ${imageEntries.join(",\n      ")}
    },
  }`);
}

const fileContent = `// This file is auto-generated.
// Do not edit manually.

import type { ProductType } from "../types";
${Array.from(imports).join("\n")}

export const products = [
  ${productEntries.join(",\n  ")}
] satisfies readonly ProductType[];
`;

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, fileContent);

console.log(`Generated ${outputPath}`);
