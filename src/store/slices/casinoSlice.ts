import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_CONFIG } from '@/config/api.config';

interface CasinoBonus {
  id: string;
  title: string;
  type: string;
  amount: string;
  bonus_code: string | null;
  wagering_requirement: string | null;
  sort_order: number;
}

interface Casino {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  featured_image: string | null;
  rating: number | null;
  short_description: string | null;
  overview: string | null;
  website_url: string | null;
  affiliate_url: string | null;
  featured: boolean | null;
  hot_casino: boolean | null;
  recommended_by_experts: boolean | null;
  certified_casino: boolean | null;
  mobile_friendly: boolean | null;
  crypto_supported: boolean | null;
  live_casino: boolean | null;
  sports_betting: boolean | null;
  responsible_gaming: boolean | null;
  ranking_order: number | null;
  ranking_position: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[];
  status: string | null;
  established_year?: number | null;
  created_at: string | null;
  updated_at: string | null;
  bonuses: CasinoBonus[];
  tags?: any[];
  categories?: any[];
  available_countries?: any[];
}

interface CasinoState {
  casinos: Casino[];
  featuredCasinos: Casino[];
  filteredCasinos: Casino[];
  currentCasino: Casino | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: CasinoState = {
  casinos: [],
  featuredCasinos: [],
  filteredCasinos: [],
  currentCasino: null,
  loading: false,
  error: null,
  lastFetched: null,
};

export const fetchCasinos = createAsyncThunk(
  'casinos/fetchCasinos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/casinos`);
      if (!response.ok) throw new Error('Failed to fetch casinos');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch casinos');
    }
  }
);

export const fetchFeaturedCasinos = createAsyncThunk(
  'casinos/fetchFeaturedCasinos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/casinos?featured=true`);
      if (!response.ok) throw new Error('Failed to fetch featured casinos');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch featured casinos');
    }
  }
);

export const fetchCasinoById = createAsyncThunk(
  'casinos/fetchCasinoById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/casinos/${id}`);
      if (!response.ok) throw new Error('Failed to fetch casino');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch casino');
    }
  }
);

const casinoSlice = createSlice({
  name: 'casinos',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setInitialCasinos: (state, action: PayloadAction<Casino[]>) => {
      if (state.casinos.length === 0) {
        state.casinos = action.payload;
        state.filteredCasinos = action.payload;
      }
    },
    setCurrentCasino: (state, action: PayloadAction<Casino | null>) => {
      state.currentCasino = action.payload;
    },
    filterCasinosByTags: (state, action: PayloadAction<string[]>) => {
      const selectedTagIds = action.payload;
      
      if (selectedTagIds.length === 0) {
        state.filteredCasinos = state.casinos;
      } else {
        state.filteredCasinos = state.casinos.filter((casino) => {
          const casinoTagIds = casino.tags?.map((tag: any) => {
            if (tag.tag && tag.tag.id) {
              return tag.tag.id;
            }
            return tag.tag_id;
          }) || [];
          
          return selectedTagIds.some((tagId) => casinoTagIds.includes(tagId));
        });
      }
    },
    filterCasinosAdvanced: (
      state,
      action: PayloadAction<{
        tags?: string[];
        categories?: string[];
        features?: string[];
        minRating?: number;
        sortBy?: string;
      }>
    ) => {
      const { tags = [], categories = [], features = [], minRating, sortBy = 'recommended' } = action.payload;

      let result = [...state.casinos];

      // Filter by tags
      if (tags.length > 0) {
        result = result.filter((casino) => {
          const casinoTagIds = casino.tags?.map((t: any) => t.tag?.id || t.tag_id || t.id) || [];
          return tags.some((tagId) => casinoTagIds.includes(tagId));
        });
      }

      // Filter by categories
      if (categories.length > 0) {
        result = result.filter((casino) => {
          const casinoCatIds = casino.categories?.map((c: any) => c.category?.id || c.category_id || c.id) || [];
          return categories.some((catId) => casinoCatIds.includes(catId));
        });
      }

      // Filter by boolean features
      if (features.length > 0) {
        result = result.filter((casino) => {
          return features.every((feat) => Boolean((casino as any)[feat]));
        });
      }

      // Filter by min rating
      if (minRating && minRating > 0) {
        result = result.filter((casino) => {
          const ratingNum = typeof casino.rating === 'number' ? casino.rating : parseFloat(String(casino.rating || '0'));
          return ratingNum >= minRating;
        });
      }

      // Sorting
      if (sortBy === 'rating') {
        result.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
      } else if (sortBy === 'newest') {
        result.sort((a, b) => (b.established_year || 0) - (a.established_year || 0));
      }

      state.filteredCasinos = result;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all casinos
      .addCase(fetchCasinos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCasinos.fulfilled, (state, action) => {
        state.loading = false;
        state.casinos = action.payload;
        state.filteredCasinos = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchCasinos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch featured casinos
      .addCase(fetchFeaturedCasinos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedCasinos.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredCasinos = action.payload;
      })
      .addCase(fetchFeaturedCasinos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch casino by ID
      .addCase(fetchCasinoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCasinoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCasino = action.payload;
      })
      .addCase(fetchCasinoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setInitialCasinos, setCurrentCasino, filterCasinosByTags, filterCasinosAdvanced } = casinoSlice.actions;
export default casinoSlice.reducer;
