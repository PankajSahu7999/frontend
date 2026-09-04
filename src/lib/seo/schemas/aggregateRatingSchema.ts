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

  const ratingValue =
    reviewCount === 0
      ? 4.8
      : Number(
          (
            reviews.reduce((sum, item) => sum + Number(item.rating), 0) /
            reviewCount
          ).toFixed(1),
        );
  return {
    "@context": "https://schema.org",

    "@type": "AggregateRating",

    "@id": `${pageUrl}#aggregaterating`,

    itemReviewed: {
      "@type": "Thing",

      "@id": pageUrl,

      name: casinoName,
    },

    ratingValue,

    reviewCount,

    bestRating: 5,

    worstRating: 1,
  };
}
