// src/lib/seo/schemaGraph.ts

export function schemaGraph(
  ...schemas: Record<string, unknown>[]
) {
  return {
    "@context": "https://schema.org",

    "@graph": schemas,
  };
}