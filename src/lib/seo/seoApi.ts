import { API_CONFIG } from "@/config/api.config";
import error from "next/dist/api/error";

export async function getNewsBySlug(slug: string) {
  try {
    const res = await fetch(`${API_CONFIG.baseURL}/news`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      return null;
    }

    const news = await res.json();

    const article = news.find((item: any) => item.slug === slug);

    return article || null;
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
