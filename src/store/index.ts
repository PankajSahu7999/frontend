import { configureStore } from '@reduxjs/toolkit';
import casinoSlice from './slices/casinoSlice';
import bonusSlice from './slices/bonusSlice';
import reviewSlice from './slices/reviewSlice';
import categorySlice from './slices/categorySlice';
import newsSlice from './slices/newsSlice';
import siteSettingsSlice from './slices/siteSettingsSlice';
import blogSlice from './slices/blogSlice';
import faqSlice from './slices/faqSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    casinos: casinoSlice,
    bonuses: bonusSlice,
    reviews: reviewSlice,
    categories: categorySlice,
    news: newsSlice,
    siteSettings: siteSettingsSlice,
    blogs: blogSlice,
    faqs: faqSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
