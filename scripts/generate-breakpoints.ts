import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const inputPath = path.resolve("src", "sass", "core", "_page.scss");
const outputPath = path.resolve("src", "data", "breakpoints.ts");

const scss = await readFile(inputPath, "utf8");

const match = scss.match(/\$breakpoints:\s*\(([\s\S]*?)\);/);

if (!match) {
  throw new Error("Could not find $breakpoints map in _page.scss");
}

const mapContent = match[1];

const breakpoints: Record<string, string> = {};

for (const line of mapContent.split("\n")) {
  const cleanedLine = line.trim();

  if (!cleanedLine || cleanedLine.startsWith("//")) continue;

  const lineMatch = cleanedLine.match(/^([a-zA-Z0-9_-]+):\s*([^,]+),?$/);

  if (!lineMatch) continue;

  const [, key, value] = lineMatch;

  breakpoints[key] = value.trim();
}

const fileContent = `// This file is auto-generated.
// Do not edit manually.

export const breakpoints = ${JSON.stringify(breakpoints, null, 2)} as const;

export type Breakpoint = keyof typeof breakpoints;
`;

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, fileContent);

console.log(`Generated ${outputPath}`);
