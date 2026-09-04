import { API_CONFIG, API_ENDPOINTS } from '@/config/api.config';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Generic GET request
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // Generic POST request
  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Generic PUT request
  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Generic DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Fetch all data at once for initial load
  async fetchAllInitialData() {
    try {
      const [casinos, featuredCasinos, bonuses, categories, news, siteSettings] = await Promise.all([
        this.get(API_ENDPOINTS.CASINOS),
        this.get(API_ENDPOINTS.FEATURED_CASINOS),
        this.get(API_ENDPOINTS.BONUSES),
        this.get(API_ENDPOINTS.CATEGORIES),
        this.get(API_ENDPOINTS.NEWS),
        this.get(API_ENDPOINTS.SITE_SETTINGS),
      ]);

      return {
        casinos,
        featuredCasinos,
        bonuses,
        categories,
        news,
        siteSettings,
      };
    } catch (error) {
      console.error('Failed to fetch initial data:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
