import { create } from 'zustand';
import type { ITariff } from '../dto/tariffs';
import { persist } from 'zustand/middleware';

interface TariffsState {
  tariffs: ITariff[];
  setTariffs: (tariffs: ITariff[]) => void;
}

export const useTariffsStore = create<TariffsState>()(
  persist(
    (set) => ({
      tariffs: [],
      setTariffs: (tariffs) => set({ tariffs }),
    }),
    { name: 'TariffsStore' },
  ),
);
