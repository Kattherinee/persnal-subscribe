import { create } from 'zustand';
import type { Tariff } from '../dto/tariffs';

interface UserTariffsState {
  userTariffs: Tariff[];
  setUserTariffs: (tariffs: Tariff[]) => void;
}

export const useUserTariffsStore = create<UserTariffsState>((set) => ({
  userTariffs: [],
  setUserTariffs: (tariffs) => set({ userTariffs: tariffs }),
}));
