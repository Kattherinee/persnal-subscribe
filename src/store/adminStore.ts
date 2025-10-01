import { create } from 'zustand';
import type { IAdmin, ITableUser } from '../dto/admin';
import { createJSONStorage, persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

interface AdminState {
  admin: IAdmin | null;
  setAuthAdmin: (admin: IAdmin) => void;
  logoutAdmin: () => void;
  isAuthenticated: () => boolean;
  users: ITableUser[];
  setUsers: (users: ITableUser[]) => void;
}

export const useAdminStore = create<AdminState>()(
  devtools(
    persist(
      (set, get) => ({
        admin: null,
        setAuthAdmin: (admin) => set({ admin }, false, 'setAuthAdmin'),
        logoutAdmin: () => set({ admin: null }, false, 'logoutAdmin'),
        users: [],
        setUsers: (users) => set({ users }),
        isAuthenticated: () => !!get().admin,
      }),
      {
        name: 'admin',
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: 'AdminStore' },
  ),
);
