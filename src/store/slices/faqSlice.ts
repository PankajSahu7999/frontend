import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_CONFIG } from '@/config/api.config';

interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  status: boolean;
  created_at: string;
  updated_at: string;
}

interface FaqState {
  faqs: Faq[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: FaqState = {
  faqs: [],
  loading: false,
  error: null,
  lastFetched: null,
};

export const fetchFaqs = createAsyncThunk(
  'faqs/fetchFaqs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/faqs`);
      if (!response.ok) throw new Error('Failed to fetch FAQs');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch FAQs');
    }
  }
);

const faqSlice = createSlice({
  name: 'faqs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = faqSlice.actions;
export default faqSlice.reducer;
