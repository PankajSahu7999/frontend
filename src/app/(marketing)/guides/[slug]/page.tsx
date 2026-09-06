import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  BookOpen,
  Calendar,
  Clock,
  ChevronRight,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  Flame,
  CheckCircle2,
} from "lucide-react";
import Script from "next/script";
import { getGuideDisplayImage } from "@/utils/guideImages";
import { buildApiUrl } from "@/config/api.config";
import { generateSEO } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema, buildSchemaGraph } from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

async function getGuideData(slug: string) {
  try {
    const res = await fetch(buildApiUrl(`/guides/slug/${slug}`), {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error("Error fetching guide data:", err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getGuideData(slug);
  if (!data?.guide) {
    return generateSEO({
      title: "Guide Not Found",
      description: "The requested casino guide could not be found.",
      path: `/guides/${slug}`,
      noIndex: true,
    });
  }

  const guide = data.guide;
  const title = guide.meta_title || `${guide.title} | Casino Guides`;
  const description =
    guide.meta_description ||
    guide.excerpt ||
    `Read our comprehensive guide to ${guide.title}.`;
  const imgSrc = getGuideDisplayImage(guide);

  return generateSEO({
    title,
    description,
    path: `/guides/${slug}`,
    image: imgSrc,
    type: "article",
    publishedTime: guide.published_at,
    authors: [guide.author_name || "Casino Expert"],
  });
}

export default async function SingleGuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const data = await getGuideData(slug);

  if (!data?.guide) {
    notFound();
  }

  const guide = data.guide;
  const relatedGuides = data.relatedGuides || [];

  const wordCount = (guide.content || guide.excerpt || "").split(/\s+/).length;
  const readingTime = Math.max(3, Math.ceil(wordCount / 200));

  const formattedDate = guide.published_at
    ? new Date(guide.published_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  const heroImageSrc = getGuideDisplayImage(guide);

  const baseUrl = "https://casinoreviewsbook.com";
  const articleUrl = `${baseUrl}/guides/${guide.slug}`;

  // Structured Data (Schema.org)
  const graph = buildSchemaGraph({
    article: articleSchema({
      type: "Article",
      title: guide.title,
      description: guide.excerpt,
      image: heroImageSrc,
      url: articleUrl,
      author: {
        "@type": "Person",
        name: guide.author_name || "Casino Expert Analyst",
        ...(guide.author_slug
          ? { url: `${baseUrl}/authors/${guide.author_slug}` }
          : {}),
      },
      published: guide.published_at,
      modified: guide.updated_at || guide.published_at,
      articleSection: guide.category,
      publisher: {
        "@type": "Organization",
        name: "Casino Reviews Book",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": articleUrl,
      },
      keywords: [
        "Casino Strategy",
        "RTP",
        "House Edge",
        "Blackjack",
        "Roulette",
        "Bankroll",
      ],
      ...(guide.word_count ? { wordCount: guide.word_count } : {}),
    }),
    breadcrumb: breadcrumbSchema({
      pageUrl: articleUrl,
      items: [
        {
          name: "Home",
          url: baseUrl,
        },
        {
          name: "Casino Guide",
          url: `${baseUrl}/guides`,
        },
        {
          name: "Casino Guides",
          url: `${baseUrl}/guides/how-to-win`,
        },
        {
          name: guide.category || "Guides",
          url: `${baseUrl}/guides/how-to-win#${(guide.category || "more")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")}`,
        },
        {
          name: guide.title,
          url: articleUrl,
        },
      ],
    }),
  });

  return (
    <article className="w-full pb-16">
      {/* Schema Injection */}
      <JsonLd data={graph} />

      {/* Main Container Card matching the site's layout */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0px_4px_16px_rgba(38,123,220,0.08)] p-6 sm:p-10 mb-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 flex-wrap font-medium">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <Link
            href="/guides/how-to-win"
            className="hover:text-gray-900 transition-colors"
          >
            Casino Guides
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-amber-600 font-bold">{guide.category}</span>
        </nav>

        {/* Hero Header Layout: Text + Feature Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-gray-100 mb-8">
          <div className="lg:col-span-8">
            {/* Category Badge & Reading Time */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="px-3 py-1 rounded-full text-white text-xs font-semibold border border-[#F59E0B4D] bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)]">
                {guide.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                <Clock size={13} className="text-amber-500" />
                {readingTime} min read
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
              {guide.title}
            </h1>

            {/* Byline & Date */}
            <div className="flex items-center gap-4 text-xs text-gray-500 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-bold text-xs">
                  CL
                </div>
                <span className="font-semibold text-gray-800">
                  {guide.author_name || "Casino Expert"}
                </span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar size={13} className="text-gray-400" />
                <span>Published: {formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Hero Feature Image */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[320px] aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-gray-200/80 shadow-md flex items-center justify-center">
              <Image
                src={heroImageSrc}
                alt={guide.title}
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-300 brightness-95 hover:brightness-100"
                sizes="(max-width: 768px) 100vw, 320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Key Takeaway / Excerpt Box */}
        {guide.excerpt && (
          <div className="mb-8 p-5 sm:p-6 bg-amber-50/70 border-l-4 border-[#F59E0B] border-y border-r border-amber-200/60 rounded-r-2xl shadow-2xs">
            <h2 className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-1.5 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-600" />
              Quick Summary & Core Strategy
            </h2>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
              {guide.excerpt}
            </p>
          </div>
        )}

        {/* Full Article Content Body */}
        <div className="prose max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2 prose-h2:mt-8 prose-h3:text-lg prose-h3:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-sm prose-p:sm:text-base prose-li:text-gray-700 prose-li:text-sm prose-li:sm:text-base prose-strong:text-gray-900">
          {guide.content ? (
            <div className="space-y-6">
              {guide.content
                .split("\n\n")
                .map((paragraph: string, idx: number) => {
                  const trimmed = paragraph.trim();
                  if (trimmed.startsWith("# ")) {
                    return null;
                  }
                  if (trimmed.startsWith("## ")) {
                    return (
                      <h2
                        key={idx}
                        className="text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2 mt-8"
                      >
                        {trimmed.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (trimmed.startsWith("### ")) {
                    return (
                      <h3
                        key={idx}
                        className="text-lg font-bold text-gray-900 mt-6"
                      >
                        {trimmed.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (trimmed.startsWith("- ")) {
                    const items = trimmed
                      .split("\n")
                      .filter((l: string) => l.startsWith("- "));
                    return (
                      <ul key={idx} className="space-y-2 my-4 pl-1">
                        {items.map((item: string, iIdx: number) => (
                          <li
                            key={iIdx}
                            className="flex items-start gap-2.5 text-sm text-gray-700"
                          >
                            <CheckCircle2
                              size={16}
                              className="text-amber-500 shrink-0 mt-0.5"
                            />
                            <span>
                              {item
                                .replace("- ", "")
                                .replace(/\*\*(.*?)\*\*/g, "$1")}
                            </span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p
                      key={idx}
                      className="text-sm sm:text-base text-gray-700 leading-relaxed"
                    >
                      {trimmed}
                    </p>
                  );
                })}
            </div>
          ) : (
            <p className="text-gray-500">Detailed guide content coming soon.</p>
          )}
        </div>

        {/* High Conversion CTA Section */}
        <div className="my-10 p-6 sm:p-8 bg-[linear-gradient(90deg,_#1E293B_0%,_#0F172A_100%)] text-white rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame size={14} className="text-amber-400" />
              Verified Real-Money Casinos
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Ready to Put This Strategy into Practice?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
              Discover top-rated online casinos offering high RTPs, quick
              withdrawals, and lucrative welcome bonuses.
            </p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)] hover:brightness-105 text-white font-bold rounded-xl text-sm shadow-md transition-all hover:scale-105 shrink-0"
          >
            Explore Top Casinos ▶
          </Link>
        </div>

        {/* Related Guides Section with Images */}
        {relatedGuides.length > 0 && (
          <div className="border-t border-gray-200 pt-8 mt-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <BookOpen size={20} className="text-amber-500" />
              More in {guide.category}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedGuides.map((rel: any) => {
                const relImg = getGuideDisplayImage(rel);

                return (
                  <Link
                    key={rel.id || rel.slug}
                    href={`/guides/${rel.slug}`}
                    className="group bg-gray-50 hover:bg-amber-50/30 border border-gray-200 hover:border-amber-400 rounded-xl p-4 transition-all duration-150 flex gap-4 items-center justify-between"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                      <Image
                        src={relImg}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1 mb-1">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                        {rel.excerpt}
                      </p>
                      <span className="text-[11px] text-amber-600 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Read Guide <ChevronRight size={13} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-10 text-center">
          <Link
            href="/guides/how-to-win"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold border border-gray-300 transition-colors"
          >
            <ArrowLeft size={15} />
            Back to All Casino Guides
          </Link>
        </div>
      </div>
    </article>
  );
}
