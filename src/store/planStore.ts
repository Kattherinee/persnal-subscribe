import { create } from 'zustand';
import type { IMyDetailTariff } from '../dto/tariffs';
import { devtools } from 'zustand/middleware';
import { persist } from 'zustand/middleware';

interface PlanState {
  plan: IMyDetailTariff | null;
  setPlan: (plan: IMyDetailTariff | null) => void;
}

export const usePlanStore = create<PlanState>()(
  devtools(
    persist(
      (set) => ({
        plan: null,
        setPlan: (plan) => set({ plan }, false, 'setPlan'),
      }),
      { name: 'PlanStore' },
    ),
    { name: 'PlanStore' },
  ),
);
