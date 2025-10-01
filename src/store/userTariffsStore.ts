import { create } from 'zustand';
import type { ITariff } from '../dto/tariffs';
import { persist } from 'zustand/middleware';

interface UserTariffsState {
  userTariffs: ITariff[];
  setUserTariffs: (tariffs: ITariff[]) => void;
}

export const useUserTariffsStore = create<UserTariffsState>()(
  persist(
    (set) => ({
      userTariffs: [],
      setUserTariffs: (tariffs) => set({ userTariffs: tariffs }),
    }),
    { name: 'UserTariffsStore' },
  ),
);
