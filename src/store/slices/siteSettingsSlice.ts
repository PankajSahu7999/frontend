import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_CONFIG, API_ENDPOINTS } from '@/config/api.config';

interface SiteSettings {
  id: number;
  site_name: string;
  site_description: string;
  site_keywords: string;
  logo_url: string;
  favicon_url: string;
  contact_email: string;
  social_facebook: string;
  social_twitter: string;
  social_instagram: string;
  social_telegram: string;
  created_at: string;
  updated_at: string;
}

interface SiteSettingsState {
  settings: SiteSettings | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: SiteSettingsState = {
  settings: null,
  loading: false,
  error: null,
  lastFetched: null,
};

export const fetchSiteSettings = createAsyncThunk(
  'siteSettings/fetchSiteSettings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.SITE_SETTINGS}`);
      if (!response.ok) throw new Error('Failed to fetch site settings');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch site settings');
    }
  }
);

const siteSettingsSlice = createSlice({
  name: 'siteSettings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSiteSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSiteSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchSiteSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = siteSettingsSlice.actions;
export default siteSettingsSlice.reducer;
