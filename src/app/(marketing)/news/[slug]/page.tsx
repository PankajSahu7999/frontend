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
      description: "News not found",
      path: `/news/${slug}`,
      noIndex: true,
    });
  }
  return generateSEO({
    title: article.meta_title || article.title,
    description: article.meta_description || (article.content ? article.content.substring(0, 160) : ""),
    path: `/news/${article.slug}`,
    image: article.featured_image,
    keywords: article.meta_keywords,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const article = await getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const PAGE_URL = `${process.env.NEXT_PUBLIC_SITE_URL || "https://casinoreviewsbook.com"}/news/${article.slug}/`;
  const description = article.meta_description || (article.content ? article.content.substring(0, 160) : "") || "Casino and iGaming industry news.";
  const authorName = (typeof article.author === 'object' && article.author?.name) || article.author_name || "Casino Reviews Book Editorial Team";
  const authorUrl = typeof article.author === 'string' ? article.author : "https://casinoreviewsbook.com";

  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: PAGE_URL,
      title: article.meta_title || article.title,
      description,
    }),
    newsArticle: newsArticleSchema({
      url: PAGE_URL,
      title: article.meta_title || article.title,
      description,
      image: article.featured_image || "",
      published: article.published_at || article.created_at,
      modified: article.updated_at || article.published_at || article.created_at,
      authorName,
      authorUrl,
      articleSection: article.category || "Casino News",
      keywords: Array.isArray(article.tags) ? article.tags : [],
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
    </>
  );
}