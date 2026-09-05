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
  reviews: ReviewItem[];
}

export function reviewSchema({
  pageUrl,
  casinoName,
  reviews,
}: ReviewSchemaProps) {
  return reviews.slice(0, 10).map((review) => ({

    "@type": "Review",

        "@id": `${pageUrl}#review-${review.id}`,

    name: `Review of ${casinoName} by ${review.reviewer_name}`,

    reviewBody: review.content,

    datePublished: review.created_at,

    dateModified: review.updated_at,

    author: {
      "@type": "Person",

      name: review.reviewer_name,
    },

    itemReviewed: {
      "@type": "Thing",
      "@id": pageUrl,
      name: casinoName,
    },

    reviewRating: {
      "@type": "Rating",

      ratingValue: review.rating,

      bestRating: 5,

      worstRating: 1,
    },

    publisher: {
      "@id": "https://casinoreviewsbook.com/#organization",
    },
  }));
}
