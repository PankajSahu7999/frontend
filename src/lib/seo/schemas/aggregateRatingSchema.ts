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
  if (!validRatings.length) return null;

  const ratingValue = Number(
    (
      reviews.reduce((sum, item) => sum + Number(item.rating), 0) / validRatings.length
    ).toFixed(1),
  );

  return {
    "@type": "AggregateRating",
    "@id": `${pageUrl}#aggregaterating`,
    itemReviewed: {
      "@id": `${pageUrl}#casino`,
    },

    ratingValue,
    reviewCount: validRatings.length,
    bestRating: 5,
    worstRating: 1,
  };
}
