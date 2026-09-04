import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RegisteredUser {
  id: string;
  name: string | null;
  email: string;
  phone?: string | null;
  country?: string | null;
  avatar?: string | null;
  role?: string | null;
  status?: string | null;
}

interface UserState {
  currentUser: RegisteredUser | null;
}

const loadUserFromStorage = (): RegisteredUser | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('casino_user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const initialState: UserState = {
  currentUser: loadUserFromStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<RegisteredUser>) => {
      state.currentUser = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('casino_user', JSON.stringify(action.payload));
      }
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('casino_user');
      }
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
