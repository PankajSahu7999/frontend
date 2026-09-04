// 'use client';

// import { useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useParams } from 'next/navigation';
// import { useDispatch, useSelector } from 'react-redux';

// import { fetchNews } from '@/store/slices/newsSlice';
// import { AppDispatch, RootState } from '@/store';

// export default function NewsDetailPage() {
//   const params = useParams();
//   const dispatch = useDispatch<AppDispatch>();

//   const { news, loading, error } = useSelector(
//     (state: RootState) => state.news
//   );

//   const slug = params.slug as string;

//   useEffect(() => {
//     // Fetch news only if it is not already loaded
//     if (news.length === 0) {
//       dispatch(fetchNews());
//     }
//   }, [dispatch, news.length]);

//   const currentNews = news.find(
//     (item) => item.slug === slug
//   );

//   if (loading) {
//     return (
//       <div className="max-w-5xl mx-auto px-4 py-20 text-center">
//         <p>Loading news...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-5xl mx-auto px-4 py-20 text-center">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   if (!currentNews) {
//     return (
//       <div className="max-w-5xl mx-auto px-4 py-20 text-center">
//         <h1 className="text-3xl font-bold">
//           News Not Found
//         </h1>

//         <Link
//           href="/news"
//           className="inline-block mt-6 text-blue-600 hover:underline"
//         >
//           ← Back to News
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <main className="mx-auto px-2">

//       {/* Back Button */}
//       <Link
//         href="/news"
//         className="inline-block mb-8 text-blue-600 hover:underline"
//       >
//         ← Back to News
//       </Link>

//       {/* Article Header */}
//       <article>

//         <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//           {currentNews.title}
//         </h1>

//         <div className="mt-4 text-sm text-gray-500">
//           Published on{' '}
//           {new Date(
//             currentNews.published_at
//           ).toLocaleDateString()}
//         </div>

//         {/* Featured Image */}
//         <div className="relative w-full h-[300px] md:h-[500px] mt-8 rounded-xl overflow-hidden">
//           <img
//   src={currentNews.featured_image}
//   alt={currentNews.title}
//   className="w-full h-full object-cover"
// />
//         </div>

//         {/* Article Content */}
//         <div className="mt-10">

//           {currentNews.content
//             .split('\n\n')
//             .map((paragraph, index) => (
//               <p
//                 key={index}
//                 className="mb-6 text-lg leading-8 text-gray-700"
//               >
//                 {paragraph}
//               </p>
//             ))}

//         </div>

//       </article>

//     </main>
//   );
// }

import { getNewsBySlug } from "@/lib/seo/seoApi";
import NewsDetailsClient from "./NewsDetailsClient";
import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";
import {
  breadcrumbSchema,
  buildSchemaGraph,
  newsArticleSchema,
  webpageSchema,
} from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    return generateSEO({
      title: "News Not Found - Casino Review Book",
      description: "News not found",
      path: `/news/${slug}`,
      noIndex: true,
    });
  }
  return generateSEO({
    title: article.meta_title || article.title,
    description: article.content.substring(0, 160),
    path: `/news/${article.slug}`,
    image: article.featured_image,
    keywords: article.meta_keywords,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const article = await getNewsBySlug(slug);
  const PAGE_URL = `${process.env.NEXT_PUBLIC_SITE_URL}/news/${article.slug}/`;

  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: PAGE_URL,
      title: article.meta_title || article.title,
      description: article.content.substring(0, 160),
    }),
    newsArticle: newsArticleSchema({
      url: PAGE_URL,
      title: article.meta_title || article.title,
      description: article.content.substring(0, 160),
      image: article.featured_image,
      published: article.created_at,

      modified: article.updated_at || article.created_at,

      authorName: article.author_name || "Casino Review Book Editorial Team",

      authorUrl: article.author || "https://casinoreviewbook.com",

      articleSection: article.category || "Casino News",

      keywords: article.tags || [],
    }),
    breadcrumb: breadcrumbSchema({
      pageUrl: PAGE_URL,
      items: [
        {
          name: "Home",
          url: "https://casinoreviewbook.com",
        },
        {
          name: "News",
          url: "https://casinoreviewbook.com/news",
        },
        {
          name: article.title,
          url: PAGE_URL,
        },
      ],
    }),
  });

  return (
    <>
      <JsonLd data={graph} />

      <NewsDetailsClient news={article} />
      {/* <NewsDetailsClient /> */}
    </>
  );
}


// API Res need:

// {
//  id,
//  title,
//  slug,
//  content,
//  meta_title,
//  meta_description,
//  featured_image,

//  author_name,
//  author_url,

//  category,

//  tags,

//  created_at,
//  updated_at
// }