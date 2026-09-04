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

// {
//     id: '6984b2df-80e2-41f2-857b-67f7fa84dfcb',
//     casino_id: '7b5d0a5d-8735-462b-8b34-7e57fc221bfe',
//     reviewer_name: 'raj',
//     reviewer_position: 'User',
//     reviewer_experience_years: null,
//     content: 'sdfghjk',
//     rating: '5',
//     verdict: null,
//     status: 'published',
//     sort_order: 999,
//     created_at: '2026-07-23T17:02:27.047Z',
//     updated_at: '2026-07-23T17:02:27.047Z'
//   }

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
    "@context": "https://schema.org",

    "@type": "Review",

    "@id": `${pageUrl}#review`,

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
