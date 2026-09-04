// src/lib/seo/imageSchema.ts

export interface ImageSchemaProps {
  pageUrl: string;
  imageUrl: string;
  width?: number;
  height?: number;
  caption?: string;
}

export function imageSchema({
  pageUrl,
  imageUrl,
  width = 1200,
  height = 630,
  caption,
}: ImageSchemaProps) {
  return {
    "@type": "ImageObject",

    "@id": `${pageUrl}#primaryimage`,

    url: imageUrl,

    contentUrl: imageUrl,

    width,

    height,

    ...(caption && {
      caption,
    }),
  };
}