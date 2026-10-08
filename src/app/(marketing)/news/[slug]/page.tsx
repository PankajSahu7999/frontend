import { notFound } from "next/navigation";
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
      title: "News Not Found - Casino Reviews Book",
      description: "News article not found",
      path: `/news/${slug}`,
      noIndex: true,
    });
  }

  const cleanDescription = (
    article.meta_description ||
    (article.content ? article.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').substring(0, 160) : '') ||
    article.title ||
    ''
  ).trim();

  return generateSEO({
    title: article.meta_title || article.title,
    description: cleanDescription,
    path: `/news/${article.slug}`,
    image: article.featured_image,
    keywords: article.meta_keywords || [],
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const article = await getNewsBySlug(slug);
  if (!article) {
    notFound();
  }

  const PAGE_URL = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://casinoreviewsbook.com'}/news/${article.slug}/`;

  const authorName =
    (typeof article.author === 'string' ? article.author : article.author?.name) ||
    article.author_name ||
    "Casino Reviews Book Editorial Team";

  const cleanDescription = (
    article.meta_description ||
    (article.content ? article.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').substring(0, 160) : '') ||
    article.title ||
    ''
  ).trim();

  const publishedDate = article.published_at
    ? new Date(article.published_at).toISOString()
    : (article.created_at ? new Date(article.created_at).toISOString() : new Date().toISOString());

  const modifiedDate = article.updated_at
    ? new Date(article.updated_at).toISOString()
    : publishedDate;

  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: PAGE_URL,
      title: article.meta_title || article.title,
      description: cleanDescription,
    }),
    newsArticle: newsArticleSchema({
      url: PAGE_URL,
      title: article.meta_title || article.title,
      description: cleanDescription,
      image: article.featured_image || 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1200&auto=format&fit=crop&q=80',
      published: publishedDate,
      modified: modifiedDate,
      authorName,
      authorUrl: "https://casinoreviewsbook.com",
      articleSection: article.category || "Casino News",
      keywords: article.meta_keywords || [],
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
          url: "https://casinoreviewsbook.com/news",
        },
        {
          name: article.title || "News Article",
          url: PAGE_URL,
        },
      ],
    }),
  });

  return (
    <>
      <JsonLd data={graph} />
      <NewsDetailsClient news={article} />
    </>
  );
}