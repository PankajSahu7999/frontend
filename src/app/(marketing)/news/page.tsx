// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useDispatch, useSelector } from 'react-redux';
// import { Clock, ArrowRight, TrendingUp, Search } from 'lucide-react';

// import { fetchNews } from '@/store/slices/newsSlice';
// import { AppDispatch, RootState } from '@/store';

// export default function NewsPage() {
//     const dispatch = useDispatch<AppDispatch>();
//     const [searchTerm, setSearchTerm] = useState('');

//     const { news, loading, error } = useSelector(
//         (state: RootState) => state.news
//     );

//     useEffect(() => {
//         dispatch(fetchNews());
//     }, [dispatch]);

//     // Skeleton Loading State
//     if (loading) {
//         return (
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
//                 <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
//                 <div className="h-4 bg-gray-200 rounded w-1/2 mb-12"></div>
//                 <div className="h-[400px] bg-gray-200 rounded-2xl mb-12"></div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                     {[1, 2, 3].map((i) => (
//                         <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
//                     ))}
//                 </div>
//             </div>
//         );
//     }

//     // Error State
//     if (error) {
//         return (
//             <div className="max-w-7xl mx-auto px-4 py-20 text-center">
//                 <div className="p-6 max-w-md mx-auto bg-red-50 border border-red-200 rounded-2xl">
//                     <p className="text-red-600 font-medium">{error}</p>
//                     <button
//                         onClick={() => dispatch(fetchNews())}
//                         className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
//                     >
//                         Try Again
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//   const searchQuery = searchTerm.trim().toLowerCase();

// const filteredNews = news.filter((item) => {
//     const title = item.title?.toLowerCase() || '';
//     const excerpt = item.excerpt?.toLowerCase() || '';
//     const content = item.content?.toLowerCase() || '';

//     return (
//         title.includes(searchQuery) ||
//         excerpt.includes(searchQuery) ||
//         content.includes(searchQuery)
//     );
// });

//     const heroNews = filteredNews[0];
//     const gridNews = filteredNews.slice(1);

//     return (
//         <main className=" min-h-screen py-4">
//             <div className=" mx-auto px-2 ">
//                 {/* Page Header & Search */}
//                 <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-8 mb-10 gap-6">
//                     <div>
//                         <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
//                             <TrendingUp className="w-4 h-4" />
//                             <span>Industry Insights</span>
//                         </div>
//                         <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
//                             iGaming & Casino News
//                         </h1>
//                         <p className="mt-3 text-lg text-gray-600 max-w-2xl">
//                             Stay ahead with real-time updates, market analysis, and breaking coverage across the global gaming sector.
//                         </p>
//                     </div>

//                     {/* Search Bar */}
//                     <div className="relative w-full md:w-72">
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <input
//                             type="text"
//                             placeholder="Search news..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm"
//                         />
//                     </div>
//                 </div>

//                 {filteredNews.length === 0 ? (
//                     <div className="text-center py-20 text-gray-500">
//                         No articles found matching your criteria.
//                     </div>
//                 ) : (
//                     <>
//                         {/* Featured Hero Article */}
//                         {heroNews && (
//                             <section className="mb-14">
//                                 <article className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
//                                     <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[420px] w-full overflow-hidden bg-gray-100">
//                                         <img
//                                             src={heroNews.featured_image}
//                                             alt={heroNews.title}
//                                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
//                                         />
//                                         <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
//                                             Featured
//                                         </div>
//                                     </div>

//                                     <div className="lg:col-span-5 p-6 sm:p-8 lg:pr-10">
//                                         <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-3">
//                                             <Clock className="w-3.5 h-3.5" />
//                                             <time dateTime={heroNews.published_at}>
//                                                 {new Date(heroNews.published_at).toLocaleDateString('en-US', {
//                                                     month: 'short',
//                                                     day: 'numeric',
//                                                     year: 'numeric',
//                                                 })}
//                                             </time>
//                                         </div>

//                                         <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-snug">
//                                             <Link href={`/news/${heroNews.slug}`}>
//                                                 {heroNews.title}
//                                             </Link>
//                                         </h2>

//                                        <p className="mt-4 text-gray-600 line-clamp-3 text-base leading-relaxed">
//     {heroNews.excerpt || heroNews.content}
// </p>

//                                         <Link
//                                             href={`/news/${heroNews.slug}`}
//                                             className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
//                                         >
//                                             Read Full Story
//                                             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                                         </Link>
//                                     </div>
//                                 </article>
//                             </section>
//                         )}

//                         {/* Standard News Grid */}
//                         <section>
//                             <div className="flex items-center justify-between mb-6">
//                                 <h3 className="text-xl font-bold text-gray-900">
//                                     Latest Articles
//                                 </h3>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                                 {gridNews.map((item) => (
//                                     <article
//                                         key={item.id}
//                                         className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
//                                     >
//                                         {/* Card Image Container */}
//                                         <Link
//                                             href={`/news/${item.slug}`}
//                                             className="relative h-52 w-full overflow-hidden block bg-gray-100"
//                                         >
//                                             <img
//                                                 src={item.featured_image}
//                                                 alt={item.title}
//                                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
//                                             />
//                                         </Link>

//                                         {/* Card Content */}
//                                         <div className="flex flex-col flex-grow p-6">
//                                             <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-3">
//                                                 <Clock className="w-3.5 h-3.5" />
//                                                 <time dateTime={item.published_at}>
//                                                     {new Date(item.published_at).toLocaleDateString('en-US', {
//                                                         month: 'short',
//                                                         day: 'numeric',
//                                                         year: 'numeric',
//                                                     })}
//                                                 </time>
//                                             </div>

//                                             <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 leading-snug">
//                                                 <Link href={`/news/${item.slug}`}>{item.title}</Link>
//                                             </h3>

//                                            <p className="mt-3 text-sm text-gray-600 line-clamp-3 leading-relaxed flex-grow">
//     {item.excerpt || item.content}
// </p>

//                                             <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
//                                                 <Link
//                                                     href={`/news/${item.slug}`}
//                                                     className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
//                                                 >
//                                                     Read Article
//                                                     <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
//                                                 </Link>
//                                             </div>
//                                         </div>
//                                     </article>
//                                 ))}
//                             </div>
//                         </section>
//                     </>
//                 )}
//             </div>
//         </main>
//     );
import {
  breadcrumbSchema,
  buildSchemaGraph,
  collectionPageSchema,
  itemListSchema,
  searchActionSchema,
  webpageSchema,
} from "@/lib/seo/schemas";
import NewsPageClient from "./NewsPageClient";
import { generateSEO, getAllNews } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = generateSEO({
  title: "iGaming & Casino News | Latest Industry Updates, Trends & Insights",
  description:
    "Discover the latest news and insights on iGaming and Casino. Stay informed with our comprehensive coverage of industry trends, player safety, and legal updates.",
  path: "/news",
  keywords: [
    "casino news",
    "igaming news",
    "online casino updates",
    "gambling industry news",
    "casino industry trends",
    "online gambling regulation",
    "casino technology news",
    "responsible gambling news",
  ],
});

const PAGE_URL = "https://casinoreviewsbook.com/news";

export default async function Page() {
  const news = await getAllNews();
  const newsList = Array.isArray(news) ? news : [];

  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: PAGE_URL,
      title: "iGaming & Casino News | Latest Industry Updates, Trends & Insights",
      description:
        "Latest iGaming and casino industry news covering regulations, technology, trends, player safety, and market developments.",
    }),
    collectionPage: collectionPageSchema({
      pageUrl: PAGE_URL,
      title: "iGaming & Casino News | Latest Industry Updates, Trends & Insights",
      description:
        "Latest iGaming and casino industry news covering regulations, technology, trends, player safety, and market developments.",
    }),
    breadcrumb: breadcrumbSchema({
      pageUrl: PAGE_URL,
      items: [
        {
          name: "Home",
          url: "https://casinoreviewsbook.com",
        },
        {
          name: "News",
          url: PAGE_URL,
        },
      ],
    }),
    itemList: itemListSchema({
      pageUrl: PAGE_URL,
      itemListName: "Latest iGaming & Casino News",
      items: newsList.map((item: any, index: number) => ({
        position: index + 1,
        name: item.title,
        url: `https://casinoreviewsbook.com/news/${item.slug}`,
      })),
    }),
    searchAction: searchActionSchema({
      siteUrl: "https://casinoreviewsbook.com",
      searchPath: "/search",
    }),
  });

  return (
    <>
      <JsonLd data={graph} />
      <NewsPageClient />
    </>
  );
}
