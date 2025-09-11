import { create } from 'zustand';
import type { tableUser } from '../dto/admin';

interface AdminState {
  users: tableUser[];
  setUsers: (users: tableUser[]) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));
