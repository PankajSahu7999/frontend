'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useRedux';
import {
  fetchCasinos,
  fetchFeaturedCasinos,
} from '@/store/slices/casinoSlice';
import { fetchBonuses } from '@/store/slices/bonusSlice';
import { fetchCategories } from '@/store/slices/categorySlice';
import { fetchNews } from '@/store/slices/newsSlice';
import { fetchSiteSettings } from '@/store/slices/siteSettingsSlice';
import { fetchBlogs } from '@/store/slices/blogSlice';
import { fetchFaqs } from '@/store/slices/faqSlice';
import { apiService } from '@/services/apiService';

export function DataInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch all initial data in parallel for fast loading
        await Promise.all([
          dispatch(fetchCasinos()),
          dispatch(fetchFeaturedCasinos()),
          dispatch(fetchBonuses()),
          dispatch(fetchCategories()),
          dispatch(fetchNews()),
          dispatch(fetchSiteSettings()),
          dispatch(fetchBlogs()),
          dispatch(fetchFaqs()),
        ]);

        console.log('All data loaded successfully');
      } catch (error) {
        console.error('Failed to initialize data:', error);
      }
    };

    initializeData();
  }, [dispatch]);

  return null; // This component doesn't render anything
}
