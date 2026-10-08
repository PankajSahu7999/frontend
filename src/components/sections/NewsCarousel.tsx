'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useNews } from '@/hooks/useRedux';

interface NewsItem {
  id: string;
  slug?: string;
  featured_image: string;
  author: string;
  published_at: string;
  title: string;
  excerpt: string;
  tags: { label: string; color: string }[];
}

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${color}`}>
      {label}
    </span>
  );
}

function formatPublishedDate(dateStr?: string) {
  if (!dateStr) return 'Recent';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'Recent';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  } catch {
    return 'Recent';
  }
}

interface NewsCarouselProps {
  news?: any[];
}

export function NewsCarousel({ news: propNews }: NewsCarouselProps = {}) {
  const [isMounted, setIsMounted] = useState(false);
  const { news: reduxNews, loading: reduxLoading } = useNews();
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // During SSR and initial client hydration, use propNews (if provided) or fallback safely
  // only after mount to avoid hydration mismatch between server and client Redux states.
  const rawNews = propNews !== undefined
    ? (propNews.length > 0 ? propNews : (isMounted ? reduxNews : []))
    : (isMounted ? reduxNews : []);

  const loading = propNews !== undefined ? false : (!isMounted || reduxLoading);

  // Transform news data to match the component's expected format
  const newsItems: NewsItem[] = rawNews.map((item: any) => ({
    id: item.id,
    slug: item.slug,
    featured_image: item.featured_image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    author: (typeof item.author === 'string' ? item.author : item.author?.name) || 'Casino Reviews Book',
    published_at: formatPublishedDate(item.published_at),
    title: item.title,
    excerpt: item.excerpt || (item.content ? item.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : ''),
    tags: [
      { label: 'News', color: 'bg-indigo-50 text-indigo-600' },
      { label: 'Casino', color: 'bg-blue-50 text-blue-600' },
    ],
  }));

  useEffect(() => {
    if (newsItems.length > 0) {
      const interval = setInterval(() => {
        setStartIndex((prev) => (prev + 1) % newsItems.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [newsItems.length]);

  if (loading) {
    return (
      <section className="w-full flex justify-center py-8 lg:py-16">
        <div className="w-full max-w-[1184px]">
          <div className="text-center text-slate-500">Loading news...</div>
        </div>
      </section>
    );
  }

  if (newsItems.length === 0) {
    return null;
  }

  const getItem = (offset: number) => newsItems[(startIndex + offset) % newsItems.length];

  const featured = getItem(0);
  const second = getItem(1);
  const third = getItem(2);

  return (
    <section className="w-full flex justify-center py-8 lg:py-16">
      <div className="w-full max-w-[1184px] px-4 lg:px-0 overflow-hidden">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-extrabold text-slate-900">
            Hottest News from Casino
          </h2>

          <div className="flex gap-2">
            {newsItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setStartIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === startIndex ? 'bg-blue-600 w-6' : 'bg-slate-300'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Master Container with Cross-Browser Scrollbar Hiding */}
        <div 
          className="
            flex flex-row lg:flex-row gap-6 
            overflow-x-auto lg:overflow-visible 
            snap-x snap-mandatory 
            pb-4 lg:pb-0
            [scrollbar-width:none]
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          
          {/* Featured large card */}
          <Link
            key={featured.id}
            href={`/news/${featured.slug || featured.id}`}
            className="card-animated-border block w-[85vw] sm:w-[450px] lg:w-[476px] h-auto lg:h-[520px] shrink-0 snap-center rounded-2xl p-[2px] cursor-pointer text-inherit no-underline"
          >
            <div className="w-full h-full rounded-[14px] p-[14px] flex flex-col gap-6 bg-white">
              <div
                className="w-full h-[200px] sm:h-[280px] rounded-xl bg-cover bg-center shrink-0"
                style={{ backgroundImage: `url(${featured.featured_image})` }}
              />
              <div className="flex flex-col gap-3 flex-1">
                <p className="text-sm">
                  <span className="text-blue-600 font-semibold">{featured.author}</span>
                  <span className="text-slate-400"> • {featured.published_at}</span>
                </p>

                <h3 className="text-lg lg:text-xl font-bold text-slate-900 flex items-center justify-between gap-2">
                  <span className="line-clamp-2 lg:line-clamp-none">{featured.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-900 shrink-0" />
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 lg:line-clamp-none">
                  {featured.excerpt.length > 120
                    ? `${featured.excerpt.slice(0, 120)}...`
                    : featured.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {featured.tags.map((tag) => (
                    <Tag key={tag.label} label={tag.label} color={tag.color} />
                  ))}
                </div>
              </div>
            </div>
          </Link>

          {/* Right stacked cards (Becomes next items in the horizontal row on mobile) */}
          <div className="flex flex-row lg:flex-col gap-6 shrink-0 lg:flex-1">
            {[second, third].map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug || item.id}`}
                className="card-animated-border block w-[85vw] sm:w-[450px] lg:w-full xl:w-[675px] h-auto lg:h-[249px] shrink-0 snap-center rounded-2xl p-[2px] cursor-pointer text-inherit no-underline"
              >
                <div
                  className="w-full h-full rounded-[14px] p-[14px] flex flex-col sm:flex-row gap-6"
                  style={{
                    background:
                      'linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
                  }}
                >
                  <div
                    className="w-full sm:w-[200px] lg:w-[260px] h-[160px] sm:h-full rounded-xl bg-cover bg-center shrink-0"
                    style={{ backgroundImage: `url(${item.featured_image})` }}
                  />

                  <div className="flex flex-col gap-2 justify-center flex-1">
                    <p className="text-sm">
                      <span className="text-blue-600 font-semibold">{item.author}</span>
                      <span className="text-slate-400"> • {item.published_at}</span>
                    </p>

                    <h3 className="text-base lg:text-lg font-bold text-slate-900 line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                      {item.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto sm:mt-1">
                      {item.tags.map((tag) => (
                        <Tag key={tag.label} label={tag.label} color={tag.color} />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}