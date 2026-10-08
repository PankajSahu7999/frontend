import { API_CONFIG } from "@/config/api.config";

export async function getNewsBySlug(slug: string) {
  try {
    const baseUrl = API_CONFIG.baseURL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

    // 1. Try direct slug endpoint
    try {
      const directRes = await fetch(`${baseUrl}/news/${encodeURIComponent(slug)}`, {
        cache: 'no-store',
      });
      if (directRes.ok) {
        const directData = await directRes.json();
        if (directData && (directData.id || directData.slug)) {
          return directData;
        }
      }
    } catch {
      // Direct endpoint failed, fall through to list search
    }

    // 2. Fallback to list search
    const res = await fetch(`${baseUrl}/news`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;
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
    const baseUrl = API_CONFIG.baseURL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
    const res = await fetch(`${baseUrl}/news`, {
      cache: 'no-store',
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

