// src/lib/seo/itemListSchema.ts

export interface ItemListEntry {
  name: string;
  url: string;
  image?: string;
}

export interface ItemListSchemaProps {
  pageUrl: string;
  itemListName: string;
  items: ItemListEntry[];
}

export function itemListSchema({
  pageUrl,
  itemListName,
  items,
}: ItemListSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#itemlist`,
    name: itemListName,
    numberOfItems: items.length,
    
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: item.url,
      name: item.name,
      ...(item.image && {
        image: item.image,
      }),
    })),
  };
}