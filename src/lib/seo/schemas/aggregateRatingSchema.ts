// src/lib/seo/aggregateRatingSchema.ts

interface AggregateRatingProps {
  pageUrl: string;
  casinoName: string;
  reviews: {
    rating: number;
  }[];
}

export function aggregateRatingSchema({
  pageUrl,
  casinoName,
  reviews,
}: AggregateRatingProps) {
  const reviewCount = reviews.length;
  if (reviewCount === 0) return null; // ❌ no fake rating

  const ratingValue = Number(
    (reviews.reduce((sum, item) => sum + Number(item.rating), 0) / reviewCount).toFixed(1)
  );

  return {
    "@type": "AggregateRating",
    "@id": `${pageUrl}#aggregaterating`,
    itemReviewed: {
      "@type": "Organization",
      "@id": pageUrl,
      name: casinoName,
    },

    ratingValue,
    reviewCount,
    bestRating: 5,
    worstRating: 1,
  };
}
