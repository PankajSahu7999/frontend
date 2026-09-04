import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_CONFIG, API_ENDPOINTS } from '@/config/api.config';

interface Blog {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  featured_image: string;
  excerpt: string;
  content: string;
  meta_title: string;
  meta_description: string;
  status: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

interface BlogState {
  blogs: Blog[];
  currentBlog: Blog | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
  lastFetched: null,
};

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/blogs`);
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch blogs');
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  'blogs/fetchBlogById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/blogs/${id}`);
      if (!response.ok) throw new Error('Failed to fetch blog');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch blog');
    }
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentBlog: (state, action: PayloadAction<Blog | null>) => {
      state.currentBlog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentBlog } = blogSlice.actions;
export default blogSlice.reducer;
