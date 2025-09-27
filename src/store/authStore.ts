import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import type { User } from '../dto/user';

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        setAuth: (user, token) => set({ user, token }, false, 'setAuth'),
        logout: () => set({ user: null, token: null }, false, 'logout'),
        setToken: (token) => set({ token }, false, 'setToken'),
        setUser: (user) => set({ user }, false, 'setUser'),
        updateUser: (updates) =>
          set(
            (state) => ({
              user: state.user ? { ...state.user, ...updates } : null,
            }),
            false,
            'updateUser',
          ),
        isAuthenticated: () => !!get().token,
      }),
      {
        name: 'auth', // ключ в localStorage
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: 'AuthStore' },
  ),
);
