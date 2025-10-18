import { create } from 'zustand';
import type { ITariff } from '../dto/tariffs';
import { devtools, persist } from 'zustand/middleware';

interface TariffsState {
  tariffs: ITariff[];
  setTariffs: (tariffs: ITariff[]) => void;
}

export const useTariffsStore = create<TariffsState>()(
  devtools(
    persist(
      (set) => ({
        tariffs: [],
        setTariffs: (tariffs) => set({ tariffs }, false, 'setTariffs'),
      }),
      { name: 'TariffsStore' },
    ),
    {
      name: 'TariffsStore',
    },
  ),
);
