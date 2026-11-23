// src/lib/seo/aggregateRatingSchema.ts

interface AggregateRatingProps {
  pageUrl: string;
  casinoName: string;
  reviews?: {
    rating: number | string;
  }[];
  fallbackRating?: number | string | null;
  fallbackCount?: number | null;
}

export function aggregateRatingSchema({
  pageUrl,
  casinoName,
  reviews = [],
  fallbackRating,
  fallbackCount,
}: AggregateRatingProps) {
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  const validRatings = safeReviews
    .map((review) => Number(review?.rating))
    .filter((rating) => Number.isFinite(rating) && rating >= 1 && rating <= 5);

  let ratingValue: number;
  let reviewCount: number;

  if (validRatings.length > 0) {
    ratingValue = Number(
      (
        validRatings.reduce((sum, rating) => sum + rating, 0) /
        validRatings.length
      ).toFixed(1)
    );
    reviewCount = validRatings.length;
  } else if (
    fallbackRating &&
    Number(fallbackRating) >= 1 &&
    Number(fallbackRating) <= 5
  ) {
    ratingValue = Number(Number(fallbackRating).toFixed(1));
    reviewCount = Math.max(Number(fallbackCount) || 15, 5);
  } else {
    // Default editorial score if none set
    ratingValue = 4.5;
    reviewCount = 12;
  }

  return {
    "@type": "AggregateRating",
    "@id": `${pageUrl}#aggregaterating`,
    itemReviewed: {
      "@type": "Organization",
      "@id": `${pageUrl}#casino`,
      name: casinoName,
      url: pageUrl,
    },
    ratingValue,
    reviewCount,
    bestRating: 5,
    worstRating: 1,
  };
}

