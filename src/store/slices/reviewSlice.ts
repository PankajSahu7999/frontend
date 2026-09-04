import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_CONFIG, API_ENDPOINTS } from '@/config/api.config';

interface Review {
  id: string;
  casino_id: string;
  user_id: string;
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

interface ReviewState {
  reviews: Review[];
  currentReview: Review | null;
  casinoReviews: Review[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: ReviewState = {
  reviews: [],
  currentReview: null,
  casinoReviews: [],
  loading: false,
  error: null,
  lastFetched: null,
};

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.REVIEWS}`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch reviews');
    }
  }
);

export const fetchReviewById = createAsyncThunk(
  'reviews/fetchReviewById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.REVIEW_BY_ID(id)}`);
      if (!response.ok) throw new Error('Failed to fetch review');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch review');
    }
  }
);

export const fetchCasinoReviews = createAsyncThunk(
  'reviews/fetchCasinoReviews',
  async (casinoId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.CASINO_REVIEWS(casinoId)}`);
      if (!response.ok) throw new Error('Failed to fetch casino reviews');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch casino reviews');
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentReview: (state, action: PayloadAction<Review | null>) => {
      state.currentReview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchReviewById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReview = action.payload;
      })
      .addCase(fetchReviewById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCasinoReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCasinoReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.casinoReviews = action.payload;
      })
      .addCase(fetchCasinoReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentReview } = reviewSlice.actions;
export default reviewSlice.reducer;
