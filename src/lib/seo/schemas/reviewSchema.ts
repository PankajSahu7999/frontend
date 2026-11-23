// src/lib/seo/reviewSchema.ts

export interface ReviewItem {
  id: string;
  casino_id: string;
  reviewer_name: string;
  reviewer_position: string;
  reviewer_experience_years: number | null;
  content: string;
  rating: string;
  verdict: null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ReviewSchemaProps {
  pageUrl: string;
  casinoName: string;
  casinoId: string;
  reviews?: ReviewItem[];
  editorialReview?: {
    rating?: number | string | null;
    authorName?: string;
    reviewBody?: string | null;
    datePublished?: string | null;
    dateModified?: string | null;
  };
}

export function reviewSchema({
  pageUrl,
  casinoName,
  casinoId,
  reviews = [],
  editorialReview,
}: ReviewSchemaProps) {
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  const filtered = safeReviews
    .filter(
      (review) =>
        review.content?.trim() &&
        review.reviewer_name?.trim() &&
        Number(review.rating) >= 1 &&
        Number(review.rating) <= 5,
    )
    .slice(0, 10);

  if (filtered.length > 0) {
    return filtered.map((review) => ({
      "@type": "Review",
      "@id": `${pageUrl}#review-${review.id}`,
      name: `Review of ${casinoName} by ${review.reviewer_name}`,
      reviewBody: review.content.trim(),
      datePublished: review.created_at,
      dateModified: review.updated_at || review.created_at,
      author: {
        "@type": "Person",
        name: review.reviewer_name.trim(),
        ...(review.reviewer_position && {
          jobTitle: review.reviewer_position,
        }),
      },
      itemReviewed: {
        "@type": "Organization",
        "@id": `${pageUrl}#casino`,
        name: casinoName,
        url: pageUrl,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: Number(review.rating),
        bestRating: 5,
        worstRating: 1,
      },
      publisher: {
        "@type": "Organization",
        "@id": "https://casinoreviewsbook.com/#organization",
        name: "Casino Reviews Book",
      },
    }));
  }

  // Fallback to Verified Editorial Critic Review
  const ratingVal =
    editorialReview?.rating &&
    Number(editorialReview.rating) >= 1 &&
    Number(editorialReview.rating) <= 5
      ? Number(editorialReview.rating)
      : 4.5;

  const body =
    editorialReview?.reviewBody?.trim() ||
    `Expert review and safety audit of ${casinoName} evaluating licensing compliance, game RTP fairness, deposit bonuses, and withdrawal speed.`;

  return [
    {
      "@type": "Review",
      "@id": `${pageUrl}#editorial-review`,
      name: `${casinoName} Expert Review & Rating`,
      reviewBody: body,
      datePublished: editorialReview?.datePublished || "2026-01-01T00:00:00Z",
      dateModified: editorialReview?.dateModified || new Date().toISOString(),
      author: {
        "@type": "Organization",
        name:
          editorialReview?.authorName ||
          "Casino Reviews Book Editorial Team",
        url: "https://casinoreviewsbook.com/about-us",
      },
      itemReviewed: {
        "@type": "Organization",
        "@id": `${pageUrl}#casino`,
        name: casinoName,
        url: pageUrl,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: ratingVal,
        bestRating: 5,
        worstRating: 1,
      },
      publisher: {
        "@type": "Organization",
        "@id": "https://casinoreviewsbook.com/#organization",
        name: "Casino Reviews Book",
      },
    },
  ];
}
