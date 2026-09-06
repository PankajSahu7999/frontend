import { SchemaBuilderOptions } from "../types";

export function buildSchemaGraph(schemas: SchemaBuilderOptions) {
  const graph = Object.values(schemas).flat().filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
