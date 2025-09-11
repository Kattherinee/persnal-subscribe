import { create } from 'zustand';
import type { Tariff } from '../dto/tariffs';

interface TariffsState {
  tariffs: Tariff[];
  setTariffs: (tariffs: Tariff[]) => void;
}

export const useTariffsStore = create<TariffsState>((set) => ({
  tariffs: [],
  setTariffs: (tariffs) => set({ tariffs }),
}));
