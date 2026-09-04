// src/lib/seo/breadcrumbSchema.ts

import { SITE } from "@/constants";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbSchemaProps {
  pageUrl: string;
  items: BreadcrumbItem[];
}

export function breadcrumbSchema({
  pageUrl,
  items,
}: BreadcrumbSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,

    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item:{
        "@id": item.url
      },
    })),
  };
}