import { API_CONFIG } from "@/config/api.config";
import error from "next/dist/api/error";

export async function getNewsBySlug(slug: string) {
  try {
    // 1. Try direct public endpoint /news/:slug
    try {
      const directRes = await fetch(`${API_CONFIG.baseURL}/news/${slug}`, {
        next: { revalidate: 60 },
      });
      if (directRes.ok) {
        const article = await directRes.json();
        if (article && article.slug) return article;
      }
    } catch {
      // Fall through to next attempt
    }

    // 2. Try direct /admin/news/:slug (supported by backend controller for slugs & UUIDs)
    try {
      const adminRes = await fetch(`${API_CONFIG.baseURL}/admin/news/${slug}`, {
        next: { revalidate: 60 },
      });
      if (adminRes.ok) {
        const article = await adminRes.json();
        if (article && article.slug) return article;
      }
    } catch {
      // Fall through to next attempt
    }

    // 3. Fallback to /news list
    const res = await fetch(`${API_CONFIG.baseURL}/news`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const news = await res.json();
    if (Array.isArray(news)) {
      const article = news.find((item: any) => item.slug === slug);
      return article || null;
    }

    return null;
  } catch (error) {
    console.error("News fetch error", error);
    return null;
  }
}

export async function getAllNews() {
  try {
    const res = await fetch(`${API_CONFIG.baseURL}/news`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      return null;
    } else {
      const news = await res.json();
      return news;
    }
  } catch (error) {
    console.error("News fetch error", error);

    return null;
  }
}

export async function getAllCasinos() {
  try {
    const res = await fetch(`${API_CONFIG.baseURL}/casinos`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      return null;
    } else {
      const casinos = await res.json();
      return casinos;
    }
  } catch (error) {
    console.error("Casinos fetch error", error);
    return null;
  }
}

export async function getBettingCategoryBySlug(slug: string) {
  try {
    const baseUrl = API_CONFIG.baseURL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
    const res = await fetch(
      `${baseUrl}/casinos/category/${slug}`,
      {
        cache: 'no-store',
      },
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch betting category:", error);
    return null;
  }
}
export async function getCasinoCategoryBySlug(slug: string) {
  try {
    const baseUrl = API_CONFIG.baseURL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
    const res = await fetch(
      `${baseUrl}/casinos/category/${slug}`,
      {
        cache: 'no-store',
      },
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch casino category:", error);
    return null;
  }
}

export async function getAllCategories() {
  try {
    const baseUrl = API_CONFIG.baseURL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
    const res = await fetch(`${baseUrl}/categories`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Categories fetch error", error);
    return [];
  }
}

export async function getAllGuides() {
  try {
    const baseUrl = API_CONFIG.baseURL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
    const res = await fetch(`${baseUrl}/guides?status=published`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.guides || (Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Guides fetch error", error);
    return [];
  }
}

