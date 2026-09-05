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