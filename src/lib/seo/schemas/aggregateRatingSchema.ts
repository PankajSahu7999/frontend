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
  const validRatings = reviews
    .map((review) => Number(review.rating))
    .filter((rating) => Number.isFinite(rating) && rating >= 1 && rating <= 5);

  if (validRatings.length === 0) {
    return null;
  }
  const ratingValue = Number(
    (
      validRatings.reduce((sum, rating) => sum + rating, 0) /
      validRatings.length
    ).toFixed(1),
  );

  return {
    "@type": "AggregateRating",
    "@id": `${pageUrl}#aggregaterating`,
    itemReviewed: {
      "@type": "Organization",
      "@id": `${pageUrl}#casino`,
      name: casinoName,
    },

    ratingValue,
    reviewCount: validRatings.length,
    bestRating: 5,
    worstRating: 1,
  };
}
