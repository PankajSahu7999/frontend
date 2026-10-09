'use client';

import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

interface NewsArticle {
  id: number | string;
  slug: string;
  title: string;
  content: string;
  featured_image: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  author_name?: string;
  author?: any;
  category?: string;
}

interface Props {
  news: NewsArticle;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  } catch {
    return '';
  }
}

export default function NewsDetailsClient({ news }: Props) {
  const authorName =
    (typeof news.author === 'string' ? news.author : news.author?.name) ||
    news.author_name ||
    'Casino Reviews Book Editorial Team';

  const publishedDate = formatDate(news.published_at || news.created_at);
  const updatedDate = news.updated_at ? formatDate(news.updated_at) : '';

  return (
    <main className="w-full py-8 ">
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs
        items={[
          { name: 'News', url: '/news' },
          { name: news.title || 'Article' },
        ]}
        className="mb-6"
      />

      {/* Article Container */}
      <article className="w-full">
        <header className="mb-8">
          {news.category && (
            <div className="mb-3">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
                {news.category}
              </span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            {news.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500 pb-6 border-b border-gray-100">
            {publishedDate && (
              <span>
                Published <time dateTime={news.published_at || news.created_at}>{publishedDate}</time>
              </span>
            )}
            {updatedDate && updatedDate !== publishedDate && (
              <span>
                • Updated <time dateTime={news.updated_at}>{updatedDate}</time>
              </span>
            )}
            <span>
              • By <strong className="text-gray-800 font-semibold">{authorName}</strong>
            </span>
          </div>
        </header>

        {/* Featured Hero Image */}
        {news.featured_image && (
          <div className="relative w-full aspect-[16/9] max-h-[500px] overflow-hidden rounded-2xl mb-8 bg-gray-100 shadow-sm">
            <Image
              src={news.featured_image}
              alt={news.title || 'News cover image'}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        )}

        {/* Article Body with rich HTML styling */}
        {news.content ? (
          <div
            className="article-body text-gray-800 text-base sm:text-lg leading-relaxed space-y-6 [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:font-semibold [&_strong]:text-gray-900 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-gray-700 [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        ) : null}
      </article>

      {/* Continue Reading & Quick Links */}
      <section className="mt-16 border-t border-gray-200 pt-10">
        <h2 className="text-2xl font-bold text-gray-900">Explore More</h2>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          Discover verified casino ratings, industry updates, responsible gaming resources, and game guides.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/news"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            All News Articles
          </Link>
          <Link
            href="/guides/how-to-win"
            className="rounded-lg border border-blue-600 text-blue-600 px-6 py-3 text-sm font-semibold hover:bg-blue-50 transition"
          >
            Casino Guides
          </Link>
          <Link
            href="/responsible-gambling"
            className="rounded-lg border border-gray-300 text-gray-700 px-6 py-3 text-sm font-semibold hover:bg-gray-50 transition"
          >
            Responsible Gaming
          </Link>
        </div>
      </section>
    </main>
  );
}
