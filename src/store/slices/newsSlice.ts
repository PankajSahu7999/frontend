import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_CONFIG, API_ENDPOINTS } from '@/config/api.config';

interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

interface NewsState {
  news: News[];
  currentNews: News | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: NewsState = {
  news: [],
  currentNews: null,
  loading: false,
  error: null,
  lastFetched: null,
};

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.NEWS}`);
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch news');
    }
  }
);

export const fetchNewsById = createAsyncThunk(
  'news/fetchNewsById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.NEWS_BY_ID(id)}`);
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch news');
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentNews: (state, action: PayloadAction<News | null>) => {
      state.currentNews = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchNewsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNews = action.payload;
      })
      .addCase(fetchNewsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentNews } = newsSlice.actions;
export default newsSlice.reducer;
