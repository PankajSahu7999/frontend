import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hooks for specific data
export const useCasinos = () => {
  const dispatch = useAppDispatch();
  const { casinos, featuredCasinos, filteredCasinos, currentCasino, loading, error, lastFetched } = useAppSelector(
    (state) => state.casinos
  );

  return {
    casinos,
    featuredCasinos,
    filteredCasinos,
    currentCasino,
    loading,
    error,
    lastFetched,
    dispatch,
  };
};

export const useBonuses = () => {
  const dispatch = useAppDispatch();
  const { bonuses, currentBonus, loading, error, lastFetched } = useAppSelector(
    (state) => state.bonuses
  );

  return {
    bonuses,
    currentBonus,
    loading,
    error,
    lastFetched,
    dispatch,
  };
};

export const useReviews = () => {
  const dispatch = useAppDispatch();
  const { reviews, currentReview, casinoReviews, loading, error, lastFetched } = useAppSelector(
    (state) => state.reviews
  );

  return {
    reviews,
    currentReview,
    casinoReviews,
    loading,
    error,
    lastFetched,
    dispatch,
  };
};

export const useCategories = () => {
  const dispatch = useAppDispatch();
  const { categories, currentCategory, loading, error, lastFetched } = useAppSelector(
    (state) => state.categories
  );

  return {
    categories,
    currentCategory,
    loading,
    error,
    lastFetched,
    dispatch,
  };
};

export const useNews = () => {
  const dispatch = useAppDispatch();
  const { news, currentNews, loading, error, lastFetched } = useAppSelector((state) => state.news);

  return {
    news,
    currentNews,
    loading,
    error,
    lastFetched,
    dispatch,
  };
};

export const useSiteSettings = () => {
  const dispatch = useAppDispatch();
  const { settings, loading, error, lastFetched } = useAppSelector(
    (state) => state.siteSettings
  );

  return {
    settings,
    loading,
    error,
    lastFetched,
    dispatch,
  };
};

export const useBlogs = () => {
  const dispatch = useAppDispatch();
  const { blogs, currentBlog, loading, error, lastFetched } = useAppSelector(
    (state) => state.blogs
  );

  return {
    blogs,
    currentBlog,
    loading,
    error,
    lastFetched,
    dispatch,
  };
};

export const useFaqs = () => {
  const dispatch = useAppDispatch();
  const { faqs, loading, error, lastFetched } = useAppSelector((state) => state.faqs);

  return {
    faqs,
    loading,
    error,
    lastFetched,
    dispatch,
  };
};
