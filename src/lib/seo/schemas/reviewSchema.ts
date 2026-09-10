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
  reviews: ReviewItem[];
}

export function reviewSchema({
  pageUrl,
  casinoName,
  casinoId,
  reviews,
}: ReviewSchemaProps) {
  return reviews
    .filter(
      (review) =>
        review.content?.trim() &&
        review.reviewer_name?.trim() &&
        Number(review.rating) >= 1 &&
        Number(review.rating) <= 5,
    )
    .slice(0, 10)
    .map((review) => ({
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
