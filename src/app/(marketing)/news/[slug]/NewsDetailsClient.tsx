'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

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


interface NewsArticle {
  id: number | string;
  slug: string;
  title: string;
  content: string;
  featured_image: string;
  published_at: string;
  updated_at?: string;
  author_name?: string;
  category?: string;
}

interface Props {
  news: NewsArticle;
}

export default function NewsDetailsClient({ news }: Props) {
  return (
    <>
      <main className="mx-auto px-2">
        {/*  Back Button */}
        <Link
          href="/news"
          className="inline-block mb-8 text-blue-600 hover:underline"
        >
          ← Back to News
        </Link>

        {/* Article Header */}
        <article>
          <header>
            {news.category && (
              <div className="mb-3">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  {news.category}
                </span>
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {news.title}
            </h1>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
              <span>
                Published on{" "}
                <time dateTime={news.published_at}>
                  {new Date(news.published_at).toLocaleDateString()}
                </time>
              </span>

              {news.updated_at && (
                <span>
                  Updated{" "}
                  <time dateTime={news.updated_at}>
                    {new Date(news.updated_at).toLocaleDateString()}
                  </time>
                </span>
              )}
      {/* Back Button */}
      <Breadcrumbs
        items={[
          { name: 'News', url: '/news' },
          { name: news.title },
        ]}
        className="mb-4"
      />

              {news.author_name && <span>By {news.author_name}</span>}
            </div>
          </header>

          {/* Featured Image */}
          {news.featured_image && (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={news.featured_image}
                alt={news.title}
                fill
                priority
                sizes="(max-width:768px) 100vw, 900px"
                className="object-cover"
              />
            </div>
          )}
          {/* Article Content */}
          <div className="mt-10">
            {news.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-6 text-lg leading-8 text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Continue Reading Section */}
        <section className="mt-16 border-t border-blue-600 pt-10">
          <h2 className="text-2xl font-bold text-gray-900">Continue Reading</h2>

          <p className="mt-2 text-gray-600">
            Browse more casino news, industry updates, responsible gambling
            resources, and expert guides.
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              href="/news"
              className="rounded-lg bg-[#2E68FB] px-5 py-3 text-white hover:bg-blue-700"
            >
              All News
            </Link>

            <Link
              href="/guides/how-to-win"
              className="rounded-lg border border-blue-600 text-blue-600 px-5 py-3 hover:bg-blue-100"
            >
              Guides
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
