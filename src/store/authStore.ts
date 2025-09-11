import { create } from 'zustand';
import type { User } from '../dto/user';
import { devtools } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create(
  devtools<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
  })),
);
