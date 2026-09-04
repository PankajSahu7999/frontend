import { SchemaBuilderOptions } from "../types";

export function buildSchemaGraph(
    schemas: SchemaBuilderOptions
){

    const graph = Object.values(schemas)
        .filter(Boolean);

    return {

        "@context":"https://schema.org",

        "@graph":graph

    }

}