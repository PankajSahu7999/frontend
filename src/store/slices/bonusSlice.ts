import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_CONFIG, API_ENDPOINTS } from '@/config/api.config';

interface Bonus {
  id: string;
  title: string;
  description: string;
  casino_id: string;
  bonus_type: string;
  amount: number;
  wagering_requirements: string;
  valid_until: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface BonusState {
  bonuses: Bonus[];
  currentBonus: Bonus | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: BonusState = {
  bonuses: [],
  currentBonus: null,
  loading: false,
  error: null,
  lastFetched: null,
};

export const fetchBonuses = createAsyncThunk(
  'bonuses/fetchBonuses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.BONUSES}`);
      if (!response.ok) throw new Error('Failed to fetch bonuses');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch bonuses');
    }
  }
);

export const fetchBonusById = createAsyncThunk(
  'bonuses/fetchBonusById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.BONUS_BY_ID(id)}`);
      if (!response.ok) throw new Error('Failed to fetch bonus');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch bonus');
    }
  }
);

const bonusSlice = createSlice({
  name: 'bonuses',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentBonus: (state, action: PayloadAction<Bonus | null>) => {
      state.currentBonus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBonuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBonuses.fulfilled, (state, action) => {
        state.loading = false;
        state.bonuses = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchBonuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBonusById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBonusById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBonus = action.payload;
      })
      .addCase(fetchBonusById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentBonus } = bonusSlice.actions;
export default bonusSlice.reducer;
